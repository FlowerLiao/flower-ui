
<template>
    <div>
        <div class="fl-table-container" :id="tableId" :style="{'max-height': max_height || 'auto'}">
            <table :class="{'width-auto': maxWidth && maxWidth != 'auto'}" :style="tableStyle">
                <template v-for="col in body_columns">
                    <colgroup v-if="col.type == 'index'" style="width:55px;"></colgroup>
                    <colgroup v-else-if="col.type == 'checkbox' || col.type == 'radio'" style="width:42px;"></colgroup>
                    <colgroup v-else-if="col.width" :style="{width: col.width + (col.width.indexOf('%') > -1 ? '' : 'px')}"></colgroup>
                    <colgroup v-else></colgroup>       
                </template>
                <thead>
                    <template v-for="(row,rowIndex) in header_columns">
                        <tr :class="{'fixed_row': true, 'no-data': !((tempData.pageData && tempData.pageData.length) || (Array.isArray(tempData) && tempData.length))}">
                            <template v-for="(col,colIndex) in row">
                                <th :class="getThClasses(col)" :title="col.title"
                                    :rowspan="(col.children && col.children.length) ? 1 : header_columns.length - rowIndex"
                                    :colspan="headSpanMethod(col)" 
                                    :style="getThStyle(col)" 
                                    :index="rowIndex + '-' + colIndex"
                                    v-on:click="col.sortable ? sort(col) : null">
                                    <!-- 标记表头是否已加载完成，完成后开始初始化固定 -->
                                    {{(rowIndex == header_columns.length - 1 && colIndex == row.length -1) ? (headerRendered = true ? "" : "") : ""}}
                                    <template v-if="col.type == 'index'">
                                        No
                                    </template>
                                    <template v-else-if="col.type == 'checkbox'">
                                        <label>
                                            <input type="checkbox" v-model="tableSelectedAll" v-on:change="toggleTableAllSelectin">
                                            <span></span>
                                        </label>
                                    </template>
                                    <template v-else-if='col.type == "action"'>
                                        <span v-html='"Action"'></span>
                                    </template>
                                    <template v-else>
                                        <span v-html="col.label"></span>
                                    </template>
                                    <!-- 排序图标 -->
                                    <template v-if="col.sortable">
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending"></i>
                                            <i class="sort-caret descending"></i>
                                        </span>
                                    </template>
                                </th>
                            </template>
                        </tr>
                    </template>
                </thead>
                <slot></slot>
                <TableBody></TableBody>
            </table>
        </div>
        <Pagination :page="tempData.pageNo" :size="tempData.pageSize" :totalRow="tempData.totalRow" :pageClick="clickPage" :show="showPage"
            :totalPage="tempData.totalPage"></Pagination>
    </div>
</template>

<script>
    import Pagination from './pagination'
    import TableBody from './table-body'

    export default {
        name: 'FlTable',
        props: {
            "data": [Object,Array],
            "value": Array,
            "max-height": "",
            "max-width": "",
            "page-click": Function,
            "option-key": String,
            "span-method": Function,
            "high-light": "", //是否高亮
            "tr-click": Function, //行点击事件，存在时行点击高亮
            "slot-row": { //自定义行数
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                header_columns: [],
                body_columns: [],
                headerRendered: false,
                fixedCellNum: 0,

                tableSelectedAll: false,
                tableSelectedList: [],

                scrollTop: 0,
                scrollLeft: 0,
                cells_row: [],
                $cells_col: [],
                $cells_common: [],
                auto_height: document.body.clientHeight  - (window.innerWidth <= 1440 ? 198 : 238),
                max_height: 0,

                

                currentRowIndex: -1,
                sortKey: "",

                tableId: "flTable-" + this._uid
            }
        },
        watch: {
            "value": function(value){
                if(Array.isArray(value)){
                    value = value || [];
                    this.currentSelectedList = value;
                    this.tableSelectedList = value;
                    this.tableSelectedAll = (value.length && value.length == this.tempData.pageData.length) ? true : false;
                }
            },
            "headerRendered": function(rendered){
                let _this = this;
                if(rendered){ //表头渲染完成，初始化表格固定
                    setTimeout(function(){
                         _this.initTable();
                    });
                }
            },
            "data": function(){
                let _this = this;
                setTimeout(function(){
                    _this.initTable();
                });
            },
			"maxHeight":function(){
				this.getMaxHeight();
			}
        },
        computed:{
            tableStyle(){
                return {
                    "max-width": typeof this.maxWidth == "number" ? (this.maxWidth + "px") : this.maxWidth
                }
            },
            tempData: function(){
                this.currentRowIndex = -1;

                if(Array.isArray(this.data)){//不分页
                    this.showPage = false;
                    return {
                        pageData: this.data,
                        //需要将自定义行数加到总记录数
                        totalRow: this.data.length + (this.slotRow || 0)
                    }
                } else { //分页
                    if(this.slotRow && !this.data.totalRow){
                        this.showPage = false;
                        this.data.totalRow = this.slotRow;
                    } else {
                        this.showPage = true;
                    }
                    return this.data;
                }
            },
            currentSelectedList: {
                get:function() {
                    return this.value;
                },
                set:function(val) {
                    this.$emit('input', val);
                }
            }
        },
        mounted: function(){
            let _this = this;
            //监听复选框选择
            this.$on("updateTableSelection",function(row){
                if(Array.isArray(this.value)){
                    this.toggleTableSelection(row);
                } else {
                    this.currentSelectedList = row;
                }
            });
            this.getMaxHeight();
            this.initTable();
        },
        methods: {
            //初始化表格固定
            initTable: function(){
                let _this = this,
                    $container = _this.$el.querySelector("#" + this.tableId),
                    canInit = this.cells_row && this.cells_row.length;
                
                if(canInit && this.fixedCellNum){
                    canInit = this.$cells_col && this.$cells_col.length >= this.fixedCellNum;
                }
                if(!canInit){
                    setTimeout(function(){
                        _this.cells_row = $container.querySelectorAll(".fixed_row th,.fixed_row td") || [];
                        _this.$cells_col = $container.querySelectorAll(".fixed_col") || [];
                        _this.$cells_common = $container.querySelectorAll(".fixed_row .fixed_col") || [];
                        _this.initTable();
                    },200);
                    return;
                } else {
                    this.initScrollEvent();
                    
                    if($container){
                        let _this = this,
                            $td = $container.querySelectorAll("th.fixed_col"),
                            containerWidth = $container.clientWidth,
                            $table = $container.querySelector("table"),
                            tableWidth =  $table.clientWidth,
                            temp = -(tableWidth - containerWidth);
                        
                        getStartLeft();
                        function getStartLeft(){
                            if(!$td){
                                setTimeout(function(){
                                   $td = $container.querySelectorAll("th.fixed_col"); 
                                   getStartLeft();
                                },200);
                            } else {
                                $td.forEach(function(td){
                                    let index = td.getAttribute("index"),
                                        indexArr = index.split("-");
                                    let left = td.classList.contains("col_right") ? (tableWidth > containerWidth ? temp : 0) : 0;
                                    _this.header_columns[indexArr[0]][indexArr[1]].startLeft = _this.header_columns[indexArr[0]][indexArr[1]].left = left;
                                    let test = _this.body_columns.find(function(col){
                                        return col.index == td.getAttribute("index");
                                    });
                                    if(test){
                                        test.startLeft = test.left = left;
                                    }
                                });
                            }
                        }
                    }
                }
            },
            //初始化表格滚动事件
            initScrollEvent: function(){
                let _this = this;
                let $container = this.$el.querySelector("#" + this.tableId);
                $container.scrollLeft = 0;
                $container.scrollTop = 0;

                $container.onscroll = function(){
                    let scrollLeft = $container.scrollLeft,
                        scrollTop = $container.scrollTop;
                    if(_this.scrollTop == scrollTop){ //横向滚动
                        if(_this.$cells_col){
                            _this.$cells_col.forEach(function(cell){
                                cell.style["z-index"] = "2"; 
                            });
                        }
                        _this.header_columns.forEach(function(row,rowIndex){
                            row.forEach(function(col,colIndex){
                                if(col.fixed){
                                    let left = col.startLeft + scrollLeft;
                                    col.left = col.fixed == "right" ? (left > 0 ? 0 : left) : left;
                                    let temp = _this.body_columns.find(function(col){
                                        return col.index == rowIndex + "-" + colIndex;
                                    });
                                    if(temp){
                                        temp.left = col.fixed == "right" ? (left > 0 ? 0 : left) : left
                                    }
                                }
                            });
                        });
                    } else {//纵向滚动
                        if(_this.cells_row){
                            _this.cells_row.forEach(function(cell){
                                cell.style.top = scrollTop + "px";
                                cell.style["z-index"] = "2";
                            });
                        }
                    }
                    if(_this.$cells_common){
                        _this.$cells_common.forEach(function(cell){
                            cell.style["z-index"] = "3";
                            if(cell.classList.contains("default")){
                                if(cell.classList.contains("col_left")){
                                    cell.style.left = scrollLeft + "px";
                                }
                            }
                        });
                    }
                    
                    _this.scrollTop = scrollTop;
                }
            },
            //获取最大高度
            getMaxHeight: function(){
                if(this.maxHeight && typeof (this.maxHeight * 1) == "number" && this.maxHeight != undefined){
                    this.max_height = this.maxHeight + "px";
                } else {
                    this.max_height = this.auto_height + "px"
                }
            },
            cellClass: function(col){
                return {
                    "text-center": col.type == "index" || col.type == "checkbox" || col.type == "action" || col.align == "center",
                    "fixed_col": col.fixed,
                    "text-left": col.align == "left",
                    "text-right": col.align == "right"
                }
            },
            //表格全选
            toggleTableAllSelectin: function(){
                let _this = this;
                _this.tableSelectedList = [];
                _this.currentSelectedList = _this.tableSelectedList;
                if(_this.tableSelectedAll){
                    _this.tempData.pageData.forEach(function(item){
                        _this.tableSelectedList.push(_this.optionKey ? item[_this.optionKey] : item);
                    });
                }
            },
            //单行选择切换
            toggleTableSelection: function(row){
                const index = this.tableSelectedList.indexOf(row);
                if (index === -1) {
                    this.tableSelectedList.push(row);
                    this.tableSelectedAll = (this.tableSelectedList.length == this.tempData.pageData.length) ? true : false;
                } else if (index > -1) {
                    this.tableSelectedList.splice(index, 1);
                    this.tableSelectedAll = false;
                }
                this.currentSelectedList = this.tableSelectedList;
            },
            //排序事件
            sort: function(col){
                col.sortType = (!col.sortType || col.sortType == 'desc') ? 'asc' : 'desc';
                col.sortMethod(col.sortType,col.prop);
                this.sortKey = col.prop;
            },
            //翻页事件
            clickPage: function(page,size){
                this.tableSelectedList = [];
                this.currentSelectedList = Array.isArray(this.currentSelectedList) ? this.tableSelectedList : "";
                this.tableSelectedAll = false;
                this.pageClick(page,size);
            },
            //表头单元格合并
            headSpanMethod: function(col){
                col.colspan = (col.children && col.children.length) ? col.children.length : 1;

                if(col.children && col.children.length){
                    for(let i = 0; i < col.children.length; i++){
                        col.colspan += this.headSpanMethod(col.children[i]) - 1;
                    } 
                }
                return col.colspan;
            },
            //表格内容单元格合并
            bodySpanMethod: function(row,col,rowIndex,colIndex){
                let spanMethod = this.spanMethod,
                    defaultSpan = {
                        colspan: 1,
                        rowspan: 1
                    };
                if(spanMethod && typeof spanMethod == "function"){
                    return spanMethod(row,col,rowIndex,colIndex) || defaultSpan;
                }
                return defaultSpan;
            },
            //行点击事件
            rowClick: function(row,index){
                if(this.highLight != undefined || this.currentSelectedList && !Array.isArray(this.currentSelectedList)){
                    this.currentRowIndex = index;
                }
                
                if(this.trClick && typeof this.trClick == "function"){
                    this.trClick(row,index);
                }
            },
            //获取表头样式
            getThClasses(col){
                return {
                    "fixed_col": col.fixed == "left" || col.fixed == "right", 
                    "col_left": col.fixed == "left",
                    "col_right": col.fixed == "right",
                    // "fixed_col_left": col.fixed == 'left',
                    // "fixed_col_right": col.fixed == "right",
                    'ascending': (col.prop == this.sortKey && col.sortType == 'asc'),
                    'descending': (col.prop == this.sortKey && col.sortType == 'desc'),
                    'relative pointer': col.sortable
                }
            },
            getThStyle(col){
                let style = "";
                if(col.fixed == "left" || col.fixed == "right"){
                    style = "left: "+ col.left + this.scrollLeft + 'px';
                }
                return style;
            }
        },
        components: {
            Pagination: Pagination,
            TableBody: TableBody
        }
    }
</script>
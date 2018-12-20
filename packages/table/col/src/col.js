export default {
    name: 'FlTableCol',
    props: {
        "prop": String,
        "label": String,
        "title": String,
        "type": String,
        "width": String,
        "sortable": false,
        "sort-method": Function,
        "fixed": "",
        "max-width":String,
        "align": String
    },
    data(){
        return {
            column: null,
            subColumn: [],
            level: 0
        }
    },
    computed: {
        _fixed(){
            return this.fixed == undefined ? "" : (this.fixed || "left");
        }
    },
    mounted(){
        //只能在挂载之后，否则获取不到自定义内容
        this.getColumn(this);
    },
    methods: {
        getColumn: function(component,isSubColumn){
            let _this = isSubColumn ? component.componentOptions.propsData : component;
            if(this._fixed == "left" || this._fixed == "right"){
                this.$parent.fixedCellNum++;
            }
            let column = {
                prop: _this.prop,
                label: _this.label,
                title: _this.title,
                type: _this.type,
                width: _this.width,
                maxWidth:_this.maxWidth,
                sortable: (_this.sortable == undefined || !_this.sortMethod || typeof _this.sortMethod != 'function') ? false : true,
                sortMethod: _this.sortMethod,
                sortType: "",
                fixed: this._fixed,
                align: _this.align,
                renderMethod: isSubColumn ? (component.data.scopedSlots ? component.data.scopedSlots.default : null) : this.$scopedSlots.default,
                left: 0,
                startLeft: 0,
                children: isSubColumn ? (component.componentOptions.children ? this.getSubColumn(component.componentOptions.children) : []) : this.getSubColumn(component)
            }; 
            if(!isSubColumn){
                this.column = column;
                this.commitColumn(this.column,0);
            }
            return column;
        },
        getSubColumn: function(component){
            let children = [];
            if(component.$slots && component.$slots.default && component.$slots.default.length){
                component = component.$slots.default;
            }
            if(component.length){
                component.forEach(function(slot){
                    if(slot.componentOptions){
                        children.push(this.getColumn(slot,true));
                    }
                },this);
            }

            return children;
        },
        commitColumn(column,level,index){
            if(!this.$parent.header_columns[level]){
                this.$parent.header_columns[level] = new Array();
            }
            let columns = this.$parent.header_columns[level];
            columns.push(column);

            let children = column.children;
            if(children.length){
                level++;
                children.forEach(function(child,index){
                    this.commitColumn(child,level,index);
                },this);
            } else {
                column.index = level + "-" + (index || columns.length - 1);
                this.$parent.body_columns.push(column);               
            }
        }
    },
    render ({ row,index }){
        return (this.$scopedSlots.default);
    }
}
export default {
    name: 'TableBody',
    methods: {
        getTdClass: function(col){
            let tdClass = "";
            if(col.fixed == "left"){
                tdClass = "fixed_col col_left";
            } else if(col.fixed == "right"){
                tdClass = "fixed_col col_right";
            }
            if(col.align){
                tdClass += " text-" + col.align;
            } else if(col.type == "index" || col.type == "checkbox" || col.type == "radio" || col.type == "action"){
                tdClass += " text-center";
            } 
            return tdClass;
        },
        getTdStyle(col){
            let style = {};
            if(col.fixed == "left" || col.fixed == "right"){
                style.left = col.left + "px";
            }
            if(col.maxWidth){
                style["max-width"] = col.maxWidth + "px";
            }
            return style;
        }
    },
    render() {
        const parent = this.$parent
        const columns = parent.body_columns
        const dataSource = parent.tempData.pageData
        const startRow = ((parent.tempData.pageNo || 1) - 1) * (parent.tempData.pageSize || 20) + 1
        const tableSelectedList = parent.tableSelectedList
        const optionKey = parent.optionKey
        const spanMethod = parent.bodySpanMethod
        const rowClick = parent.rowClick
        const trClick = parent.trClick

        let _this = this;
        return (
          <tbody>
            {this._l(dataSource, (row,index) =>
                <tr class={((tableSelectedList.indexOf(optionKey ? row[optionKey] : row) > -1 || parent.currentRowIndex == index) ? 'high-light ' : '') + 
                    (trClick ? "pointer" : "")}  on-click={ () => {rowClick(row,index)}}>
                  {
                    this._l(columns, (col,colIndex) =>{
                        let spans = spanMethod(row,col,index,colIndex);
                        if(spans.colspan){
                            let tdClass = _this.getTdClass(col);
                            let divClass="td-overflow",titleContent=row[col.prop];
                            if(col.renderMethod){
                        		return (<td class={tdClass} colspan={spans.colspan} rowspan={spans.rowspan} style={_this.getTdStyle(col)}>
                                            <div title={titleContent} class={divClass}>
                                            {col.renderMethod({
                                                row: row,
                                                index: index
                                              })}
                                            </div>
                                        </td>);

                            } else if(col.type == "index"){
                                return (<td class={tdClass} colspan={spans.colspan}  rowspan={spans.rowspan} style={_this.getTdStyle(col)}>{startRow + index}</td>)
                            } else if(col.type == "checkbox"){
                                return (<td class={tdClass} colspan={spans.colspan} rowspan={spans.rowspan} style={_this.getTdStyle(col)}>
                                            <label>
                                                <input type="checkbox" value={optionKey ? row[optionKey] : row}
                                                    checked={tableSelectedList.indexOf(optionKey ? row[optionKey] : row) > -1 ? true : false}
                                                    on-click={ () => { parent.$emit('updateTableSelection', optionKey ? row[optionKey] : row) } }/>
                                                <span></span>
                                            </label>
                                        </td>)
                            } else if(col.type == "radio"){
                                return (<td class={tdClass} colspan={spans.colspan} rowspan={spans.rowspan} style={_this.getTdStyle(col)}>
                                            <label>
                                                <input type="radio" value={optionKey ? row[optionKey] : row} name={optionKey}
                                                checked={(optionKey ? row[optionKey] : row) == parent.value}
                                                on-click={ () => { parent.$emit('updateTableSelection', optionKey ? row[optionKey] : row) } }/>
                                                <span></span>
                                            </label>
                                        </td>)
                            } else if(col.maxWidth){
                            	return (<td title={titleContent} class={tdClass} colspan={spans.colspan} rowspan={spans.rowspan} style={_this.getTdStyle(col)}><div class={divClass}>{row[col.prop]}</div></td>)
                            } else {
                                return (<td class={tdClass} colspan={spans.colspan} rowspan={spans.rowspan} style={_this.getTdStyle(col)}>{row[col.prop]}</td>)
                            }
                        }
                    })
                  }
                </tr>
            )}
        </tbody>
    )}
}
import FlButton from './button/index.js'
import FlInput from './form/input/index.js'
import FlTextarea from './form/textarea/index.js'
import FlValidate from './validate/index.js'
import FlCard from './card/index.js'
import FlTab from './tab/index.js'
import FlTabItem from './tab/tabItem/index.js'
import FlTable from './table/index.js'
import FlTableCol from './table/col/index.js'

const components = [
  	FlButton,
  	FlInput,
  	FlTextarea,
    FlCard,
    FlTab,
    FlTabItem,
    FlTable,
    FlTableCol
]

const install = function(Vue) {
  	if (install.installed) return
  	components.map(component => Vue.component(component.name, component))

  	Vue.prototype.validate = FlValidate.validate
    Vue.prototype.updateValidateMsg = FlValidate.updateValidateMsg
    Vue.prototype.$clearErrorMsg = FlValidate.$clearErrorMsg
}

if (typeof window !== 'undefined' && window.Vue) {
  	install(window.Vue)
}

export default {
  	install,
  	FlButton,
  	FlInput,
  	FlTextarea,
  	FlValidate,
    FlCard,
    FlTab,
    FlTabItem,
    FlTable,
    FlTableCol
}

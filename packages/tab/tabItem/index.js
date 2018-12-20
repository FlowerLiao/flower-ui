import TabItem from './src/tabItem.vue';

TabItem.install = function (Vue) {
  Vue.component(TabItem.name, TabItem);
};

export default TabItem;

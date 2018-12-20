import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Menu from "@/menu.json"

const routeView = {
    template: "<router-view></router-view>"
};
function addRoutes(menus,isFirst,parentPath){
	let route = [];
	menus.forEach((menu,index) => {
		let hasChild = menu.children && menu.children.length;
		if(index == 0 && isFirst){
			route.push({
		  		path: "/",
		  		redirect: "/" + menu.path,
		  		component: r => require.ensure([], () =>
		        	r(require(`../docs/${menu.path}.md`)))
		  	});
		}
		route.push({
	  		name: menu.path,
	  		path: (parentPath ? "" : "/") + menu.path,
	  		redirect: hasChild ? ("/" + menu.path + "/" + menu.children[0].path) : '',
	  		children: hasChild ? addRoutes(menu.children,false,menu.path) : null,
	  		component: hasChild ? routeView : r => require.ensure([], () =>
	        	r(parentPath ? require(`../docs/${parentPath}/${menu.path}.md`) : require(`../docs/${menu.path}.md`)))
	  	});
	});
	return route;
}

export default new Router({
  routes: addRoutes(Menu.menus,true)
});
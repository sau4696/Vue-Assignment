import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: loadView('Home'),
    //   meta: { title: 'Home', icon: 'mdi mdi-home-outline' }
    // },
   
    // {
    //   path: '*',
    //   redirect: { name: 'PageNotFound' }
    // },
    // {
    //   path: '/PageNotFound',
    //   name: 'PageNotFound',
    //   component: loadView('PageNotFound'),
     
    // },
    {
        path: '/',
        name: 'Datatable',
        component: loadView('Datatable'),
        
      },
      {
        path: '/chart',
        name: 'Chart',
        component: loadView('Chart'),
        
      },

   
  
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/movie/pages/Movie.vue'
import MovieDetail from '@/components/movie/pages/MovieDetail.vue'
import Cinema from '@/components/cinema/pages/Cinema.vue'
import CinemaDetail from '@/components/cinema/pages/CinemaDetail.vue'
import Show from '@/components/show/pages/Show.vue'
import Mall from '@/components/mall/pages/Mall.vue'
import Me from '@/components/me/pages/Me.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/',component: Movie},
    {path: '/movie',component: Movie,
    	children:[
    		{path:"detail/:id",component:MovieDetail}
    	]
    },
    {path: '/cinema',component: Cinema,
	    children:[
	    	{path:"district/:dis/:id",component:CinemaDetail}
	    ]
    },
    {path: '/show',component: Show},
    {path: '/mall',component: Mall},
    {path: '/me',component: Me},
    
    //重定向
//  {path: '/*',component: Movie},
    
  ]
})

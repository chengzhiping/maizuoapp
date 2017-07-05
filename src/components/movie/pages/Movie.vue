<template>
	<div>
	<div class="movie">
		<header class="movie_head">
			<div class="head_left">
				<img src="../../../../static/img/logo_01.png"/>
			</div>
			<div class="head_right">
				<span>深圳</span>
				<i class="iconfont icon-dingwei"></i>
			</div>
		</header>
		<main class="movie_main">
				<mt-navbar class="tabLine" v-model="selected">
				  <mt-tab-item id="coming"><span @click="clickAct('0.55rem')">热映电影</span></mt-tab-item>
				  <mt-tab-item id="comingSoon" ><span @click="clickAct('2.69rem')">即将上映</span></mt-tab-item>
				  <mt-tab-item id="hotActicity"><span @click="clickAct('4.84rem')">热门活动</span></mt-tab-item>
				  <span class="bottomLine" :style="{left:bottomLineLeft}"></span>
				</mt-navbar>
			
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
			  <mt-tab-container-item id="coming">
			  		<MovieListCom :data3="hotMovie"/> <!--电影列表已经封装成了一个组件-->
			  </mt-tab-container-item>
			  
			  <mt-tab-container-item id="comingSoon">
			  		<MovieSoonListCom :data3="movieComing"/>
			  </mt-tab-container-item>
			  
			  <mt-tab-container-item id="hotActicity">
			    <mt-cell v-for="n in 6" :title="'选项 ' + n" />
			  </mt-tab-container-item>
			  
			</mt-tab-container>
		</main>
		</div>
		<router-view></router-view>
		
	</div>
</template>

<script>
	import Api from "./../../../assets/Api.js";
	import MovieListCom from "./../components/movieListCom.vue";
	import MovieSoonListCom from "./../components/movieSoonListCom.vue";
	
	export default{
		data(){
			return{
				selected:"coming",
				hotMovie:[],
				movieComing:[],
				page:2,
				bottomLineLeft:"0.55rem"
			}
		},
		components:{
			MovieListCom,
			MovieSoonListCom
		},
		created(){
			//热映电影数据
			this.$http.get(`${Api.movieHotMovieApi}?__t=1498792155586&page=1&count=10`)
			.then((response)=>{
//				console.log(response.data.data.films)
				this.hotMovie = response.data.data.films;
			})
			//轮播图数据
			this.$http.get(Api.movieBannerApi)
			.then((res)=>{
//				console.log(res.data.data)
			})
			//即将上映数据
			this.$http.get(`${Api.moviecommingSoonApi}?__t=1498792567877&page=1&count=10`)
			.then((res)=>{
				console.log(res)
			this.movieComing = res.data.data.films;
			})
			
		},methods:{
			clickAct(val){
				this.bottomLineLeft = val;
			}
		}

	}
	
</script>

<style scoped>
	.movie{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:0.98rem;
		
	}
	.movie .movie_head{
		width:100%;
		height:0.88rem;
		display: flex;
		box-sizing:border-box;
		padding:0.2rem;
	}
	.movie .movie_head>div{
		flex:1;
		line-height:0.88rem;
	}
	.movie .movie_head .head_right{
		text-align:right;
		color:#555 !important;
	}
	.movie .movie_head .head_left img{
		height:0.7rem;
	    margin-top: 0.09rem;
    	margin-left: 0.1rem;
	}
	.movie .movie_head .head_right span{
		font-size:0.23rem;
		line-height:0.3rem;
	}	
	.movie .movie_head .head_right i{
		color:#27b6d3;
		font-size:0.3rem;
	}
	.movie .movie_main{
		position: absolute;
	    width: 100%;
	    top: 0.88rem;
	    bottom: 0;
	    overflow: hidden;
	}
	.mint-navbar{
		display: flex;
	}
	.mint-tab-container-item{
	    position: absolute;
	    width: 100%;
	    top: 0.8rem;
	    bottom: 0;
	    overflow-y: scroll;
	}
	.mint-navbar .mint-tab-item{
		flex:1;
		text-align: center;
		height:0.8rem;
		line-height:0.8rem;
		font-size:0.24rem;
		
	}
	.mint-navbar .mint-tab-item	span{
		display: block;
	    width: 100%;
	    height: 100%;
	}
	.is-selected span{
		color:#FF3000;
		position:relative;

	}
	/*.is-selected span:after{
		content:'';
		width:100%;
		height:0.03rem;
		background:#FF3000;
		position:absolute;
		left:0;
		bottom:-0.21rem;
		transition:left 0.15s linear ;
	}*/
	.tabLine{
		position:relative;
	}
	.bottomLine{
		width: 1rem;
	    height: 0.03rem;
	    position: absolute;
	    background: #FF3000;
	    bottom: 0.1rem;
	   	transition:left 0.15s linear ;
	}
/*	
	.item{
		display: flex;
		position:relative;
		padding:0.2rem 0;
	}
	.item:after{
		content:"";
		width:100%;
		height:1px;
		border-bottom:1px dashed #ccc;
		position:absolute;
		left:0;
		bottom:-1px;
		transform: scaleY(0.5);
	}
	.item .item_left{
		box-sizing: border-box;
		padding:0 0.1rem;
	}
	.item .item_left img{
		width:0.9rem;
	}
	.item .item_right{
		flex:1;
		margin-left:0.2rem;
	}
	.item .item_right .filmTitle{
		font-size:0.4rem;
		font-size: 0.3rem;
	    font-weight: normal;
	    color: #666;
	}
	.item .item_right .filmTitle em{
		float:right;
		font-style:normal;
		color:#FF3000;
		margin-right:0.1rem;
	}
	.item .item_right .filmTitle em i{
		font-style:normal;
		color:#ccc;
		padding-left:0.05rem;
	}
	.item .item_right .intro{
		font-size:0.22rem;
		line-height:0.5rem;
		color:#666;
	}
	.item .item_right .cinameInfo em{
		color:#88a2bf;
		font-style:normal;
	}
	.item .item_right .cinemaCount,
	.item .item_right .watchCount{
		font-size:0.22rem;
		color:#ccc;
	}
	.item .item_right .watchCount{
		margin-left:0.6rem;
	}*/
</style>
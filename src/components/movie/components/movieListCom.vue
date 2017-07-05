<template>
	<div  v-infinite-scroll="loadMore"
		  infinite-scroll-disabled="loading"
		  infinite-scroll-distance="10"
		  infinite-scroll-immediate-check=false>
		<swiper :options="swiperOption" ref="mySwiper">
		    <!-- slides -->
		    <swiper-slide v-for="item in bannerData">
		    	<img :src="item.imageUrl" alt="" />
		    </swiper-slide>
		  
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
		<li class="item" v-for="item in data3" @click="goDeails(item.id)">
			<div class="item_left">
				<img :src="item.poster.thumbnail" alt="" />
			</div>
			<div class="item_right">
				<h2 class="filmTitle">
					{{item.name}}
					<em>{{item.grade}}<i>&gt;</i></em>
				</h2>
				<p class="intro">{{item.intro}}</p>
				<div class="cinameInfo">
					<span class="cinemaCount"><em>{{item.cinemaCount}}</em>家影院正在上映</span>
					<span class="watchCount"><em>{{item.watchCount}}</em>人购票</span>
				</div>
			</div>
		</li>
		<p class="bottomLoading" v-html="loadInfo"></p>
		<router-view></router-view>
	</div>
	
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import router from './../../../router'
	import Api from "./../../../assets/Api.js";
	
	export default{
		data(){
			return{
				page:2,
				loadInfo:"<i class='iconfont icon-maikefeng1'></i>加载中...",
				swiperOption: {
		          pagination: '.swiper-pagination',
		          nextButton: '.swiper-button-next',
		          prevButton: '.swiper-button-prev',
		          slidesPerView: 1,
		          paginationClickable: true,
		          spaceBetween: 30,
		          loop: true,
		          autoplay: 3000,
		        },
		        bannerData:[]
			}
		},
		created(){
			this.$http.get(`${Api.movieBannerApi}`)
			.then((response)=>{
//					console.log(response.data.data.billboards);
				this.bannerData = response.data.data.billboards
			})
		}
		,
		components:{
			swiper,
   			swiperSlide
		},
		methods:{
			loadMore() {
				this.loading = true;
				this.$http.get(`${Api.movieHotMovieApi}?__t=1498792155586&page=${this.page}&count=10`)
				.then((response)=>{
					let that = this;
					if(response.data.data.films == 0){
						this.loadInfo = "天啦噜，身体已被掏空ヽ(#`Д´)ﾉ"
						return;
					}
					response.data.data.films.map(function(item,index){
						that.data3.push(item)
					})
					this.page++;
					this.loading = false;
				})
			},
			goDeails(id){
				console.log(id)
				router.push("/movie/detail/"+id);
			}
			
		},
		computed: {  
			swiper() {  
				return this.$refs.mySwiper.swiper;  
			}  
		},
		props:{
			data3:Array
		}
	}
</script>

<style scoped>
	
	.item{
		display: flex;
		position:relative;
		padding:0.2rem 0;
		box-sizing:border-box;
		padding:0.2rem;
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
	}
	.bottomLoading{
		height:0.78rem;
		line-height:0.78rem;
		text-align:center;
		font-size:0.2rem;
	}
	.swiper-container,.swiper-slide img{
		width: 100%;
    	height: 3rem;
	}
	.swiper-pagination-bullet{
		background:#fff;
		opacity:0.4;
	}
	.swiper-pagination-bullet-active{
		background:#007aff;
		opacity:0.9;
	}
</style>
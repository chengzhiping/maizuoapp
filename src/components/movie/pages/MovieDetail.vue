<template>
	<div class="detail">
		<div class="content">
			<div class="filmPic">
				<div class="flimTitle">
					<i class="iconfont icon-fanhui" @click="goback"></i>
					<h1 v-text="filmData.name"></h1>
				</div>
				<img :src="filmData.cover ? filmData.cover.origin:''" alt="" />
				<div class="movieName">
					{{filmData.name}}
				</div>
			</div>
			
			<div class="actor" @scroll="scrollAct">
				<h3 class="filmIntroTitle">影片简介</h3>
				<p>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：{{filmData.director}}</p>
				<p>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：<span v-for="item in filmData.actors">{{item.name}}</span></p>
				<p>地区语言：<span>{{filmData.nation}}</span>(<span>{{filmData.language}}</span>)</p>
				<p>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：{{filmData.category}}</p>
				<p>上映日期：{{filmData.premiereAt | time(filmData.premiereAt)}}</p>
				<p class="storyIntro">{{filmData.synopsis}}{{filmData.synopsis}}</p>
			</div>
			
		</div>
		<span class="buyTicket">立即买票</span>
	</div>
</template>

<script>
	import Vue from "vue"
	import router from './../../../router'
	import api from './../../../assets/Api.js'
	Vue.filter("time",function(v){
		let date = new Date(v);
		let m = date.getMonth()+1;
		let d = date.getDate();
		return `${m}月${d}日上映`
	})
	export default{
		data(){
			return{
				id:this.$route.params.id,
				filmData:'',
			}
		},
		created(){
			this.$http.get(api.movieDetailApi+"/"+this.id)
			.then((res)=>{
				console.log(res.data.data.film)
				this.filmData = res.data.data.film;
			})
		},
		methods:{
			goback(){
				router.go(-1)
			},
			scrollAct(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	.detail{
		position:absolute;
		top:0;
		bottom:0;
		width:100%;
		height:100%;
		z-index: 100;
		background:#ebebeb;	
		overflow-y: scroll;
	}
	.content{
		width:100%;
		background:#ebebeb;
		padding-bottom:1rem;
	}
	.flimTitle{
		width:100%;
		height:0.88rem;
		background:rgba(211, 39, 133, 0);
		position:absolute;
		text-align: center;
		color:#fff;
		top:0;
		left:0;
	}
	.flimTitle h1{
		font:normal 0.4rem/0.88rem "微软雅黑" ;
	}
	.flimTitle i{
		position:absolute;
		left:0;
		height:0.4rem;
		top:0.05rem;
		font-size:0.35rem;
		padding:0.24rem;
		box-sizing:border-box;
		
	}
	.filmPic{
		position:relative;

	}
	.filmPic img{
		width:100%;
		height:3.5rem;

	}
	.filmPic .movieName{
		position:absolute;
		left:0.3rem;
		top:2rem;
		color:white;
		font-size:0.34rem;
	}
	.filmIntroTitle{
		font:normal 0.3rem/0.4rem "微软雅黑";
		border-left:0.3rem solid #e4c89c;
		margin:0.4rem 0;
		padding-left:0.1rem;
		box-sizing: border-box;
	}
	.actor>p{
		font-size:0.24rem;
		color:#666;
		line-height:0.5rem;
		box-sizing:border-box;
		padding:0 0.3rem;
	}
	.actor>p:nth-child(2) span:after{
		content:'|';
		padding:0 0.1rem;
	}
	.actor>p:nth-child(2) span:last-child:after{
		content:'';
	}
	.buyTicket{
		display:block;
		width:2.4rem;
		height:0.6rem;
		background:#fe8233;
		position:fixed;
		margin:auto;
		left:0;
		right:0;
		bottom:0.3rem;
		line-height:0.6rem;
		text-align: center;
		color:#fff;
		border-radius:0.3rem;
		z-index: 100;
	}
</style>
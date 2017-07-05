<template>
	<div class="mall">
		<header>
			<span>商城</span>
			<i class="iconfont icon-weibiaoti5" @click="scanCodeHandle"></i>
		</header>
		<div class="content">
	
			<swiper :options="swiperOption" ref="mySwiper">
			    <!-- slides -->
			    <swiper-slide v-for="item in banner">
			    	<img :src="item.imageSrc" alt="" />
			    </swiper-slide>
			  
			    <!-- Optional controls -->
			    <div class="swiper-pagination"  slot="pagination"></div>
			</swiper>
			<div class="nav">
				<ul class="navList">
					<li v-for="item in linkList">
						<img :src="item.imageSrc" alt="" />
						<span>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="other">
				<a><img :src="zhuanqu?zhuanqu[0].imageSrc:''" alt="" /></a>
				<a><img :src="zhuanqu?zhuanqu[1].imageSrc:''" alt="" /></a>
			</div>
			<div class="ypzq">
				<h2 class="ypTitle">—&nbsp;有品专区&nbsp;—</h2>
				<div class="ypzqLine">
					<div class="ypzqLeft">
						<img :src="zhuanqu?zhuanqu[3].imageSrc:''" alt="" />
					</div>
					<div class="ypzqRight">
						<img :src="zhuanqu?zhuanqu[2].imageSrc:''"/>
						<img :src="zhuanqu?zhuanqu[4].imageSrc:''"/>
					</div>
				</div>
			</div>
			<div class="subjectCenter" v-for="item in subjectTitle">
				<div class="subjectTitle">
					<img :src="item.imageSrc" alt="item.name "/>
				</div>
				<ul class="subjectList">
					<li v-for="ii in item.products">
						<img :src="ii.image" alt="ii.name" />
						<span>{{ii.name}}</span>
						<em>{{ii.price | price}}</em>
					</li>
					<li><span class="all">全部</span></li>
				</ul>
			</div>			
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import Api from "./../../../assets/Api.js";
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	
	Vue.filter("price",(val)=>{
		if(val.toString().endsWith("00")){
			return `¥${val/100}.00`
		}else{
			return `¥${val/100}`
		}
		
	})
	export default{
		
		data(){
			return{
				linkList:null,
				banner:null,
				zhuanqu:null,
				subjectTitle:null,
				swiperOption: {
		          pagination: '.swiper-pagination',
		          slidesPerView: 1,
		          paginationClickable: true,
		          loop: true,
		          autoplay: 3000,
		        },
			}
		},
		components:{
			swiper,
   			swiperSlide
		},
		created(){
			//轮播图
			this.$http.get("/ad/list")
			.then((res)=>{
				let allData = res.data.data;
				this.linkList = allData.slice(0,8);
				this.banner = allData.slice(8,11)
				this.zhuanqu = allData.slice(11);
				this.subjectTitle=allData.slice(16)
				console.log(allData.slice(16))
			})
		},
		methods:{
			scanCodeHandle(){
				console.log("准备扫描二维码")
			}
		}
	}
</script>

<style scoped>
	.mall{
		width:100%;
		height:100%;
		position:relative;
		background:#EEEEEE;
	}
	.mall header{
		width:100%;
		height:0.88rem;
		box-sizing:border-box;
		padding:0 0.2rem;
		background:#fff;
		border-bottom:1px solid #eee;
	}
	.mall header span{
		line-height:0.88rem;
		font-size:0.3rem;
		color:#666;
	}
	.mall header i{
		font-size:0.36rem;
		float:right;
		display: block;
		width:0.36rem;
		height:0.36rem;
		padding:0.26rem 0.1rem 0.26rem;
		color:#3dcec1;
	}
	.mall .content{
		width:100%;
		position:absolute;
		top:0.88rem;
		bottom:0.98rem;
		overflow: hidden;
		overflow-y: scroll;
	}
	.mall .swiper-wrapper{
		width:100%;
	}
	.mall .swiper-wrapper img{
		width:100%;
	}
	.navList{
		background:#fff;
		overflow: hidden;
	}
	.navList li{
		float:left;
		width:25%;
		text-align: center;
		font-size:0.24rem;
		margin:0.15rem 0;
	}
	.navList li img{
		width:0.8rem;
		margin:0 auto;
	}
	.other{
		width:100%;
		margin:0.15rem 0;
		box-sizing: border-box;
		padding:0.2rem;
		background:#fff;
		display: flex;
	}
	.other a:first-child{
		margin-right:0.2rem;
	}
	.other a {
		flex:1;
	}
	.other a  img{
		width:100%;
	}
	.ypzq{
		padding:0 0.2rem 0.2rem;
		box-sizing:border-box;
		background:#fff;
		width:100%;
		text-align:center;
	}
	.ypzq .ypTitle{
		width:2rem;
		margin:0 auto;
		font:normal 0.24rem/0.5rem "微软雅黑";
		position:relative;
		z-index: 10;
	}
	.ypzqLine{
		display: flex;
	}
	.ypzqLine >div{
		flex:1;
	}
	.ypzqLine >div:first-child{
		margin-right:0.1rem;
	}
	.ypzqLine >div img{
		width:100%;
	}
	.ypzqRight{
		display: flex;
		flex-direction: column;
	}
	.ypzqRight img{
		flex:1;
	}
	.ypzqRight img:first-child{
		margin-bottom:0.1rem;
	}
	.subjectCenter{
		width:100%;
		height:3.9rem;
		box-sizing:border-box;
		padding:0.2rem;
		background:#fff;
		margin-bottom:0.15rem;
		position:relative;
	}
	.subjectCenter .subjectTitle img{
		width: 100%;;
	}
	.subjectCenter .subjectList{
		width:100%;
		white-space: nowrap;
		overflow-x: scroll;
		display: flex;
		margin-top:0.1rem;
	}

	.subjectCenter .subjectList li{
		text-align: center;
		width:30%;
	}
	.subjectCenter .subjectList li span{
		display: block;
		width:1.7rem;
		margin:0 auto;
		font-size:0.24rem;
		overflow: hidden;
		margin-top:0.1rem ;
		transform: scale(0.9);
	}
	.subjectCenter .subjectList li em{
		font:normal 0.24rem "微软雅黑";
		color:#ff6640;
	}
	
	.subjectCenter .subjectList li img{
		width:1.3rem;
		margin:0 auto;
	}
	.subjectCenter .subjectList .all{
		width:1rem;
		height:1rem;
		margin-top:0.5rem;
		text-align: center;
		line-height:1rem;
		border-radius:50%;
		border:1px solid #ccc;
		color:#ccc;
		font-size:0.24rem;
	}
</style>
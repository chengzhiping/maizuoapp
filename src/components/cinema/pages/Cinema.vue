<template>
	<div>

	<div class="cinema">
		<div class="cinemaTitlt">
			<span>影院</span>
			<i class="iconfont icon-chazhao"></i>
		</div>
		<ul class="cinemasList">
			<li v-for="(item1,index) in district">
				<p  @click.stop="showline(index)">{{item1}}</p>
				<div class="districtAllCinemas" @click="goCinemaDetail(item2.id,item2.district.pinyin)"  v-for="item2 in cinemas[index]" :style="{display:activeIndex==index?'block':'none'}">
					<div class="title">
						<h3 class="filmName">{{item2.name}}</h3>
						<i class="zuo">座</i>
						<i class="tong">通</i>
						<i class=" next iconfont icon-next"></i>
					</div>
					<p class="snacks">可乐爆米花</p>
					<p class="cinemaAddress">{{item2.address}}</p>
					<p class="distance">距离未知</p>
				</div>
			</li>
		</ul>
	</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import api from "./../../../assets/Api.js"
	import router from './../../../router'
	
	export default{
		data(){
			return{
				activeIndex:-1,
				cinemas:null,
				district : null,
				open:true,
			}
		},
		created(){
			this.$http.get(api.allCinemaApi)
			.then((response)=>{
				let arr1 = [];//总共有多少个区
				response.data.data.cinemas.map((item,index)=>{
					if(arr1.indexOf(item.district.name)==-1){
						arr1.push(item.district.name)
					}
				})
				this.district = arr1;
				
				
				let arr2 = [];
				let cinemasArr = response.data.data.cinemas;
				for(let i = 0;i < arr1.length;i++){
					let arr3 = [];
					for(let j = 0;j <cinemasArr.length;j++){
						if(arr1[i] == cinemasArr[j].district.name){
							arr3.push(cinemasArr[j])
						}
						
					}
					arr2.push(arr3)
				}
//				console.log(arr2)
				this.cinemas=arr2
			})
		},
		methods:{
			showline(index){
				if(this.open){
					this.activeIndex=index;
					this.open=false;	
				}
//				else if(!this.open && this.activeIndex != index){
//					console.log("laizheli")
//					this.activeIndex=index;
//				}
				else{
					this.activeIndex=-1;
					this.open=true;
				}
			},
			goCinemaDetail(id,dis){
				console.log(id)
				router.push("/cinema/district/"+dis+"/"+id);
			}
			
		}
	}
</script>

<style>
	.cinema{
		width:100%;
		position:absolute;
		left:0;
		top:0;
		bottom:0.98rem;
		overflow-y: scroll;
	}
	.cinema .cinemaTitlt{
		width:100%;
		height:0.88rem;
		overflow: hidden;
		box-sizing:border-box;
		padding:0 0.2rem;
		position:relative;
	}.cinema .cinemaTitlt:after{
		content:'';
		display: block;
		width:100%;
		height:1px;
		position:absolute;
		left:0;
		bottom:-1px;
		border-top: 1px solid #ccc;
		transform: scaleY(0.5);
	}
	.cinema .cinemaTitlt span{
		text-align:right;
		line-height:0.88rem;
		margin-left:0.1rem;
	}
	.cinema .cinemaTitlt i{
		float:right;
		font-size:0.4rem;
		line-height:0.4rem;
		padding:0.24rem;
		color:#0499b5;
	}
	.cinemasList li>p{
		width:100%;
		height:0.8rem;
		background:#E9E9E9;
		box-sizing:border-box;
		line-height:0.8rem;
		color:#666;
		font-size:0.28rem;
		padding-left:0.3rem;
		position:relative;
		border-bottom: 1px solid #fff;
	}
	.districtAllCinemas{
		display: none;
	}
	.districtAllCinemas{
		box-sizing:border-box;
		padding:0.3rem;
		border-bottom: 1px solid #ccc;
	}
	.districtAllCinemas .title{
		width:100%;
		
	}
	.districtAllCinemas .title .filmName{
		max-width: 3.6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font: normal 0.32rem "微软雅黑";
		display: inline-block;
		vertical-align: text-top;
	}
	.districtAllCinemas .title  i{
		font-style:normal;
	}
	.districtAllCinemas .title .zuo	,
	.districtAllCinemas .title .tong{
		display: inline-block;
		text-align: center;
		width:0.35rem;
		height:0.35rem;
		line-height:0.35rem;
		font-size:0.2rem;
		border-radius: 50%;
		opacity: 0.6;
	}
	.districtAllCinemas .title .tong{
		color:blue;
		border:1px solid blue;
	}

	.districtAllCinemas .title .zuo	{
		color:#de2848;
		border:1px solid #de2848;
	}
	.districtAllCinemas .title .next	{
		float:right
	}
	.districtAllCinemas	.snacks{
		overflow: hidden;
		display: inline;
		box-sizing: border-box;
		padding:0 0.1rem;
		background:#51add0;
		color:#fff;
		font-size:0.24rem;
		border-radius:0.06rem;
	}
	.districtAllCinemas	.cinemaAddress,.distance{
		font-size:0.24rem;
		color:#999;
		width:90%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.districtAllCinemas p{
		margin-top:0.15rem;
	}	
</style>
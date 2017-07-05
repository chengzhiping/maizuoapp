<template>
	<div class="cinemaDetail">
		<div class="cinemaDetailTitle">
			<i class="iconfont icon-fanhui" @click="goback"></i>
			<span>影院排期</span>
		</div>
		<div class='cinemaInfo'>
			<div class="wrapInfo">
				<h2 class="cinemaName">{{cinemaData?cinemaData.name:''}}</h2>
				<div class="cinemaSupply">
					<span v-for="item in cinemaData.services">{{item?item.name:''}}</span>
				</div>
				<i class='iconfont icon-next'></i>
			</div>
			
			<div class="cinemaAddress">
				<span class="add"><i class="iconfont icon-dingwei" style="color:#2DA56E"></i>{{cinemaData.address}}</span>
				<span><i class="iconfont icon-002dianhua"></i>影院联系</span>
			</div>
		</div>
		<div>
			<swiper :options="swiperOption" ref="mySwiper">
				 <swiper-slide v-for="item in cinemaFilmsData">
			    	<img :src="item.minposterAddress" alt="" />
				</swiper-slide>
				<div class="swiper-button-prev" slot="button-prev" @click="showIndexLeft"></div>
		   		<div class="swiper-button-next" slot="button-next"  @click="showIndexRight"></div>
			</swiper>			
			
			<div class="filmInfo">
		    	<p class="filmName">{{cinemaFilmsData[this.activePicIndex].filmName}}</p>
		    	<p class="filmType">
		    		<span>地区:{{cinemaFilmsData[this.activePicIndex].nation}}</span>
		    		<span>类型：{{cinemaFilmsData[this.activePicIndex].category}}</span>
		    	</p>
		    	<i class="iconfont icon-next"></i>
		    </div>
		    <div class="filmsSchedule">
		    	<ul class="filmsScheduleList">
		    		<li v-for="(item,index) in allFilmSchedule" :style="{display:activePicIndex==index?'block':'none'}">
		    			<span v-for="(ii,i) in item" @click="selectData(i,ii)">{{ii | addTimeFont}}<i :class="{active:i==activeDate?true:false}"></i></span>
		    		</li>
		    	</ul>
		    </div>
		    <div class="filmPlayTime">
		    	<ul class="filmPlayTimeList">
		    		<li v-for="(item,index) in allFilmPlayDate" :style="{display:activePicIndex==index?'block':'none'}" >
		    			
		    			<div class="showInfoLine" v-if="showCurrentFilm(ii.showAt)" v-for="ii in item">
		    				<div class="lineBottom">
			    				<p class='showTimeWrap'>
			    					<span class="showTime">{{ii.showAt | timestamp}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ii.film.name}}</span>
			    					<span class="maizuoPirce">{{ii.price.maizuo+ii.price.premium | money}}</span>
			    				</p>
			    				<p class="cinemaShowInfo">
			    					<span>预计{{ii.showAt | endTime(ii.film.mins)}}结束/{{ii.film.language}}{{ii.imagery}}/{{ii.hall.name}}</span>
			    					<s class="cinemaPrice">{{ii.price.cinema | money}}</s>
			    				</p>
			    				<i class="iconfont icon-next"></i>
		    				</div>
		    			</div>
		    		</li>
		    		<li v-if=""></li>
		    	</ul>
		    </div>
		</div>
	    
	</div>
</template>

<script>
	import Vue from 'vue';
	import api from './../../../assets/Api.js';
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import router from './../../../router';
	//过滤时间戳
	Vue.filter("timestamp",(val)=>{
		let t = new Date(val);
		let h = t.getHours()<10 ?"0"+t.getHours():t.getHours() ;
		let m = t.getMinutes()<10 ?"0"+t.getMinutes():t.getMinutes();
		return h+":"+m;
	})
		//过滤价格
	Vue.filter("money",(m)=>{
		return "¥"+m+".00"
	})
	
	Vue.filter("addTimeFont",(date)=>{
		let d = new Date();
		let m = d.getMonth()+1 < 10 ?"0"+(d.getMonth()+1) :d.getMonth()+1;
		let day = d.getDate()<10 ?"0"+d.getDate():d.getDate();
		let dd = `${m}/${day}`;  
		
		if(date == dd ){
			return "今天("+date+")";
		}else{
			return "("+date+")"
		}
	})

	//计算影片结束时间
	Vue.filter("endTime",(t,s)=>{
//		console.log(t)//播放开始时间
//		console.log(s)//电影时长
		let d = s*60000;
		let date = new Date(t+d);
		let h = date.getHours()<10 ?"0"+date.getHours():date.getHours() ;
		let m = date.getMinutes()<10 ?"0"+date.getMinutes():date.getMinutes();
		return h+':'+m
	})
	
	export default{
		data(){
			return{
				cinemaData:null,
				swiperOption: {
					pagination: '.swiper-pagination',
			        slidesPerView: 3,
			        paginationClickable: true,
			        spaceBetween: 18,
			        centeredSlides: true,
        			nextButton: '.swiper-button-next',
          			prevButton: '.swiper-button-prev',
          			notNextTick: true,
		        },
		        cinemaFilmsData:null,
		        activePicIndex:0,
		        activeDate:0,
		        allFilmSchedule:null,
		        allFilmPlayDate:null,
		        currentDate:null,
			}
		},
		created(){
			this.resetCurrentDate();
			this.$http.get(`${api.allCinemaApi}/${this.$route.params.id}?__t=${new Date().getTime()}`)
			.then((res)=>{
//				console.log(res.data.data.cinema)
				this.cinemaData = res.data.data.cinema;
			})
			//影片上映影片数据
			this.$http.get(`${api.allCinemaApi}/${this.$route.params.id}/film?__t=${new Date().getTime()}`)
			.then((res)=>{
//				console.log(res.data.data.filmList);
				this.cinemaFilmsData=res.data.data.filmList
			})
			//所有影片排期
			this.$http.get(`${api.cinemaSchedueApi}/?__t=${new Date().getTime()}&film=0&cinema=${this.$route.params.id}`)
			.then((res)=>{
//				console.log(res.data.data.schedules);
				let allSchedules = res.data.data.schedules;
					let arr1 = [];
					let allMovie = [];
					for(let i =0;i < this.cinemaFilmsData.length;i++){ //遍历该影院上映的所有电影
						let arr = [];
						arr.push(this.resetCurrentDate());//给数组的第一个元素默认推入今天的日期07/03
						let moviearr = [];
						for(let j =0;j < allSchedules.length;j++){ //遍历该影院所有电影的排期
							if(this.cinemaFilmsData[i].filmName == allSchedules[j].film.name){ //如果上映的电影与所有排期的电影名相等
//								console.log(this.cinemaFilmsData[i].filmName)
/*								let d = new Date(allSchedules[j].showAt);
								let m = d.getMonth()+1 < 10 ?"0"+(d.getMonth()+1) :d.getMonth()+1;
								let day = d.getDate()<10 ?"0"+d.getDate():d.getDate();
								let dd = `${m}/${day}`;          //获取上映的时间*/
								let dd = this.resetCurrentDate(allSchedules[j].showAt) //这个方法是上面注释的语句提替代方法
//								console.log(allSchedules[j])
								moviearr.push(allSchedules[j]);
								if(arr.indexOf(dd)==-1){
									arr.push(dd)
								}
//								console.log(arr)
							}
						}
						arr1.push(arr)
						allMovie.push(moviearr)
					}	
						console.log(allMovie)
						this.allFilmSchedule=arr1
						this.allFilmPlayDate=allMovie
			})
		},
		components:{
			swiper,
   			swiperSlide
		},
		computed: {
			swiper() {  
				return this.$refs.mySwiper.swiper;
			}
		},
		methods:{
			goback(){
				router.go(-1)
			},
			showIndexLeft(){
				this.activePicIndex=this.swiper.activeIndex-1;
				this.activeDate = 0;
				this.resetCurrentDate();
				console.log("kaishi")
				console.log(this.currentDate)
			},
			showIndexRight(){
				this.activePicIndex=this.swiper.activeIndex+1;
				this.activeDate = 0;
				this.resetCurrentDate();
				console.log("kaishi")
				console.log(this.currentDate)
			},
			selectData(i,currentTime){ //点击日期拦设置相关时间
				console.log(i)
				console.log(currentTime)
				this.currentDate = currentTime;
				this.activeDate = i;
			},
			showCurrentFilm(time){
				let d = new Date(time);
				let m = d.getMonth()+1 < 10 ?"0"+(d.getMonth()+1) :d.getMonth()+1;
				let day = d.getDate()<10 ?"0"+d.getDate():d.getDate();
				let dd = `${m}/${day}`;          //获取上映的时间
				
//				console.log(dd)
//				console.log(this.currentDate)
				if(dd == this.currentDate){
					return true;
				}
			},
			resetCurrentDate(time){
				let d = new Date(time || new Date());
				let m = d.getMonth()+1 < 10 ?"0"+(d.getMonth()+1) :d.getMonth()+1;
				let day = d.getDate()<10 ?"0"+d.getDate():d.getDate();
				let dd = `${m}/${day}`; 
				this.currentDate=dd;
				return dd;
			}

		},
	}
</script>

<style>
	.cinemaDetail{
		width:100%;
		height:100%;
		background:#eee;
		position:absolute;
		left:0;
		bottom:0;
		z-index: 100;
	}
	.cinemaDetail .cinemaDetailTitle{
		width:100%;
		height:0.88rem;
		font-size:0.3rem;
		position:relative;
		text-align: left;
		background:#fff;
		box-sizing: border-box;
		padding-left:0.2rem;
	}
	.cinemaDetail .cinemaDetailTitle span{
		line-height:0.88rem;
		color:#666;
	}
	.cinemaDetail .cinemaDetailTitle i{
		display: inline-block;
		width:0.4rem;
		height:0.4rem;
		font-size:0.4rem;
		padding:0.24rem 0.15rem;
	}
	.cinemaInfo{
		width:100%;
		margin-top:0.2rem;
		background:#fff;
		box-sizing:border-box;
		padding:0.1rem 0.2rem;
	}
	.cinemaInfo .cinemaName{
		font-size:0.3rem;
		width:96%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: normal;
	}
	.cinemaInfo .cinemaSupply{
		margin-bottom:0.1rem;
	}	
	.cinemaInfo .cinemaSupply span{
		border:1px solid #2da56e;
		font-size:0.24rem;
		padding:0 0.1rem;
		margin:0 0.05rem;
		border-radius:0.1rem;
		color:#2da56e;
	}
	.cinemaInfo .cinemaAddress{
		display: flex;
	}
	.cinemaInfo .wrapInfo{
		border-bottom:1px solid #ccc;
		position:relative;
	}
	.cinemaInfo .wrapInfo>i{
		position: absolute;
	    right: 0;
	    top: 0.1rem;
	    font-size: 0.4rem;
	}
	.cinemaInfo .cinemaAddress span{
		color:#666;
		font-size:0.24rem;
		margin:0.1rem 0;
	}	
	.cinemaInfo .cinemaAddress .add{
		display: inline-block;
		width:73%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.cinemaInfo .cinemaAddress span:last-child{
		display: inline-block;
		width:23%;
		padding-left:0.3rem;
		box-sizing:border-box;
		border-left:1px solid #ccc;
		text-align: right;
		position:relative;
	}
	.cinemaInfo .cinemaAddress span:last-child i{
		position:absolute;
		left:0.1rem;
		top:0;
		font-size:inherit;	
	}
	.swiper-container{
		background:#fff;
		position:relative;
		margin-top:0.2rem;
		box-sizing: border-box;
		padding:0.25rem 0.25rem;
	} 
	.swiper-wrapper .swiper-slide{

	}
	.swiper-wrapper .swiper-slide>img{
		height:2.7rem;
		width: 1.9rem;
		opacity: 0.7;
	}
	.swiper-wrapper	.swiper-slide-active img{
		opacity: 1;
	}

	
	
	/*.swiper-button-prev,
	.swiper-button-next{
	position: absolute;
    width: 31%;
    height: 2.7rem;
    top: 0;
    margin-top: 0;
    z-index: 1;
	}
	.swiper-button-prev{
    	left: 0;
	}
	.swiper-button-next{
		right:0;
	}*/	
	.filmInfo{
		width:100%;
		position:relative;
		box-sizing:border-box;
		padding:0 0.2rem;
		background:#fff;
		border-bottom:1px solid #ccc;
	}
	.filmInfo .filmName{
		width:100%;
		font-size:0.3rem;
		font-weight: 400;
	}
	.filmInfo .filmType span{
		font-size:0.24rem;
		color:#666;
		line-height:0.6rem;
	}
	.filmInfo i{
		position:absolute;
		right:0.2rem;
		top:0.2rem;
		font-size:0.28rem;
		color:#666;
	}
	.filmsSchedule .filmsScheduleList li{
		width:100%;
		overflow-x: auto;
		white-space: nowrap;
		display: none;
		background:#fff;
		border-bottom:1px solid #e9681f;
	}

	.filmsSchedule .filmsScheduleList span{
		display: inline-block;
		width:33.3%;
		text-align: center;
		font-size:0.24rem;
		box-sizing:border-box;
		padding:0.2rem;
		position:relative;
	}
	.filmsSchedule .filmsScheduleList span i{
		content:'';
		position:absolute;
		left:0;
		bottom:-1px;
		width:100%;
		height:1px;
		border-bottom:4px solid #e9681f;
		display: none;
	}

	.filmsSchedule .filmsScheduleList span i.active{
		display: block;
	}
	.filmPlayTimeList 	.showInfoLine{
		position:relative;
		box-sizing:border-box;
		padding:0.2rem 0.2rem 0;
		background:#fff;
	}
	.filmPlayTimeList li{
		display: none;
	}
	.filmPlayTimeList .showInfoLine .cinemaShowInfo{
		font-size:0.24rem;
		color:#999;
	}
	.filmPlayTimeList .showInfoLine .cinemaShowInfo span{
		color:#999;
		position:relative;
		
	}	
	.filmPlayTimeList .showInfoLine .cinemaShowInfo s{
		 float: right;
		margin-right: 0.3rem;
	}
	.filmPlayTimeList  .showTimeWrap{
		font-size:0.3rem;
		width:100%;
	}
	
	.filmPlayTimeList  .showTimeWrap .showTime{
		text-align: left;
	}
		
	.filmPlayTimeList  .showTimeWrap .maizuoPirce{
		float: right;
		color:#f67222;
		margin-right:0.3rem;
	}
	.filmPlayTimeList .showInfoLine .icon-next{
	    position: absolute;
	    right: 0.2rem;
	    top: 0.6rem;
	    font-size: 0.24rem;
	    color: #999;
	}
	.filmPlayTimeList .showInfoLine	.lineBottom{
		border-bottom:1px dashed #ccc;
		padding-bottom:0.2rem;
	}
</style>

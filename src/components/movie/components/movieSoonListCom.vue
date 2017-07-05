<template>
	<div  v-infinite-scroll="loadMore"
		  infinite-scroll-disabled="loading"
		  infinite-scroll-distance="10"
		  infinite-scroll-immediate-check=false>
		<li class="item" v-for="item in data3">
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
					<span class="cinemaCount"><em>{{item.cinemaCount}}</em>月<em>1</em>上映</span>
					<span class="watchCount">星期六</span>
				</div>
			</div>
		</li>
		<p class="bottomLoading" v-text="loadInfo"></p>
	</div>
	
</template>

<script>
	import Api from "./../../../assets/Api.js";
	
	export default{
		data(){
			return{
				page:2,
				loadInfo:'加载中...'
			}
		},
		methods:{
			loadMore() {
//				this.loading = true;
				this.$http.get(`${Api.movieHotMovieApi}?__t=1498792155586&page=${this.page}&count=10`)
				.then((response)=>{
					let that = this;
					if(response.data.data.films == 0){
						this.loadInfo = "天啦噜，身体已被掏空ヽ(#`Д´)ﾉ"
						return;
					}
					response.data.data.films.map(function(item,index){
						that.data3.push(item);
					})
					this.page++;
					this.loading = false;
				})
			}
		},
		props:{
			data3:Array
		}
	}
</script>

<style>
	
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
	}
	.bottomLoading{
		height:0.78rem;
		line-height:0.78rem;
		text-align:center;
	}
</style>
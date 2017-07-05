<template>
	<div class="show">
		<header class="showHeader">演出票务</header>

			
			<ul class="showList">
				<li class="showItem" v-for="item in showData">
					<img :src="item.skuList[0].image" alt="" />
					<p class="showDesc" v-text="item.masterName"></p>
				</li>
			</ul>			

	</div>
</template>

<script>
	export default{
		data(){
			return{
				showData:null,
			}
		},
		created(){
			this.$http.get(`/schedule?__t=${new Date().getTime()}&pageSize=6&pageNumber=1&sortKey=sortSalesCount&sortType=desc&isMultiSku=1`)
			.then((response)=>{
				console.log(response.data.data.list)
				this.showData=response.data.data.list
			})
		}
	}
</script>

<style>
	.show{
		width:100%;
		height:100%;
		background: pink;
		position:relative;
	}
	.showHeader{
		width:100%;
		height:0.88rem;
		font-size:0.3rem;
		line-height:0.88rem;
		padding-left:0.3rem;
		box-sizing: border-box;
		color:#666;
		background:#fff;
}
	.showHeader:after{
		display: block;
		content:'';
		position:absolute;
		left:0;
		bottom:-1px;
		width:100%;
		height:1px;
		border-top:1px solid #ccc;
		transform: scaleY(0.5);
	}
	.showList{
		width:100%;
		position:absolute;
		left:0;
		top:0.88rem;
		bottom:0.98rem;
		overflow: hidden;
		overflow-y:auto ;
		background: #eee;
	}
	.showList .showItem{
		background:#fff;
		box-sizing:border-box;
		padding:0.2rem 0.2rem 0.4rem;
		margin-bottom:0.15rem;
	}
	.showList .showItem img{
		width:100%;
	}
	.showList .showItem .showDesc{
		font-size:0.3rem;
	}
</style>
<template>
  <div id="app">
  	
  	<router-view></router-view><!--影片、影院、演出、商城、我的展示位置-->
  	
   <nav class="tabs">
   		<router-link v-for="item in tabs" :to="item.path" @click="changeAct">
   			<i :class="item.icon"></i>
   			<span>{{item.title}}</span>
   		</router-link>
   </nav>
  </div>
</template>

<script>

export default {
 data(){
 	return {
 		tabs:[
 			{title:"电影",path:"/movie",icon:"iconfont icon-dianying5"},
 			{title:"影院",path:"/cinema",icon:"iconfont icon-yingyuana"},
 			{title:"演出",path:"/show",icon:'iconfont icon-maikefenghuatong'},
 			{title:"商城",path:"/mall",icon:'iconfont icon-shangcheng1'},
 			{title:"我的",path:"/me",icon:"iconfont icon-wode"},
 		]
 	}
 },
 methods:{
 	changeAct(){
 		console.log("点击了")
 	}
 },
 created(){
 
 }
}
</script>

<style>
	*{
		margin:0;
		padding:0;
	}
	html,body,#app{
		width:100%;
		height:100%;
		position:relative;
	}
	ul,ol,li{
		list-style:none;
	}
	img{
		display: block;
		border:none;
	}
	input{
		outline: none;
	}
	a{
		text-decoration: none;
		color:#333;
	}
	span{
		color:#333;
	}
	
	
@media only screen and (max-width: 320px) {
  html {
    font-size: 50px;
  }
}
@media only screen and (min-width: 321px) and (max-width: 360px) {
  html {
    font-size: 56.25px;
  }
}
@media only screen and (min-width: 361px) and (max-width: 375px) {
  html {
    font-size: 58.59375px;
  }
}
@media only screen and (min-width: 376px) and (max-width: 400px) {
  html {
    font-size: 62.5px;
  }
}
@media only screen and (min-width: 401px) and (max-width: 414px) {
  html {
    font-size: 64.6875px;
  }
}
@media only screen and (min-width: 415px) and (max-width: 640px) {
  html {
    font-size: 100px;
  }
}
@media only screen and (min-width: 640px) {
  html {
    font-size: 100px;
  }
}
body {
  font-size: 16px;
}


.tabs{
	width:100%;
	height:0.98rem;
	background:#fff;
	position:absolute;
	left:0;
	bottom:0;
	display: flex;
	overflow: hidden;
}
.tabs:before{
	content:'';
	display: block;
	width:100%;
	height:1px; 
	border-bottom:1px solid #ccc;
	position:absolute;
	left:0;
	top:-1px;
	transform:scaleY(0.5);
}
.tabs a{
	flex:1;
	text-align: center;
	font-size:0.12rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.tabs a i{
		display: block;
		font-size:0.5rem;
		position:relative;
		font-weight: 400;
}

.router-link-active span{
	display: none;
}
.router-link-active i{
	color:#ff3000;
	transition: transform 0.3s;
	transform: scale(1.4) ;
	box-sizing:border-box;
	
}
.router-link-active i:after{
	content:"";
	width:0.45rem;
	height:0.03rem;
	background:#ff3000;
	position:absolute;
	bottom:0;
	left:0.42rem;
	margin-top:0.03rem;
}
</style>

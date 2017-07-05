//const host="http://m.maizuo.com/v4";
const hotMovie="/api/film/now-playing";//热映电影
const commingMove = "/api/film/coming-soon";//即将上映
const movieBanner = "/api/billboard/home";//首页轮播图
const movieDetail = "/api/film";//电影详情页
const allCinema = "/api/cinema";//城市所有影院
const cinemaSchedue = '/api/schedule';//影院所有电影排期
//const showPage = "http://ticket.maizuo.com/api";
export default{
	movieHotMovieApi:hotMovie,
	moviecommingSoonApi:commingMove,
	movieBannerApi:movieBanner,
	movieDetailApi:movieDetail,
	allCinemaApi:allCinema,
	cinemaSchedueApi:cinemaSchedue,
//	showPageApi:showPage
}
/*
 演出页数据接口
http://ticket.maizuo.com/api/schedule?__t=1499133849512&pageSize=6&pageNumber=1&sortKey=sortSalesCount&sortType=desc&isMultiSku=1
 *
 *商城广告
*http://aura.maizuo.com/api/ad/list
 *
 *
 *

 * http://m.maizuo.com/v4/api/city?__t=1498877384507 城市
 * 
 * http://m.maizuo.com/v4/api/cinema?__t=1498877385442 深圳所有电影院
 * 
 * 
 * http://m.maizuo.com/v4/api/film/3714?__t=1498888085448 电影详情页
 * 
 * http://m.maizuo.com/v4/api/cinema/230?__t=1498999021806 电影院详情
 * 
 * http://m.maizuo.com/v4/api/schedule?__t=1499053634497&film=0&cinema=2791 影院排期
 * 
 * 
 * */
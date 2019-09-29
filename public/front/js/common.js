
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});
//获得slider插件对象 自动轮播
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});
//该方法专门用于解析地址栏参数
function getSearch(k) {
  //获取地址栏 参数
  var search = location.search;

  // 将其解码成中文
  search = decodeURI( search );

  //去掉问号
  search = search.slice(1);

  //通过&将其分割成数组
  var arr = search.split("&");

  var obj = {};
  arr.forEach(function (v ,i) {
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    //通过[]语法会解析变量
    obj[key] = value;
  })
  return obj[k];
}
console.log(getSearch("k"));
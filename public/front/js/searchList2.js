$(function () {

 //f功能1 获取地址栏的赋值给 input
  var key = getSearch("key");
  $('.search_input').val( key );

  render();

  // 功能2 点击搜索按钮实现搜索功能
$('.search_btn').click(function () {
  var key = $('.search_input').val();//获取搜索关键字
  if(key.trim() === ""){
    mui.toast('请输入搜索关键字');
    return;
  }
  render();
      // 有搜索内容 需要 添加到本地存储中
  var history = localStorage.getItem('search_list')|| '[]';
  var  arr = JSON.parse( history );

  //往数组最前面追加
  // 要求（1）不能重复
  var index = arr.indexOf( key);
  if (index != -1){
    arr.splice(index ,1);
  }
// （2）长度不能超过10
  if (arr.length >= 10){
    // 删除最后一项
    arr.pop();
  }


})

  // 功能3 添加排序功能 点击切换类即可
  // 自己有current 切换箭头方向
  // 没有类给自己加上 让其他的兄弟元素移除
  $('.lt_sort a[data-type]').click(function () {
    if ($(this).hasClass("current")) {
      //切换箭头方向
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else {
      //没有currnet
      $(this).addClass("current").siblings().removeClass("current");
    }
    render();
  })



  //在方法中处理 了所有的参数
function render() {
var params ={};
  //(1)必传的参数
  params.proName = $('.search_input').val();
  params.page = 1;
  params.pageSize =100;
  // （2）可传可不传的参数
  // 两个可选的参数
  // 通过判断有没有高亮的a标签, 来决定需不需要传递排序的参数
var $current = $('.lt_sort a.current');
if ($current.length > 0){
  //有高亮 ，需要进行排序
  var sortName = $current.data("type");
  var sortVlaue = $current.find("i").hasClass('fa-angle-down') ? 2 :1;
  params[sortName] = sortVlaue;
}
setTimeout(function () {

  $.ajax({
    type:'get',
    url:'/product/queryProduct',
    data:params,
    dataType:"json",
    success:function (info) {
      console.log(info);
      // 通过模板引擎渲染
      var htmlStr = template('productTpl' , info );
      $('.lt_product').html( htmlStr );
    }

  })
},1000)

}












})
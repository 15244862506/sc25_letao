

$(function () {
  // 1.一进入页面就发送ajax请求 获取购物车数据
// （1）用户未登录 后台返回 error拦截到登录页
//   (2)用户已登录 后台返回 购物车数据 进行页面渲染

  render();
function render(){
setTimeout(function () {
  $.ajax({
    type:"get",
    url:'/cart/queryCart',
    dataType:"json",
    success:function (info) {
      console.log(info);

      // 未登录
      if (info.error === 400){
        location.href ="login.html"
        return;
      }
      //已登录
      var htmlStr =template('cartTpl',{ arr:info } )
      $('.mui-table-view').html( htmlStr );

//渲染完成 需要关闭下拉刷新
      mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
    }
  })
},500)
}

  // 配置下拉刷新

  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {

        // height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        // contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        // contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        // contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
          console.log("下拉刷新了");
          // 发送ajax请求 进行渲染
          render();

        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

// 功能3 删除功能
// （1）给删除注册点击事件 事件委托 通过tap注册进行点击
// （2）获取在按钮中存储的id
// （3）发送ajax请求 进行删除操作
// （4）页面重新渲染

  $('.lt_main').on('tap','.btn_delete',function () {
    var id = $(this).data('id');

    //发送请求
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data:{
        id:[id]
      },
      dataType: "json",
      success:function (info) {
        console.log(info);
        //重新渲染
        if (info.success){
          //调用一次下拉刷新
          mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        }
      }

    })

  })






})
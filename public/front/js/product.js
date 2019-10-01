
$(function () {
  //功能1 获取地址栏发productId   发送ajax请求 进行商品渲染
  var productId = getSearch('product');

  $.ajax({
    type:'get',
    url:"/product/queryProductDetail",
    data:{
      id:productId
    },
    dataType:"json",
    success:function (info) {
      console.log(info)
      // 通过模板引擎渲染
      var htmlStr = template('productTpl', info )
      $('.lt_main .mui-scroll').html( htmlStr );

      // 收动进行轮播初始化
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 手动初始化 数字框
      mui(".mui-numbox").numbox();
    }
  })


  //功能2 让尺码选中（通过事件委托注册）
  $('.lt_main').on('click','.lt_size span',function () {
    $(this).addClass('current').siblings().removeClass('current');

  })
// 功能3 加入购物车功能
//   添加点击事件
  // 收集尺码 数量 产品id 发送ajax请求
  $('#addCart').click(function() {
    // 获取尺码和数量
    var size = $('.lt_size span.current').text();  // 尺码
    var num = $('.mui-numbox-input').val(); // 数量

    if ( !size ) {
      mui.toast("请选择尺码");
      return;
    }

    // 发送 ajax 请求, 进行加入购物车
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        num: num,
        size: size
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        if ( info.success ) {
          // 添加成功, 弹出一个确认框
          mui.confirm( "添加成功", "温馨提示", ["去购物车", "继续浏览"], function( e ) {
            if ( e.index === 0 ) {
              // 去购物车
              location.href = "cart.html";
            }
          })
        }

        // 用户没登陆
        if ( info.error === 400 ) {
          // 跳转到登录页, 将来登录成功, 需要跳回来
          // 可以将当前页面的地址传递给登录页, 将来登录成功后, 获取传递过来的地址, 跳回来
          location.href = "login.html?retUrl=" + location.href;
        }
      }
    })


  })
















})
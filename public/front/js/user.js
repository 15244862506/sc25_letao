
$(function () {


  // 1.一进入页面 请求当前用户数据 进行页面渲染
// （1）用户已登录 返回用户数据 通过模板渲染
// （2）用户没有登录 后台返回error 当前用户未登录 拦截到登录页
$.ajax({
  type:"get",
  url:'/user/queryUserMessage',
  dataType:"json",
  success:function (info) {
    console.log(info);
    // 当前用户未登录 拦截到登录页
    if (info.error ===400){
      location.href = "login.html";
      return;
    }
    //用户已登录 通过模板引擎渲染
      var htmlStr =template('userTpl' ,info);
      $('#userInfo').html( htmlStr );

  }
})


  // 2.退出功能
  $('.logoutBtn').click(function () {
    //发送请求进行退出操作即可

    $.ajax({
      type: "get",
      url:"/user/logout",
      dataType: "json",
      success:function (info) {
        console.log(info);
        if (info.success  ){
          //退出成功 跳转到登录页
          location.href= "login.html"
        }
      }
    })
  })






})
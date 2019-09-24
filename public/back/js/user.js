/**
 * Created by Jepson on 2018/4/7.
 */

$(function() {

  // 当前页
  var currentPage = 1;
  // 一页多少条
  var pageSize = 5;

  var currentId;

  var isDelete;

  // 1. 一进入页面, 进行渲染
  render();

  function render() {
    // 发送请求, 获取表格渲染的数据
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        console.log( info );
        // 参数2 必须是一个对象
        // 在模板中可以任意使用对象中的属性
        // isDelete 表示用户的启用状态, 1就是启用, 0就是禁用
        var htmlStr = template( "tpl", info );
        $('.lt_content tbody').html( htmlStr );


        // 配置分页
        $('#paginator').bootstrapPaginator({
          // 指定bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),

           // 当页面被点击时触发
          onPageClicked: function( a, b, c, page ) {
          console.log("页面被点击了")
            // page 当前点击的页码
            currentPage = page;
            // 调用 render 重新渲染页面
            render();
          }
        });

      }
    });
  }


  // 2. 点击启用禁用按钮 通过事件委托给 按钮注册点击事件
    $('tbody').on('click' ,'.btn' ,function () {
      //显示模态框
      $('#userModal').modal('show');
      // 获取用户id jquery中提供了自定义 属性方法 data()
      currentId = $(this).parent().data('id');

      // console.log(id);
      // 如果时禁用按钮 说明需要将用户设成禁用状态 传0
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

    })
  // 点击模态框进行确认 修改用户对应状态
  $('#submitBtn').click(function () {

    console.log("用户的id是:"+currentId);
    console.log("用户状态改变:"+isDelete);
      // 发送ajax请求 进行确认改变状态
    $.ajax({
        type: 'post',
        url: "/user/updateUser",
      data: {
      id :currentId,
        isDelete:isDelete
      },
      dataType:"json",
      success:function (info) {
          console.log(info);
          if (info.success){
            // 1.关闭模态框
            $('#userModal').modal('hide');
            // 2.页面重新渲染
            render();
          }

      }
    })

  })


})

/**
 * Created by Jepson on 2018/4/7.
 */

$(function() {

  // 当前页
  var currentPage = 1;
  // 每页多少条
  var pageSize = 5;

  // 1. 一进入页面进行渲染
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        console.log(info);
        var htmlStr = template( "tpl", info );
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 配置bootstrap版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 注册每个页码的点击事件
          onPageClicked: function( a, b, c, page ) {
            // 重新渲染页面
            currentPage = page;
            render();
          }
        })
      }
    })
  }

// 2.点击添加分类按钮 显示添加模态框

    $("#addBtn").click(function () {
      $('#addModal').modal('show');

      //发送ajax请求 获取一级分类全部数据 通过模版引擎渲染
      // 通过page=1，pagesize=100模拟获取全部分类数据的接口
      $.ajax({
          type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
          pageSize:100
        },
        dataType:"json",
        success:function (info) {
          console.log(info);
          //通过模版引擎渲染 结合模版和数据
          var htmlStr = template('dropdwnTpl' ,info);
          $('.dropdown-menu').html( htmlStr );
        }
      })
    })

  // 3.通过事件委托 给dropdown-menu下的所以a绑定点击事件
    $('.dropdown-menu').on("click" ,'a' ,function () {
    // 获取a的文本
      var txt = $(this).text();
      // 设置给dropdwomText
      $('.dropdownText').text( txt );

      //获取选中的id
      var id = $(this).data("id");
      //设置给input
      $('[name="categoryId"]').val(id);

    })


  // 4.进行文件上传初始化
    $('#fileupload').fileupload({
      // 配置返回到数据格式
      dataType: "json",
      //图片上传完成后会调用done回调函数
      done:function (e , data) {
        //获取上传 得到的图片地址
        console.log(data.result.picAddr);
        var imgUrl = data.result.picAddr;
        // 赋值给img
        $('#imgBox img').attr( "src",imgUrl)
        //将图片地址 设置给input
        $('[name = "brandLogo"]').val( imgUrl )
      }

    })
});
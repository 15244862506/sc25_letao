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
    })


});
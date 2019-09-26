/**
 * Created by Jepson on 2018/4/9.
 */


$(function() {

  var currentPage = 1; // 当前页
  var pageSize = 2; // 一页多少条
  var picArr = []; // 专门用来保存图片对象

  // 1. 一进入页面就进行页面渲染
  render();

  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        console.log(info);
        // 将模板与数据对象相结合, 渲染到页面中
        var htmlStr = template( "productTpl", info );
        $('.lt_content tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 指定版本
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(  info.total / info.size ),
          // 给下面的页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            currentPage = page;
            render();
          },
          // 配置按钮大小 large
          size: "normal",
          // 配置每个按键的文字
          // 每个按钮, 都会调用一次这个方法, 他的返回值, 就是按钮的文本内容
          itemTexts: function( type, page, current ) {
            // first 首页 last 尾页, prev 上一页, next 下一页, page 普通页码
            // page 是当前按钮指向第几页
            // current 是指当前是第几页 (相对于整个分页来说的)
            switch( type ) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
          // 配置提示框
          tooltipTitles: function( type, page, current) {
            switch( type ) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return "前往第" + page + "页";
            }
          },
          // 使用 bootstrap 样式的提示框组件
          useBootstrapTooltip: true
        })
      }
    })
  };


  // 2. 点击添加按钮, 显示添加模态框
    $('#addBtn').on('click',function () {
      $('#addModal').modal('show');

      //发送ajax请求，请求所以的二级分类数据 进行下拉列表 渲染
      // 通过分页接口 模拟 获取全局数据的接口
      $.ajax({
        type: "get",
        url: "/category/querySecondCategoryPaging",
        data: {
          page:1,
          pageSize:100
        },
        dataType:'json',
        success:function (info) {
          console.log(info);
          // 通过模版引擎渲染
          var htmlStr = template('dropdownTpl' ,info);
          $('.modal-body .dropdown-menu').html(htmlStr);
        }
      })
    })



  // 3. 注册事件委托, 给 a 注册点击事件
    $('.dropdown-menu').on('click','a',function () {
      // 设置文本
      var txt = $(this).text();
      $('#dropdownText').text( txt );

      // 设置id的隐藏域
      var id =$(this).data("id");
      $('[name = "brandId"]').val(id);
    })

  // 4. 配置上传图片回调函数



  // 5. 配置表单校验


  // 6. 注册校验成功事件


});
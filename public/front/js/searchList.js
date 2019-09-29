/**
 * Created by Jepson on 2018/8/12.
 */
$(function() {

  var currentPage = 1;//当前页
  var pageSize = 2;//每页总数


  // 功能1: 解析地址栏参数, 将参数赋值到input框中
  var key = getSearch( "key" );
  $('.search_input').val( key );
  render();


  mui.init({
    //配置pullRefresh
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {

        // height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        // contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        // contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        // contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          console.log("下拉刷新了");
          // $('.lt_product').html( htmlStr );
          currentPage =1;
          //aiax回来之后 需要下拉刷新让内容回归顶部
          // mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        //拿到数据后 需要执行的 方法是不一样的
          render(function (info) {
            var htmlStr = template( "tpl" , info );
            $('.lt_product').html( htmlStr );

            //aiax回来之后 需要下拉刷新让内容回归顶部
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh( );


            //第一页数据被重新加载后 又有数据可以加载了 需要启用上拉加载
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
          });
          // page:1;
        }
      },
      //配置上拉加载
      up : {
        callback: function() {
          console.log( "执行了上拉加载" );
          // 需要加载下一页的数据, 更新当前页
          currentPage++;
          render(function( info ) {
            var htmlStr = template("tpl", info );
            $('.lt_product').append( htmlStr );

            // 当数据回来之后, 需要结束上拉加载
            // endPullupToRefresh(boolean) 结束上拉加载
            // 1. 如果传 true, 没有更多数据, 会显示提示语句, 会自动禁用上拉加载, 防止发送无效的ajax
            // 2. 如果传 false, 还有更多数据
            if ( info.data.length === 0 ) {
              // 没有更多数据了, 显示提示语句
              mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh( true );
            }
            else {
              // 还有数据, 正常结束上拉加载
              mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(false);
            }
          });
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }


    }
  });






  // 获取 input框的值, 请求数据, 进行渲染
  // 整个页面的核心方法 render
  // 在 render 方法中, 处理了所有的参数, 发送请求, 获取数据
  function render( callback ) {
    //$('.lt_product').html('<div class="loading"></div>');

    var params = {};
    // 1. 必传的 3 个参数
    params.proName = $('.search_input').val();
    params.page = currentPage;
    params.pageSize = pageSize;

    // 2. 两个可传可不传的参数
    //    (1) 通过判断有没有高亮元素, 决定是否需要排序
    //    (2) 通过箭头方向判断, 升序还是降序  1升序，2降序
    var $current = $('.lt_sort a.current');
    if ( $current.length > 0 ) {
      // 有高亮的, 需要进行排序
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
      params[ sortName ] = sortValue;
    }

    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: params,
        dataType: "json",
        success: function( info ) {
          console.log( info );
          // 真正拿到数据后执行的操作, 通过callback函数传递进来了
          callback && callback( info );
        }
      })
    }, 500 );

  }


  //
  // 功能2: 点击搜索按钮, 实现搜索功能
  $('.search_btn').click(function() {
    // 获取搜索框的值
    var key = $(".search_input").val();

    // 获取数组
    var jsonStr = localStorage.getItem("search_list");
    var arr = JSON.parse( jsonStr );

    // 1. 不能重复
    var index = arr.indexOf( key );
    if ( index > -1 ) {
      // 已经存在, 删除该项
      arr.splice( index, 1 );
    }
    // 2. 不能超过10个
    if ( arr.length >= 10 ) {
      arr.pop();
    }

    // 将搜索关键字添加到 arr 最前面
    arr.unshift( key );

    // 转存到本地存储中
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    render();
  });



  // 功能3: 点击价格或者库存, 切换current, 实现排序
  // 1. 绑定点击事件, 通过 a[data-type] 绑定
  // 2. 切换 current类
  //    (1)点击的a标签没有current类, 直接加上 current类, 并且移除其他 a 的current类
  //    (2)点击的a标签有current类, 切换箭头方向
  // 3. 调用 render 重新渲染

  $('.lt_sort a[data-type]').click(function() {

    if ( $(this).hasClass("current") ) {
      // 有类, 切换箭头方向
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      // 当前a没有类, 给自己加上, 让其他的移除
      $(this).addClass("current").siblings().removeClass("current");
    }

    // 重新渲染
    render();
  })



});
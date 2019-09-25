
$(function () {
  //1.一进入页面就发送ajax请求获取数据通过模版引擎渲染
  var currentPage = 1;//当前页
  var PageSize = 5;//每页条数
  render();
function render() {
  $.ajax({
    type:'get',
    url:"/category/queryTopCategoryPaging",
    data:{
      page:currentPage,
      pageSize:PageSize
    },
    dataType:"json",
    success:function (info) {
      console.log(info);
      // 将数据和模版相结合 进行渲染
      var htmlStr = template('tpl' , info );
      $("tbody").html( htmlStr );

      //进行分页初始化
      $('#paginator').bootstrapPaginator({
        //指定bootstrap版本
        bootstrapMajorVersion : 3,
        //总页数
        totalPages:Math.ceil(info.total /info.size),
        //当前第几页
        currentPage:info.page,
        //注册按钮点击事件
        onPageClicked:function (a,b,c,page) {
          // 更新当前页
          currentPage = page;
          //重新渲染
          render(); 
        }
      })
    }
  })
}

})
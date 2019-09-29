

$(function () {
  //1.解析获取地址栏传递过来的搜索关键字 设置给input、
    var key =getSearch("key");
    console.log(key);
    //设置给 input
  $('.search_input').val(key);
  // 一进入页面，就搜索关键字发送请求，进行页面渲染
  render();

function render(){
  //准备请求数据 渲染时 显示加载中的效果
  $('.lt_product').html('<div class="loading"></div>')

var params ={};
//三个必传的参数
  params.proName=$('.search_input').val();//搜索关键字
  params.page =1;
  params.pageSize=100;
  // 两个可选的参数
  // 通过判断有没有高亮的a标签, 来决定需不需要传递排序的参数
    var $current = $('.lt_sort a.current');
    if ($current.length >0){
      //有高亮说明a 说明需要进行排序
      //获取传给后台的值
      var sortName = $current.data("type");
      // console.log(sortName);
      // 获取传给后台的值 根据箭头的方向
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      // 添加到params中
    params[sortName] = sortValue;

    }

setTimeout(function () {
  $.ajax({
    type:'get',
    url:"/product/queryProduct",
    data:params,
    dataType:"json",
    success:function (info) {
      console.log(info);
      // 通过模板引擎进行渲染
      var htmlStr = template('productTpl' ,info);
      $('.lt_product').html( htmlStr )
    }
  })
},1000)

}


// 2.功能：点击搜索按钮实现搜索功能
  $('.search_btn').click(function () {

    //需要将搜索关键字  追加存储到本地存储中
    var key = $('.search_input').val();
    if (key.trim()===""){
      mui.toast('请输入搜索关键字');
      return;
    }
    // 搜索
    render();
    
    //获取数组 ，需要将jsonStr =》 arr
    var history = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse( history );

    // 1.删除重复的项
      var index = arr.indexOf( key );
      if (index != -1){
        //删除重复的项
        arr.splice(index ,1)
      }
    //     2.长度限制在10
    if (arr.length >=10){
      //删除最后一项
      arr.pop();
    }


    // 将关键字追加到arr前面
    arr.unshift( key );
    //转换成json 存储到本地存储中
    localStorage.setItem("search_list",JSON.stringify( arr ));


  })


  // 功能3排序

  // 通过属性选择器给价格和库存添加点击事件进行排序
// （1）如果自己有currnet 点击切换箭头的方向就行了
// （2)如果没有给自己加上current类
//  并且移除兄弟元素的current类
$('.lt_sort a[data-type]').click(function () {
  
  if ($(this).hasClass("current")){
    //有currnent 切换箭头就可以了
    $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
  }else {
    //没有current类 自己加上 在移除兄弟元素的
     $(this).addClass('current').siblings().removeClass("current");
  }
  // 重新渲染页面 因为所有的参数都在render处理好了
  render();
})




})
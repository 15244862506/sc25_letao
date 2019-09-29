

$(function () {
  //1.解析获取地址栏传递过来的搜索关键字 设置给input、
    var key =getSearch("key");
    console.log(key);
    //设置给 input
  $('.search_input').val(key);
  // 一进入页面，就搜索关键字发送请求，进行页面渲染
  render();

function render(){


  $.ajax({
    type:'get',
    url:"/product/queryProduct",
    data:{
      proName:$('.search_input').val(),
      page:1,
      pageSize:100
    },
    dataType:"json",
    success:function (info) {
      console.log(info);
      // 通过模板引擎进行渲染
      var htmlStr = template('productTpl' ,info);
      $('.lt_product').html( htmlStr )
    }
  })

}


// 2.功能：点击搜索按钮实现搜索功能
  $('.search_btn').click(function () {

    //需要将搜索关键字  追加存储到本地存储中
    var key = $('.search_input').val();
    if (key.trim()===""){
      alert("请输入搜索关键字")
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










})
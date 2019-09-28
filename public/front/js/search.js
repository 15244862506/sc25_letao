$(function () {

  // 注意 要进行本地存储localStorage的操作 ,进行历史记录管理
// 需要约定一个键名 search_list
//   将来通过search_list来进行读取和设置操作

  // 准备假数据
// var arr = ["耐克","阿迪","阿迪王","耐克王","新百伦"];
// var jsonStr = JSON.stringify( arr );
// localStorage.setItem("search_list",jsonStr);
  // 功能1
  // (1)从本地存储中读取历史记录，读取的是jsonStr
  // (2)转换成数组
render();
  //从本地存储中读取历史记录 以数组的形式返回
  function getHistory() {
// 如果没有读取到数据 默认初始化成一个空数组
    var history = localStorage.getItem("search_list") || '[]' ;
    var arr = JSON.parse(history);
    console.log(arr)
    return arr;
  }
  // 读取数组 通过模版引擎渲染
  function render() {
    // 通过模版引擎渲染
    var arr = getHistory();
    // template('模版’引擎' 数据对象)
    var htmlStr = template('historyTpl' ,{arr:arr} );
    $('.lt_history').html( htmlStr );


  }

  // 功能2 清空历史记录功能
// （1）注册事件 通过事件委托注册
// （2）清空历史记录 removeItem
//   (3)页面重新渲染
$('.lt_history').on("click",'.btn-empty',function () {
  //清空记录
  localStorage.removeItem('search_list');
  //重新渲染
   render();
})



});
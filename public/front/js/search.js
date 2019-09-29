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

  // 添加mui确认框
  // 参数1 ：对话框内容 message
  // 参数2： 对话框标题 title
  // 参数3 ：按钮文本数组 btnArr
  //   参数4：  回调函数 callback
  mui.confirm("你确认要清空历史记录吗？","温馨提示",[ "取消","确认"],function (e) {
    // e.index 可以获取所点击的按钮的索引
    console.log(e);
    if (e.index  == 1){

      //清空记录
      localStorage.removeItem('search_list');
      //重新渲染
       render();
    }else {
          alert("666")
    }

  })

});


  // 功能3: 删除单条历史记录
  // (1) 事件委托绑定点击事件
  // (2) 将下标存在删除按钮中, 点击后获取下标
  // (3) 读取本地存储, 拿到数组
  // (4) 根据下标, 从数组中将该下标的项移除,  splice
  // (5) 将数组转换成 jsonStr
  // (6) 存到本地存储中
  // (7) 重新渲染
$('.lt_history').on('click' ,'.btn_del',function () {
  //将外层的this指向 存储在that中
  var that = this;

  //添加确认框
  mui.confirm("你确定要删除该条记录吗？","温馨提示",["取消","确认"],function (e) {
    console.log(e);
    if (e.index ==1){
      //获取下标
      var index = $(that).data("index");
      // 获取数据
      var arr = getHistory();
      //根据下标 删除数据的对应项
      // splice(从哪里开始，删除几项 ，添加几项1 ，添加项2。。。)；
      arr.splice(index ,1);

      // 转成jsonStr 存到本地存储中
      localStorage.setItem('search_list',JSON.stringify(arr));
//页面重新渲染
      render();
    }
  })

})

  // 功能4 添加历史记录功能
// （1）给搜索按钮，添加点击事件
//   （2）获取输入框的值‘
//   （3）获取本地历史中存的数组
//   （4)王数组前面追加
//   （5）转化成jsonStr 将修改后的存储到本地存储中
//   （6）页面重新渲染
$('.search_btn').click(function () {
  //获取搜索关键字
  var key =  $('.search_input').val();
  //判断是否非空
  if (key === ""){
    alert("请输入搜索关键字");
    return;
  }
  //获取数组
  var arr = getHistory();

  // 需求
  // 1.如果有重复项  先将重复的删除 将这项 添加到最前面
// 2.长度不能超过10个
var index = arr.indexOf( key );
if (index != -1){
  //说明在数组中可以找到重复的值 且索引为idnex
  arr.splice(index ,1);
}
if (arr.length >= 10){
  //删除最后一项
    arr.pop();
}

  //往数组最前面追加
  arr.unshift( key );
  //转化成 jsonStr 存储到本地存储中
  localStorage.setItem( "search_list",JSON.stringify( arr ));
  //重新渲染
  render();
  //清空输入框
  $('.search_input').val("");

  //添加跳转 ，跳转到产品列表页
  location.href = "searchList.html?key="+key;



})
  
  
  
  
  
  
});
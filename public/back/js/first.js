
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

// 2.点击添加分类按钮 添加模态框
  $('#addBtn').click(function () {
      $('#addModal').modal("show");
  });

// 3.使用表单校验 ， 实现表单校验
  $('#form').bootstrapValidator({

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    //配置字段
    fields:{
      categoryName: {
        validators:{
          notEmpty:{
            message:"一级分类不能为空"
          }
        }
      }
    }
  })

  // 4.注册表单校验成功事件，阻止表单默认提交行为 通过ajax提交
    $('#form').on('success.form.bv',function (e) {
      e.preventDefault();


      //通过ajax提交
      $.ajax({
        type: "post",
        url: "/category/addTopCategory",
        data: $('#form').serialize(),
        dataType: "json",
        success:function (info) {
          console.log(info);
          //添加完成
          // 关闭模态框，页面重新渲染
          $('#addModal').modal('hide');
          // 2.页面重新渲染到第一页，让用户看到第一页数据
          currentPage =1;
          render();
          //重置模态框
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      })
    })

});
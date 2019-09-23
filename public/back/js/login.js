$(function () {
//   校验规则：
//
// 1. 用户名不能为空
//   2. 用户密码不能为空
//   3. 用户密码长度为6-12位
//配置的字段和input的name关联 所以必须要加input加上name
    $("#form").bootstrapValidator({
      //配置字段
      fields:{
        //校验用户名，对应name表单的name属性
        username: {
          validators: {
            //不能为空
            notEmpty: {
              message: '用户名不能为空'
            },
            //长度校验
            stringLength:{
              min:2,
              max:6,
              message:"用户名长度必须在2~6位"
            },

          }
        },
        password:{
            validators: {
              notEmpty: {
                message: "密码不能为空"
              },
              stringLength: {
                max: 12,
                min: 6,
                message:"密码长度必须在6~12位"
              }
            }
        }

      }
    });

});
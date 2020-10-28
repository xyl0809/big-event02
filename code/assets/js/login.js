$(function () {
  $('#go-reg').on('click',function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#go-login').on('click',function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //密码校验
  var form = layui.form
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
      // 确认密码
    repwd: function (value) {
    var pwd = $(".reg-box input[name=password]").val()
      if (value !== pwd) {
      return'密码不一致'
    }
  }
  })
  var layer=layui.layer
// 注册表单
  $('#form-reg').on('submit', function (e) { 
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: {
        username:$('.reg-box [name=username]').val(),
        password:$('.reg-box [name=password]').val(),
      },
      success: function (res) { 
        if (res.status !== 0) { 
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        $('#go-login').click()
        $('#form-reg')[0].reset()
      }
    })
  })

// 登录表单
  $('#form-login').submit(function (e) { 
    e.preventDefault()
    $.ajax({
      type:'post',
      url: '/api/login',
      // 快速获取表单数据
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) { 
          return layer.msg('密码错误')
        }
        layer.msg(res.message)
        localStorage.setItem('token',res.token)
        location.href='/index.html'
      }
    })
  })
})
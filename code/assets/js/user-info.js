$(function () {
  var form = layui.form
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度在1~6位之间'
      }
    }
  })
  initUserInfo()
  var layer = layui.layer
  // 获取用户信息
  function initUserInfo () {
    $.ajax({
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        form.val('formUserInfo', res.data)
      }
    })
  }

  $('#btnReSet').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        window.parent.getUserInfo()
      }

    })
  })

})
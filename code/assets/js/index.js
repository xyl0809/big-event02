// 入口函数
$(function () {
  getUserInfo()
})
// 获取数据
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    // headers: {
    //   Authorization:localStorage.getItem('token')
    // },
    success:function (res) {
      console.log(res);
      if (res.status!==0) {
        return layui.layer.msg('失败')
      }
      renderAvatar(res.data)
    }
  })
}
function renderAvatar (user) {
  console.log(user);
  // 获取用户名
  var name = user.nickname || user.username
  $('#welcome').html('欢迎' + name)
  // 获取头像
  if (user.user_pic != null) {
    // 有头像
    // 显示头像
    $('.layui-nav-img').show().attr('scr', user.user_pic)
    // 字母隐藏
    $('.text-avatar').hide()
  }
  else {
    // 没有头像
    console.log(name);
    // 获取name的第一个字母并大写
    var text = name[0].toUpperCase()
    // 默认图片隐藏
    $('.layui-nav-img').hide()
    // 显示字母
    $('.text-avatar').show().html(text)
  }
}
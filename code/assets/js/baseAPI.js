$.ajaxPrefilter(function (options) {
  // 每次调用ajax请求的时候会先调用 ajaxPrefilter
  // // console.log(options.url);  >>> http://ajax.frontend.itheima.net/api/login
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ""
    }
  }
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})
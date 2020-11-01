$(function () {

  var q = {
    pagenum: 1,    /* 页码值 */
    pagesize: 2,    /* 每页显示多少条数据 */
    cate_id: '',     /* 文章分类的 Id */
    state: ''     /* 文章的状态，可选值有：已发布、草稿 */
  }
  initTable()
  initCate()
  // 封装渲染数据的函数
  function initTable () {
    $.ajax({
      url: '/my/article/list',
      data: q,
      success: function (res) {
        var htmlStr = template('tpl-list', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }

  // 封装时间格式化函数
  template.defaults.imports.dateFormat = function (date) {
    var dt = new Date(date)
    var y = dt.getFullYear()
    var m = getZero(dt.getMonth() + 1)
    var d = getZero(dt.getDate())
    var h = getZero(dt.getHours())
    var mm = getZero(dt.getMinutes())
    var s = getZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
  }

  // 封装补零函数
  function getZero (n) {
    return n > 9 ? n : '0' + n
  }
  var form = layui.form
  // 初始化分类的函数
  function initCate () {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return '获取失败'
        }
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }

  // 点击筛选 
  $('#search-form').on('submit', function (e) {
    e.preventDefault()
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    initTable()
  })

  // 渲染分页
  var laypage = layui.laypage;
  function renderPage (total) {
    console.log(total);
    laypage.render({
      elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      // 分页模块设置
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip',],
      limits: [2, 3, 5, 7],
      // 切换页面 调用jump函数 
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit); //得到每页显示的条数
        //首次不执行
        if (!first) {
          //切换分页 改变当前页码 调用 initTable()
          q.pagenum = obj.curr
          q.pagesize = obj.limit
          initTable()
        }
      }
    });
  }

  // 点击删除 删除该条发布
  $('body').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          // 页面汇总删除按钮个数等于1 页码大于1 
          if ($('.btn-delete').length === 1 && q.pagenum > 1) {
            q.pagenum--
          }
          initTable()
        }
      })
      layer.close(index);
    });
  })



})
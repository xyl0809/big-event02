$(function () {
  initArtListCate()
  var layer = layui.layer
  var form = layui.form
  // 封装函数渲染数据
  function initArtListCate () {
    $.ajax({
      url: '/my/article/cates',
      success: function (res) {
        console.log(res);
        var htmlStr = template('tpl-data', res)
        $('tbody').html(htmlStr)
      }
    })
  }


  // 点击添加出现弹窗
  var indexAdd = null
  $('.btn-add').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文章分类',
      content: $('#tpl-add').html()
    });
  })
  // 点击确认添加新增
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        initArtListCate()
        layer.close(indexAdd)
      }
    })
  })

  // 点击编辑出现弹窗
  var indexEdit = null
  $('tbody').on('click', '#art-edit1', function () {
    var id = $(this).attr('data-id')
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加文章分类',
      content: $('#tpl-edit').html()
    });
    $.ajax({
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
        // 表单快速赋值
      }
    })
  })
  // 点击修改按钮提交修改
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        initArtListCate()
        layer.close(indexEdit)
      }

    })
  })
  // 删除
  $('tbody').on('click', '#btn-delete', function () {
    var id = $(this).attr('data-id')
    layer.confirm('删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg(res.message)
          initArtListCate()
        }
      })
      layer.close(index);
    });
  })

})
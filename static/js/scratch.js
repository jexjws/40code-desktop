apihost = "https://service-dq726wx5-1302921490.sh.apigw.tencentcs.com/";
window.waitRequest = {}, window.scratch = {
  alertLoadExt: async () => {
    let context = `请选择：<br>
    <div class="mdui-list">`;
    let extList = await ((await fetch(apihost + 'work/ext')).json())
    for (let i = 0; i < extList.length; i++) {
      let j = extList[i];
      context += `
      <label class="mdui-list-item mdui-ripple">
        <div class="mdui-checkbox">
          <input name="extSelect" type="checkbox" ${vm.extensionManager._loadedExtensions.get(j.extId) ? 'checked' : ''}/>
          <i class="mdui-checkbox-icon"></i>
        </div>
        <div class="mdui-list-item-content">${j.name}<span class="mdui-float-right" style="color:#777;font-size:10px;">${j.author}</span></div>
      </label>
        `
    }
    context += "</div>"
    mdui.alert(context, async () => {
      for (let i = 0; i < extList.length; i++) {
        if ($('[name="extSelect"]')[i].checked) {
          try {
            if (!vm.extensionManager._loadedExtensions.get(extList[i].extId))
              vm.extensionManager.loadExtensionURL('https://newsccode-1302921490.cos.ap-shanghai.myqcloud.com/ext/' + extList[i].extId + '.js')
            // if (window.tempExt) {
            //   Scratch.extensions.register(new (window.tempExt.Extension)(vm.runtime))
            //   window.tempExt = 0;
            // }
          } catch (error) {
            console.log(e)
          }
        }
      }
    })
  },
  uploadExt: async () => {
    var d = document.createElement('input');
    d.type = "file";
    d.accept = ".js";
    d.click();
    var int = setInterval(() => {
      if (!d.files.length) {
        return;
      }
      var reader = new FileReader();//新建⼀个FileReader
      clearInterval(int)
      try {
        reader.readAsText(d.files[0])
        reader.onload = function (evt) { //读取完⽂件之后会回来这⾥
          // var fileString = evt.target.result; // 读取⽂件内容
          // vm.extensionManager.loadExtensionURL({data:fileString})
          var fileString = new Blob([evt.target.result]); // 读取⽂件内容
          vm.extensionManager.loadExtensionURL(URL.createObjectURL(fileString))
        }
      } catch (error) {
        resolve('')
        console.log(error)
      }
    }, 50)
  }
};
var temp2 = {
  apihost: "https://service-dq726wx5-1302921490.sh.apigw.tencentcs.com/",
};
function dataURLToBlob(dataurl) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// var workinfo = { "id": 722, "opensource": 1, "publish": 1, "author": 369, "introduce": "从XMW转载过来的，加了个存档码", "name": "躲开球！Dodge Ball!", "time": 1655540550, "image": "4e215e84d3a77d668ea727e747f74f22.png", "look": 16, "like": 0, "delete": 0, "publish_time": 1655543758, "update_time": 1655543691, "issign": 1, "islike": 0, "nickname": "RenJian", "head": "c7d3b642b558c93e56872b6038b2fbd8.jpg", "fuckyou": "cS1zaWduLWFsZ29yaXRobT1zaGExJnEtYWs9QUtJRHFVdDFzVHB2akdaaFk4YW10aktnbWNDVllMdkdNQmowJnEtc2lnbi10aW1lPTE2NTU2NTg5NTQ7MTY1NTY1OTA3NCZxLWtleS10aW1lPTE2NTU2NTg5NTQ7MTY1NTY1OTA3NCZxLWhlYWRlci1saXN0PSZxLXVybC1wYXJhbS1saXN0PSZxLXNpZ25hdHVyZT1jNmVjNzY5NDcwN2JmNzQ1NjY0Yjk1NzBjMmI3ZWZiNDM4ZTU3M2Vi" };

function setCookie(cname, cvalue, exdays) {
  console.log('设置cookie')
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {

  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      let d = c.substring(name.length, c.length);
      if (cname == 'token') {
        try {
          v.$data.token = d
        } catch (error) { }
      }
      return d
    }
  }
  return "";
}
function getuserinfo() {
  get({
    url: 'user/myinfo'
  }, function (d) {
    userdetail = d.data;
    console.log('获取信息成功', d)
    if ((typeof v) !== "undefined") {
      v.$data.detail = d.data;
      // qh('index')
    }

    //   $('#n-input')[0].value=d.data.nickname

  })
}
function getuserinfosync() {
  return new Promise(function (reslove) {
    get({
      url: 'user/myinfo'
    }, function (d) {
      userdetail = d.data;
      console.log('获取信息成功', d)
      if ((typeof v) !== "undefined") {
        v.$data.detail = d.data;
        // qh('index')
      }
      reslove(userdetail)
    })
  })
}
function getworkinfosync(id) {
  return new Promise(function (reslove) {
    get({
      url: 'work/info',
      data: { id: id }
    }, function (d) {
      reslove(d.data)
    })
  })
}
function get(d, n, eee) {
  let d2 = d.data;
  if (!d2) d2 = {};
  if (d.p) {
    if (waitRequest[d.p]) return;
    waitRequest[d.p] = 1;
  }
  d2.token = getCookie('token');
  $.ajax({
    url: apihost + d.url,
    data: d2,
    type: 'get',
    // headers: { "Authorization": getCookie('token') },
    headers: { 'onreferer': location.pathname, 'href': location.href },
    success: function (f) {
      console.log(f)
      if (f.redirect) {
        location.href = f.redirect;
        return;
      }
      if (f.cz == 'exit') {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log('清除cookie')
      }
      d.p && (delete waitRequest[d.p])
      n && n(f)
    },
    error: function (e) {
      d.p && (delete waitRequest[d.p])

      console.log(e)
      if (eee)
        eee()
      else
        alert("服务器或网络错误")
    }
  })
}
function post(d, n, eee) {
  let d2 = d.data;
  if (d.p) {
    if (waitRequest[d.p]) return;
    waitRequest[d.p] = 1;
  }
  if (!d2) d2 = {};
  $.ajax({
    url: apihost + d.url + '?token=' + getCookie('token'),
    data: JSON.stringify(d2),
    type: 'post',
    contentType: 'application/json',
    headers: { 'onreferer': location.pathname, 'href': location.href },
    success: function (f) {
      console.log(f)
      if (f.redirect) {
        location.href = f.redirect;
        return;
      }
      if (f.msg || f.errmsg) {
        alert(f.msg || f.errmsg)
      }
      if (f.cz == 'exit') {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log('清除cookie')
      }
      d.p && (delete waitRequest[d.p])
      n && n(f)
    },
    error: function (e) {
      d.p && (delete waitRequest[d.p])
      console.log(e)
      if (eee) eee()
      else alert("服务器或网络错误")
    }
  })
}

function downloadFileByBlob(blob, fileName = "file") {
  let blobUrl = window.URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.download = fileName || 'defaultName'
  link.style.display = 'none'
  link.href = blobUrl
  // 触发点击
  document.body.appendChild(link)
  link.click()
  // 移除
  document.body.removeChild(link)
}
function dlp() {
  window.scratch.getProjectFile(file => {
    downloadFileByBlob(file);
  })
}
function savecover(callback) {
  $('#b').hide();
  function uplw(d) {
    let f = new FormData();
    $("#setCover").text('正在保存封面文件');
    f.append("image", d)
    $.ajax({
      url: apihost + 'work/uploads?token=' + getCookie('token'),
      method: 'POST',
      data: f,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json',
      // 图片上传成功
      success: function (result1) {
        if (result1.code != 1) {
          hy();
          alert("保存失败");
          return;
        }
        hy(result1);
        $("#setCover").text('封面保存成功')
      },
      error: function () {
        hy();
        alert("保存失败");
      }
    });
  }
  function hy(r) {

    let k = r.data[2][0][1].Key.split('/');
    callback && callback(k[k.length - 1]);
    setTimeout(() => {
      $("#setCover").text('设置当前截图为封面');
      $("#saveProject").text('保存');
    }, 5000)
  }
  $("#setCover").text('正在保存封面……');
  vm.postIOData('video', { forceTransparentPreview: true });
  vm.renderer.requestSnapshot(dataURI => {
    vm.postIOData('video', { forceTransparentPreview: false });
    uplw(dataURLToBlob(dataURI));
  });
  vm.renderer.draw();
}
async function saveproject(id, callback, Open) {
  console.log("自定义按钮1");
  console.log('分享按钮');
  let data2 = [];
  var vs = vm.assets;
  $("#scratch").css("opacity", "0");
  $('#view').show();
  $('#dlp').show();
  $('#i2').hide
  let f = function (i2) {
    let i = i2
    if (!i) return;
    for (let j = 0; j < vs.length; j++) {
      if (vs[j].assetId == i.split('.')[0]) {
        i = j; break;
      }
    }
    debugger
    i = new Blob([vs[i].data], { type: vs[i].assetType.contentType })
    console.log(URL.createObjectURL(i))
    return i
  }

  function hy() {
    $("#scratch").css("opacity", "1");
    $('#view').hide();
    $('#dlp').hide();
    try {
      $("#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div:nth-child(4) > span:nth-child(3) > div")[0].text("保存")
    } catch (e) {
      console.log(e)
    }
    setTimeout(() => {
      $("#setCover").text('设置当前截图为封面');
      $("#saveProject").text('保存');
    }, 5000)
    callback && callback();
  }
  function uplw() {
    let f = new FormData();
    $("#saveProject").text('正在保存作品文件……');

    f.append("work", new Blob([vm.toJSON()]))
    $.ajax({
      url: apihost + 'work/upload?token=' + getCookie('token') + '&id=' + (id || workinfo.id),
      method: 'POST',
      data: f,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json',
      headers: { 'onreferer': location.pathname, 'href': location.href, 'publish': Open || undefined },
      // 图片上传成功
      success: function (result1) {
        if (result1.code != 1) {
          hy();
          alert("保存失败");
          return;
        }
        hy();
        $(window).unbind('beforeunload');
        window.onbeforeunload = null;
        let vvv = "";
        try {
          vvv = $('.input_input-form_2EIqD.project-title-input_title-field_13MIs.menu-bar_title-field-growable_2DAmE').val()
        } catch (e) {

        }
        Open && (location.href = ("/#page=workinfo&publish=1&id=" + workinfo.id + '&name=' + vvv))
        $("#saveProject").text('作品保存成功')
        window.onbeforeunload = function () { return; }
      },
      error: function () {
        hy();
        alert("保存失败");
      }
    });
  }

  function upa(t) {
    // debugger;
    if (!f(data2[t])) {
      if (t + 1/*n + t*/ >= data2.length) {
        $('#b').hide();
        uplw();
      }
      else
        upa(t + 1)
      console.log('被迫退出')
      return;
    }
    if (f(data2[t]).size > 5.5 * 1024 * 1024) {
      console.log('尺寸过大', t, data2[t], '跳过')
      mdui.snackbar('含有>5.5MB的素材，已跳过')
      t++;
      upa(t);
      return;
    }
    // debugger;
    let list = [], data = new FormData(), n = 0, file = f(data2[t]);
    data.append('image', file)
    console.log(n)
    debugger;
    $.ajax({
      url: apihost + 'work/uploads?token=' + getCookie('token'),
      method: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json',
      // 图片上传成功
      success: function (result1) {
        if (result1.code != 1) {
          hy();
          alert("保存失败");
          return;
        }
        if (vm.assets && data2[t] && vm.assets[data2[t]]) vm.assets[data2[t]].clean = true;
        console.log(vm.assets, data2[t])
        $('#saveProject').text('保存素材中…… ' + parseInt((t + 1/*n + t*/) / data2.length * 10000) / 100 + '%')
        if (t + 1/*n + t*/ >= data2.length) {
          $('#b').hide();
          uplw();
        }
        else
          upa(t + 1)
      },
      error: function () {
        hy();
        alert("保存失败");
        console.log('保存失败');
      }
    });
  }

  function chunk(arr, size) {
    var objArr = new Array();
    var index = 0;
    var objArrLen = arr.length / size;
    for (var i = 0; i < objArrLen; i++) {
      var arrTemp = new Array();
      for (var j = 0; j < size; j++) {
        arrTemp[j] = arr[index++];
        if (index == arr.length) {
          break;
        }
      }
      objArr[i] = arrTemp;
    }
    return objArr;
  }
  function sleep(time) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), time)
    })
  }
  function aftercheck() {
    if (data2.length) {
      // $("#loadinfo").html('正在保存素材');
      $('#saveProject').text("正在保存素材……")
      $('#b').show()
      upa(0);
    }
    else uplw();
  }

  $('#i2').hide();
  $('#saveProject').text("正在检查素材列表……")
  for (let i of vs) {
    if (!i.clean)
      data2.push(i.assetId + '.' + i.dataFormat)
  }
  let checkdata = await new Promise(async (resolve) => {
    console.log('fuckyou', data2)
    let list = chunk(data2, 1000), filelist = [], num = 0;
    // debugger;
    if (!list.length) resolve([])
    for (let i = 0; i < list.length; i++) {
      //   debugger;
      post({
        url: 'work/imagelist',
        data: { list: list[i] }
      }, (d) => {
        num++;
        console.log(d);
        filelist = filelist.concat(d.data);
        if (num == list.length) {
          resolve(filelist);
        }
      }, (d) => {
        resolve(null)
      })
      if (i != list.length - 1) await sleep(4000)
    }

  });
  if (checkdata) {
    data2 = checkdata
    console.log(data2)
    aftercheck();
  } else {
    alert('作品素材检查失败，请重试，多次失败请联系QQ:3274235903查看原因')
    hy();
  }


}
function save(open) {
  try {
    $("#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div:nth-child(4) > span:nth-child(3) > div")[0].text("保存中……")
  } catch (e) {
    console.log(e);
  }
  if (workinfo.isauthor)
    saveproject(null, null, open)
  else {
    try {
      $("#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div.menu-bar_menu-bar-item_264qQ > span:nth-child(2) > div")[0].text("改编中……")
    } catch (e) {
      console.log(e);
    }
    // $("#scratch").css("opacity", "0");
    // $("#loadinfo").html('正在改编中');
    post({
      url: 'work/new',
      p: 'newwork'
    }, function (d) {
      saveproject(
        d.info.insertId,
        function () {
          location.href = "/scratch#id=" + d.info.insertId;
          location.reload();
        }, open
      )
    })
  }

}
function dataURLToBlob(dataurl) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
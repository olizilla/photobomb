var userMediaStream
var video
var canvas
var w
var h

Template.camera.onCreated(function () {
  var tpl = this
  tpl.timer = new ReactiveVar(3)
  tpl.autorun(function () {
    var tag = Session.get('tag')
    Tags.find({_id: tag._id}).observeChanges({
      changed: function (id, fields) {
        if (fields.status === 'photobomb') {
          countdownAndUpload(tpl)
        }
      }
    })
  })
})

Template.camera.onRendered(function () {
  initCamera()
})

Template.camera.onDestroyed(function () {
  stopCamera()
})

Template.camera.helpers({
  tag: function () {
    return Tags.findOne(Session.get('tag')._id)
  },
  timer: function () {
    var tag = Tags.findOne(Session.get('tag')._id)
    if (tag.status === 'photobomb') {
      return Template.instance().timer.get()
    }
  }
})

Template.camera.events({
  'click .rec-button': function (evt) {
    Meteor.call('tags/photobomb', Session.get('tag')._id)
  }
})

function countdownAndUpload (tpl) {
  var interval = setInterval(function () {
    var current = tpl.timer.get()
    if (current === 0) {
      clearInterval(interval)
      uploadPhoto(function (err, result) {
        Session.set('page', 'review')
      })
    } else {
      tpl.timer.set(current - 1)
    }
  }, 500)
}

function uploadPhoto (cb) {
  var data = {
    tag: Session.get('tag'),
    image: takePhoto()
  }
  console.log('uploadPhoto', data)
  Meteor.call('photos/add', data, cb)
}

function takePhoto () {
  var context = canvas.getContext('2d')
  context.drawImage(
    video,
    canvas.width / 2 - video.videoWidth / 2,
    canvas.height / 2 - video.videoHeight / 2
  )
  return canvas.toDataURL("image/jpeg", 0.5)
}

function initCamera () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
  window.URL = window.URL || window.mozURL || window.webkitURL
    video = $('video')[0]
    canvas = $('canvas')[0]
  navigator.getUserMedia({'video': true, 'audio': false}, function (stream) {
    userMediaStream = stream
    video.src = window.opera ? stream : window.URL.createObjectURL(stream)
    video.play()
    setTimeout(function () {
      w = video.videoWidth
      h = video.videoHeight
      canvas.setAttribute('width', 480)
      canvas.setAttribute('height', 480)
    }, 1000)
  }, function(er) {
    console.error('Video capture error', er)
  })
}

function stopCamera () {
  if(video && video.pause) video.pause()
  if(video && video.mozSrcObject) video.mozSrcObject = null
  if(userMediaStream && userMediaStream.getTracks()) {
    userMediaStream.getTracks().map(function (t) {t.stop()})
  } else if (userMediaStream && userMediaStream.stop) userMediaStream.stop()
}

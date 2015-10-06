Session.setDefault('tag', 'test')

var video
var canvas
var w
var h

Template.camera.onRendered(function () {
  initCamera()
})

Template.camera.helpers({
  photos: function () {
    Photos.find({createdBy: 'userId'})
  }
})

Template.camera.events({
  'click button': function (evt) {
    var data = {
      tag: Session.get(tag),
      image: takePhoto()
    }
    Meteor.call('photos/add', data)
  }
});

// Pop.find({}).observeChanges({
//   added: function () {
//     var count = 0
//     var interval = setInterval(function () {
//       if (count === 3) return clearInterval(interval)
//       count++
//       var dataUrl = takePhoto()
//       $('<img/>').attr('src', dataUrl).appendTo('body')
//     }, 500)
//   }
// })

function takePhoto () {
  var context = canvas.getContext('2d')
  context.drawImage(video, 0, 0, w, h)
  return canvas.toDataURL("image/jpeg", 0.5)
}

function initCamera () {
  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
  window.URL = window.URL || window.mozURL || window.webkitURL
    video = $('video')[0]
    canvas = $('canvas')[0]
  navigator.getUserMedia({'video': true, 'audio': false}, function (stream) {
    video.src = window.opera ? stream : window.URL.createObjectURL(stream)
    video.play()
    setTimeout(function () {
      w = video.videoWidth
      h = video.videoHeight
      canvas.setAttribute('width', w)
      canvas.setAttribute('height', h)
    }, 1000)
  }, function(er) {
    console.error('Video capture error', er)
  })
}

Template.review.onCreated(function () {

})

Template.review.onRendered(function () {
  var tpl = this
  tpl.autorun(function () {
    if (!Session.get('tag')) return
    var tagId = Session.get('tag')._id
    tpl.subscribe('photosByTag', tagId, function () {
      // wait for images
    })
    tpl.photoObserver = Photos.find({'tag._id': tagId}).observe({
      added: function (doc) {
        if (Tracker.Computation.firstRun) return
        var count = Photos.find({'tag._id': tagId}).count()
        //FIX ME
        var tag = Tags.findOne(tagId)
        console.log('photos recieved', count)
        if (!tag || count === 0) return
        if (count === tag.users.length) {
          makeGif()
        }
      }
    })
  })
})

Template.review.onDestroyed(function () {
  tpl.photoObserver.stop()
})

Template.review.helpers({
  photos: function () {
    return Photos.find({})
  },
  photoCount: function () {
    return Photos.find({}).count()
  },
  tag: function () {
    return Tags.findOne(Session.get('tag')._id)
  }
})

Template.review.events({
  'click .button-again': function (evt) {
    evt.preventDefault()
    Session.set('page', 'tag')
  }
})

function makeGif () {
  console.log('GIFs start')
  var imgs = document.querySelectorAll('img');
  // change workerPath to point to where Animated_GIF.worker.js is
  var ag = new Animated_GIF({ workerPath: '/Animated_GIF.worker.js' })
  ag.setSize(480, 480)
  for(var i = 0; i < imgs.length; i++) {
    ag.addFrame(imgs[i])
  }
  var animatedImage = document.createElement('img')
  // This is asynchronous, rendered with WebWorkers
  ag.getBase64GIF(function(image) {
    animatedImage.src = image
    document.getElementById('gif').appendChild(animatedImage)
  })
}
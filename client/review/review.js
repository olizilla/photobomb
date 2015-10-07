Template.review.onCreated(function () {

})

Template.review.onRendered(function () {
  var tpl = this
  tpl.autorun(function () {
    var tag = Session.get('tag')
    if (!tag) return
    tpl.subscribe('photosByTag', tag._id, function () {
      console.log('GIFs start', Animated_GIF)
      var imgs = document.querySelectorAll('img');
      // change workerPath to point to where Animated_GIF.worker.js is
      var ag = new Animated_GIF({ workerPath: '/Animated_GIF.worker.js' })
      ag.setSize(320, 240)
      for(var i = 0; i < imgs.length; i++) {
        ag.addFrame(imgs[i])
      }
      var animatedImage = document.createElement('img')
      // This is asynchronous, rendered with WebWorkers
      ag.getBase64GIF(function(image) {
        animatedImage.src = image
        document.getElementById('gif').appendChild(animatedImage)
      })
    })
  })
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


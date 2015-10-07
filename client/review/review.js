Template.review.onCreated(function () {
  var tpl = this
  tpl.autorun(function () {
    var tag = Session.get('tag')
    if (!tag) return
    tpl.subscribe('photosByTag', tag._id)
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
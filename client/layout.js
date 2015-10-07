Session.setDefault('page', 'tag')

Template.registerHelper('session', function (key) {
  return Session.get(key)
})

Template.body.onRendered(function () {
  this.autorun(function () {
    var tag = Session.get('tag')
    if (!tag) return Session.set('page', 'tag')
    Meteor.subscribe('tagsById', tag._id, function () {
      Session.set('page', 'camera')
    })
  })
})

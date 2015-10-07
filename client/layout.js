Session.setDefault('page', 'login')

Template.registerHelper('session', function (key) {
  return Session.get(key)
})

Template.registerHelper('tag', function () {
  return Session.get('tag')
})

Template.body.onRendered(function () {
  this.autorun(function () {
    console.log('body onrendered', Meteor.userId())
    if(!Meteor.userId()) {
      Session.set('page', 'login')
    } else {
      Session.set('page', 'tag')
    }
  })
})

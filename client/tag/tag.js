Template.tag.events({
  'submit': function (evt, tpl) {
    evt.preventDefault()
    var name = tpl.find('#tag-name').value
    console.log('name', name)
    Meteor.call('tags/findOrCreate', name, function (err, tagId) {
      Session.set('tag', tagId)
      Meteor.subscribe('tagsByName', name, function () {
        Session.set('page', 'camera')
      })
    })
  }
})

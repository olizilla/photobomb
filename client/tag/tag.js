Template.tag.events({
  'submit': function (evt, tpl) {
    evt.preventDefault()
    var name = tpl.find('#tag-name').value
    Meteor.call('tags/findOrCreate', name, function (err, tagId) {
      console.log('tags/findOrCreate')
      Session.set('tag', { _id: tagId, name: name})
      Meteor.subscribe('tagsById', tagId, function () {
        Session.set('page', 'camera')
      })
    })
  }
})

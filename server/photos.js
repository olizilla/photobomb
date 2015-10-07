Meteor.publish('photosByTag', function (tagId) {
  check(tagId, String);
  return Photos.find({'tag._id': tagId})
})

Meteor.methods({
  'photos/add': function (data) {
    check(data, {
      tag: {
        _id: String,
        name: String,
      },
      image: String
    })
    data.createdAt = Date.now()
    data.createdBy = this.userId || 'anon'
    console.log('photos/add', data.tag.name, data.createdAt)
    return Photos.insert(data)
  }
})
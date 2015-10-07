Meteor.publish('tagsById', function (tagId) {
  check(tagId, String);
  return Tags.find({_id: tagId})
})

Meteor.methods({
  'tags/findOrCreate': function (name) {
    check(name, String)
    var existing = Tags.findOne({name: name, status: 'ready'})
    if (existing) {
      Tags.update(existing._id, { $push: {users: this.userId || 'anon'}})
      return existing._id
    } else {
      // create a new one if none exists
      return Tags.insert({
        name: name,
        status: 'ready',
        users: [this.userId || 'anon'],
        createdBy:this.userId || 'anon',
        createdAt: Date.now()
      })
    }
  },
  'tags/photobomb': function (tagId) {
    return Tags.update(tagId, { $set: { status: 'photobomb' }})
  }
})
Meteor.publish('photosByTag', function (tagId) {
  if (!this.userId) return []
  check(tagId, String);
  return Photos.find({'tag._id': tagId})
})

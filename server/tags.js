Meteor.publish('tagsByName', function (name) {
  if (!this.userId) return []
  check(name, String);
  return Tags.find({name: name, status:'ready'})
})

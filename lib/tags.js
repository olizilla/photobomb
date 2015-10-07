/*

**Tags** - a shared label for a group of users, about to phtotbomb.

```js
{
  id: 'abc'
  name: 'foo'
  status: 'ready' // 'working', 'done'
  users: ['userId']
  createdAt: timestamp
}
```
*/

Tags = new Mongo.Collection('tags')

Meteor.methods({
  'tags/findOrCreate': function (name) {
    if (!this.userId) throw new Meteor.Error('Please log in')
    check(name, String)
    var existing = Tags.findOne({name: name, status: 'ready'})
    if (existing) {
      Tags.update(existing._id, { $push: {users: this.userId}})
      return existing._id
    } else {
      // create a new one if none exists
      return Tags.insert({
        name: name,
        status: 'ready',
        users: [this.userId],
        createdBy:this.userId,
        createdAt: Date.now()
      })
    }
  }
})

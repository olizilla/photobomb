/*

**Photos** - A photo from a user

```js
{
  _id: 'xyz',
  tag: {
    _id: 'abc'
    name: 'foo'
  },
  image: '',
  createdAt: timestamp,
  createdBy: 'userId',
}
```
*/

Photos = new Mongo.Collection('photos')

Meteor.methods({
  'photos/add': function (data) {
    if (!this.userId) throw new Meteor.Error('Please log in')
    check(data, {
      tag: {
        _id: String,
        name: Date,
      },
      image: String
    })
    data.createdAt = Date.now()
    data.createdBy = this.userId
    return Photos.insert(data)
  }
})

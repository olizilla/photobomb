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



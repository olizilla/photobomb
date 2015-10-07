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




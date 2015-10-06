# PHOTOBOMB!

Take a photo from many cameras at once.


## Milestones

7pm - **v0.1** - minimum viable whizzbang
- Capture photos with webcam or phone cam
- First to press the button triggers photo on all cameras
- photos are stored in the DB
- played back on each screen

10pm **v0.2** - so social
- Sign in with twitter
- Pick a hashtag
- All in that hashtag are cameras

**v0.3** - go native
- [x] Sign up for dev account
- Package for play store


## Data

**Tags**

```js
{
  id: 'abc'
  name: 'foo'
  status: 'ready' // 'working', 'done'
  users: ['userId']
  createdAt: timestamp
}
```

**Photos**

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

- Player 1 creates a tag `foo`.
- Other players join that tag.
- Count of players in room.
- First to press the button triggers the photobomb
- Each player adds their photos
- Tag is marked as done when all photos are up, or timeout.
- Each user can see the photos as a slideshow.
- server gifs them!
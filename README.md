[![Netlify Status](https://api.netlify.com/api/v1/badges/6c0d024c-6ee2-4b5d-b942-74bf0b9d3e24/deploy-status)](https://app.netlify.com/sites/here-we-go/deploys)

# Here we go

I made this little structure of a game.. many moons ago. I just recently updated it
since my girls got really interested. This will probably not go anywhere.

[Try demo](https://here-we-go.netlify.app)

![Screenshot](http://f.cl.ly/items/083a2J3c0l3o3n0w1D29/Screen%20Shot%202013-03-17%20at%2010.47.46%20PM.png)

### Next up todo:
- Move player object into its own file
- Allow the player to distribute attribute points
- Find a way to centralize attribute calculations, possibly on the entity?
- re-render (at least lights) more often - now it's just happening when you move or
  an alien shows up

### Features to add soonish:
- Add a module library. Should probably be easy to drop in browserify or something.
- Save player position, time of day, experience points when you quit the tab
- Come up with game mechanics that make the game really unique and fun (jk)
- Come up with some sort of storyline?
- Make aliens move and attack the player and each other
- Allow the player to talk to cowboy guys and other people

### Content to add/change:
- maybe use something else than drawings for each of the characters?
- Add more houses
- And more types of people
- More types of enemies.. possibly red aliens etc

### Features to add one day, probably by somebody smarter than me:
- Make the lighting better, smarter - right now it's barely enough to make
  night time a bit more interesting.

### Installation:

```sh
yarn
```

run dev:
```sh
yarn dev
```

build into dist/ folder
```sh
yarn build
```

---

### License:

(Uses the MIT License)

Copyright (c) 2013 Arnor Heidar Sigurdsson <arnorhs@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the 'Software'), to
deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


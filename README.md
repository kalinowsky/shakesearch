# ShakeSearch

### [Netlify demo link](https://shakespearetask.netlify.app/])

### Before first launch

`yarn install`

### Run locally

`yarn dev`

### Run tests

`yarn test`

## Project description

### Features...

- Parameterised search results - it's usefull when user wants to send somebody specific search results or book page so query params are source of true for this app
- Fuzzy search by fuse.js - this but can be improved for sure but will handle with typo like "HAMLTE"
- Presenting results with lines before and after for giving context, marking exact match text and giving some additional data like book title and page number
- Book reading - user is able to open a book on a page with results
- Book selecting - we can spcify to look in specific books what decrease search time and will give better results
- Show more button for more than 20 results - it's not a perfect solution but helps to decrese a transfer
- Mobile support - it's only done to render properly and be fully usefull on all screen sizes - for better user experience portrait and tablet viewports could be handle better

### More technically....

- App is built with TypeScript and Next.js (mostly because it's ready to go setup of backend node app and react typescript frontend)
- Fully validated and typesafe data - thanks to typescript and validators app will handle any error without crash. App prefer and use type validation over type casting
- All logic is extracted from components to hooks so we have "dumb components" which focus mostly on presenting data
- Global state - I could use redux or react contex & useReducer but in fact one custom hook with proper state was enough for this app I believe
- Tests for most crucial business logic

### Things to improve in future

- Search could be more precise and faster (maybe it'd be better to save books in some locally db?)
- Related to above - right now search works for more than 3 characters as in the other case results are too random, I didn't want to spend more time on search configuration but I'd definitely do it in production app
- Pagination / infinite scroll for better loading results experience
- Better mobile support / maybe adding dark mode (it'd be quite easy to do as app use using styled components with theme provider)
- Book reading feature - would be cool if user can just open a specific book and start reading from the first page
- Adding maybe some E2E tests by cypress
- Create a real logo!

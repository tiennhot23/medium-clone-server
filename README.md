# medium-clone-server

__`Done`__

__`Not yet`__

- [Select only request fields from the database](https://medium0.com/khaledosman/graphql-performance-tip-database-projection-82795e434b44?source=friends_link&sk=6fa4bc0d8c3e98a7e871537eb5643367)
- Avoid N+1 problem use dataloader

__`Good to now`__

- [GraphQL voyager](https://ivangoncharov.github.io/graphql-voyager/)
- [Prevent circular query](https://www.apollographql.com/blog/graphql/security/securing-your-graphql-api-from-malicious-queries/)

## DataLoader

[An easy to understand explaination](https://www.youtube.com/watch?v=ld2_AS4l19g)

- A batch loading function accepts an Array of keys, and returns a Promise which resolves to an Array of values
- The function excutes when the loader call .load() and the result value is cached be default

```js
async function batchLoadFn(ids) {
  const users = await db.find(id: {$in: ids})
  return ids.map(id => users.getUserById(id) || 'none')
}
const userLoader = new DataLoader(batchLoadFn)
```

- By default DataLoader will group all invidual loads occurs within a single tick of the event loop an pass to load function

```js
const [user1, user] = await userLoader.loadMany([1, 2])
//or
const user1 = userLoader.load(1) // promise
const user2 = userLoader.load(2) // promise
// => load function will take [1, 2] (batchLoadFn([1, 2])) and call only 1 request to db
// ===

const user1 = await userLoader.load(1)
const user2 = await userLoader.load(2)
const user3 = await userLoader.load(1) // loader will get the value has been cached before, so no need to request to db
// => it isnt in the single tick so it load function executes 2 time and call 2 request to db to get user(1) and user(2) sequentially
```

- Array of values must be the same length as the Array of keys, after fetching values it will store each key corresponding to the value in the same index
- U should clear cache in some cases like loaded data is mutated or catch error when fetching, etc

> DataLoader is used as a per-request cache, so it use an Map as a memorization cache
> Or u can provide a custom Cache instance, as long as it follows the same API of Map

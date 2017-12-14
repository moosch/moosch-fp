# Functional Programming tools
Some tools to help write more functional code

## Tools

## Pipe
```
const split = str => str.split('.');
const pop = arr => arr.pop();
const lower = str => str.toLowerCase();

const fileExt = pipe(split, pop, lower)('https://myurl.tld/file.jpg');
//=> fileExt = 'jpg'
```

## Curry

## HotCurry
This is useful for passing in an additional param to a curried function
```
const ingredients = (...args) => {
	console.log('Ingredients: ', args.join(', '));
}
const make = hotCurry('chilli')(ingredients);

make('paprika','turmeric');
//=> Ingredients:  paprika, turmeric, chilli
```

### Match
```
match(state)
  .on(x => x === 'accept', () => acceptFunc())
  .on(x => x === 'reject', () => rejectFunc())
  .otherwise(() => throw Error('Oops'));
```

## License

MIT Licensed.
Use all you like at your own risky fun.

Written from ☄️ [@moosch](https://github.com/moosch)

const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
});

const match = x => ({
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
});

const pipe = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));

const curry = fn => (...args) => fn(...args);

const hotCurry = g => f => (...args) =>
  (typeof g === 'function' ? g(...args, f) : f(...args, g));

export {
  match,
  pipe,
  compose,
  curry,
  hotCurry,
}

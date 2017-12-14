const assert = require('chai').assert;
const sinon = require('sinon');
const fp = require('../dist');

const outputType = ext => {
  ext = ext.toLowerCase();
  return fp.match(ext)
    .on(x => ['jpg','jpeg','gif','png'].includes(x), () => 'Image')
    .on(x => ['psd','ai'].includes(x), () => 'Design')
    .on(x => ['doc','docx','txt'].includes(x), () => 'Text')
    .on(x => ['pdf'].includes(x), () => 'PDF')
    .otherwise(() => 'Unknown');
}

describe('Match', function() {
  const tests = [
    { arg: 'jpg', expected: 'Image' },
    { arg: 'PDF', expected: 'PDF' },
    { arg: 'doc', expected: 'Text' },
    { arg: 'abc', expected: 'Unknown' },
  ];
  tests.forEach(function(test) {
    it(`correctly identify file type of ${test.arg} as ${test.expected}`, () => {
      const res = outputType.call(null, test.arg);
      assert.equal(res, test.expected);
    });
  });
});

const greet = function(greeting) {
  return function(to) {
    return `${greeting}, ${to}`;
  };
};

describe('Curry', function() {
  it('should pass a variable through the chain of functions', function(){
    const greeting = greet('Hola');
    const curried = fp.curry(greeting);
    const expected = 'Hola, Carlos';
    const actual = curried('Carlos');

    assert.equal(actual, expected);
  });
});

const ingredients = (...args) => {
	return args;
}

describe('HotCurry', function() {
  it('should return an array containing the additional ingredient', function() {
    // Want to add 'chilli' to our curried function
    const addedIngredient = 'chilli';
    const ingredientsSpy = sinon.spy(ingredients);
    const make = fp.hotCurry(addedIngredient)(ingredientsSpy);

    const initialIngredients = ['paprika','turmeric'];
    const espectedIngredients = ['paprika','turmeric', 'chilli'];
    const allIngredients = make(...initialIngredients);

    assert.equal(allIngredients.length, espectedIngredients.length);
    assert.equal(allIngredients.pop(), addedIngredient);
    assert.equal(ingredientsSpy.calledOnce, true);
  });
});

function one(num) { return num+1; }
function two(num) { return num*2; }
function three(num) { return num-1; }

describe('Compose', function() {
  it('should call both functions in ordered right to left', function(){
    const oneSpy = sinon.spy(one);
    const twoSpy = sinon.spy(two);
    fp.compose(oneSpy, twoSpy)();

    assert.equal(twoSpy.calledBefore(oneSpy), true);
    assert.equal(oneSpy.calledAfter(twoSpy), true);
  });

});

describe('Pipe', function() {
  it('should call both functions in ordered left to right', function(){
    const oneSpy = sinon.spy(one);
    const twoSpy = sinon.spy(two);
    fp.pipe(oneSpy, twoSpy)();

    assert.equal(twoSpy.calledAfter(oneSpy), true);
    assert.equal(oneSpy.calledBefore(twoSpy), true);
  });
});

describe('Compose & Pipe', function() {
  it('should pass a variable through the chain of functions', function(){
    const oneSpy = sinon.spy(one);
    const twoSpy = sinon.spy(two);
    const threeSpy = sinon.spy(three);
    const compose = {
      expected: 1, // ( ( 1 - 1 ) * 2 ) + 1
      actual: fp.compose(oneSpy, twoSpy, threeSpy)(1),
    };
    const pipe = {
      expected: 3, // ( ( 1 + 1 ) * 2 ) - 1
      actual: fp.pipe(oneSpy, twoSpy, threeSpy)(1),
    };
  
    assert.equal(compose.actual, compose.expected);
    assert.equal(pipe.actual, pipe.expected);
  });
});

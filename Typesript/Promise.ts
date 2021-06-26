// Firstly, to use promises, you must return a new promise object.
// Secondly, a promise object is constructed with a function that takes two callback arguments.
// Make sure ES6 versoin configured in tsconfig file "target": "es6"

function delayedPromise(): Promise<void> {
  return new Promise<void>((resolve: () => void, reject: () => void) => {
    function afterTimeout() {
      resolve();
    }
    setTimeout(afterTimeout, 2000);
  });
}

console.log(`Calling promise...`);
delayedPromise().then(() => {
  console.log(`After promise success.`);
});

function delayedPromiseWithParam(): Promise<string> {
  return new Promise<string>(
    (resolve: (str: string) => void, reject: (str: string) => void) => {
      function afterWait() {
        resolve("resolved_within_promise");
      }
      setTimeout(afterWait, 2000);
    }
  );
}

function callPromiseWithParam() {
  console.log(`calling delayedPromiseWithParam`);
  delayedPromiseWithParam().then((message: string) => {
    console.log(`Promise.then() returned ${message} `);
  });
}
callPromiseWithParam();

function awaitDelayed(): Promise<void> {
  return new Promise<void>((resolve: () => void, reject: () => void) => {
    function afterWait() {
      console.log(`calling resolve`);
      resolve();
    }
    setTimeout(afterWait, 1000);
  });
}
async function callAwaitDelayed() {
  console.log(`call awaitDelayed`);
  await awaitDelayed();
  console.log(`after awaitDelayed`);
}
callAwaitDelayed();

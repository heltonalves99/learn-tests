// const fetch = require('node-fetch');
// const fetch = require('isomorphic-fetch');
// const fetch = require('isomorphic-fetch')
require('isomorphic-fetch');

// 1 - The dirty Queue
console.log('1 - The dirty Queue');

class Queue {
  private data: any = [];

  push(item: any) {
    this.data.push(item);
  }

  pop() {
    return this.data.shift();
  }

  get() {
    return this.data;
  }
}

let myQueue = new Queue();
myQueue.push('helton');
console.log(myQueue.get());
myQueue.push('alves');
console.log(myQueue.get());
myQueue.push(123123);
console.log(myQueue.get());

myQueue.pop();
console.log(myQueue.get());

console.log('-------------------------------------------------------------');


// 2 - The Queue to numbers type
console.log('2 - The Queue to numbers type');

class QueueNumber extends Queue {
  push(item: number) {
    super.push(item);
  }
}

let myQueueNumber = new QueueNumber();
myQueueNumber.push(1);
console.log(myQueueNumber.get());
myQueueNumber.push(2);
console.log(myQueueNumber.get());
myQueueNumber.push(3);
console.log(myQueueNumber.get());

myQueueNumber.pop();
console.log(myQueueNumber.get());

// myQueueNumber.push('helton'); // Error here because it accept only numbers

console.log('-------------------------------------------------------------');


// 3 - The Queue with Generics params
console.log('3 - The Queue with Generics params');

class QueueGeneric<T> {
  private data: T[] = [];

  push(item: T) {
    this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.shift();
  }

  get(): T[] {
    return this.data;
  }
}

let myQueueGeneric = new QueueGeneric<string>();
myQueueGeneric.push('Helton');
console.log(myQueueGeneric.get());
myQueueGeneric.push('Alves');
console.log(myQueueGeneric.get());
myQueueGeneric.push('Chaves');
console.log(myQueueGeneric.get());

myQueueGeneric.pop();
console.log(myQueueGeneric.get());

// myQueueGeneric.push(123); // Error here because it accept only strings


// 4 - Loads a json response
console.log('4 - Loads a json response');


interface User {
  'userId': number,
  'id': number,
  'title': string,
  'completed': boolean,
}

interface MyHeaders {
  [key: string]: string
}

interface MyConfig {
  url: string,
  headers?: MyHeaders,
}

const getJson = <T>(config: MyConfig): Promise<T> => {
  const fetchConfig = ({
    method: 'GET',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(config.headers || {})
  });

  return fetch(config.url, fetchConfig).then<T>(response => response.json());
};

const url: string = 'https://jsonplaceholder.typicode.com/todos';
getJson<User[]>({ url }).then((resp: User[]) => {
  console.log(resp);
});
import { examples } from '../src/main';

// global.fetch = require('node-fetch');
global.fetch = jest.fn().mockImplementation(() => {
  return new Promise((resolve, reject) => {
    resolve({
      ok: true, 
      Id: '123', 
      json: () => { 
        return { text: 'hello world' };
      }
    });
  });
});

describe('first set', () => {
  // beforeEach(() => {
  //   console.log('antes de cada.');
  // })

  // afterEach(() => {
  //   console.log('depois de cada.');
  // })

  test('should convert str to uppercase.', () => {
    return examples.upperCase('test').then(str => {
      expect(str).toBe('TEST');
    });
  });

  test('should throw error message when attr is empty.', () => {
    return examples.upperCase('').catch(err => {
      expect(err).toMatch('Treta aqui!');
    });
  });

  test('should convert str to uppercase. Async - Await', async () => {
    const str = await examples.upperCase('TEST');
    expect(str).toMatch('TEST');
  });

  test('should throw error message when attr is empty. Async - Await', async () => {
    try {
      await examples.upperCase('');
    } catch(err) {
      expect(err).toMatch('Treta aqui!');
    }
  });

  test('should return hello World message with user name.', async () => {
    const result = await examples.helloWorldMocky('Helton');
    expect(result).toBe('Hi Helton: hello world');
  })

  test('should return hello world message without user name', async () => {
    const result = await examples.helloWorldMocky();
    expect(result).toBe('hello world');
  });

  test('should be call with specific parameter', async () => {
    const examplesSpy = jest.spyOn(examples, 'helloWorldMocky');
    
    const name = 'helton alves';
    const result = await examples.helloWorldMocky(name);

    expect(examplesSpy).toHaveBeenCalled();
    expect(examplesSpy).toHaveBeenCalledWith(name);
  });
});

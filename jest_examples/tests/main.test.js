import { upperCase } from '../src/main';

describe('first set', () => {
  // beforeEach(() => {
  //   console.log('antes de cada.');
  // })

  // afterEach(() => {
  //   console.log('depois de cada.');
  // })

  test('Adding 1 + 1 equals 2', () => {
    // expect(sum(1, 1)).toBe(2)
    expect(1 + 1).toBe(2);
  });

  test('Adding 1 + 1 is not 3', () => {
    // expect(sum(1, 1)).toBe(2)
    expect(1 + 1).not.toBe(3);
  });

  test('should convert str to uppercase.', () => {
    return upperCase('test').then(str => {
      expect(str).toBe('TEST');
    });
  });

  test('should throw error message when attr is empty.', () => {
    return upperCase('').catch(err => {
      expect(err).toMatch('Treta aqui!');
    });
  });

  test('should convert str to uppercase. Async - Await', async () => {
    const str = await upperCase('TEST');
    expect(str).toMatch('TEST');
  });

  test('should throw error message when attr is empty. Async - Await', async () => {
    try {
      await upperCase('');
    } catch(err) {
      expect(err).toMatch('Treta aqui!');
    }
  })
});

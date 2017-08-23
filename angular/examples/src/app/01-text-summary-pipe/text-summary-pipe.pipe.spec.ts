import { TextSummaryPipePipe } from './text-summary-pipe.pipe';

describe('TextSummaryPipePipe', () => {
  let pipe: TextSummaryPipePipe;

  beforeEach(() => {
    pipe = new TextSummaryPipePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return string empty if input is null, undefined or a empty string', () => {
    expect (pipe.transform(null)).toEqual('');
    expect (pipe.transform(undefined)).toEqual('');
    expect (pipe.transform('')).toEqual('');
  })

  it('should finish with suspension points the value returned', () => {
    expect (pipe.transform('12345678901234')).toContain('...');
  })

  it('should return the same string if its length is less than 10', () => {
    expect (pipe.transform('123')).toEqual('123');
  })

  it('should assume the length of limit', () => {
    expect (pipe.transform('12345678901234', 5)).toEqual('12345...');
  })

  it('should assume 10 as the limit if not given', () => {
    expect (pipe.transform('12345678901234')).toEqual('1234567890...');
  })
});

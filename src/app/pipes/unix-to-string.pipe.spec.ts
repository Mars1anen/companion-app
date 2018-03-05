import { UnixToStringPipe } from './unix-to-string.pipe';

describe('UnixToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new UnixToStringPipe();
    expect(pipe).toBeTruthy();
  });
});

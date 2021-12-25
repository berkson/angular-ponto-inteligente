import { DataBrPipe } from './data-br.pipe';

describe('DataBrPipe', () => {
  it('create an instance', () => {
    const pipe = new DataBrPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve converter a data e hora formato inglês para brasileiro', () => {
    const pipe = new DataBrPipe();
    expect(pipe.transform('2021-12-16 22:34')).toEqual('16/12/2021 22:34');
  });
});

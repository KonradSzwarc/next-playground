import { getSeconds } from './get-seconds';

describe('getSeconds', () => {
  it('gets seconds for provided time unit', () => {
    expect(getSeconds('1s')).toBe(1);
    expect(getSeconds('1m')).toBe(60);
    expect(getSeconds('1h')).toBe(3600);
    expect(getSeconds('3h')).toBe(10_800);
    expect(getSeconds('1d')).toBe(86_400);
    expect(getSeconds('1w')).toBe(604_800);
    expect(getSeconds('1y')).toBe(31_557_600);
  });
});

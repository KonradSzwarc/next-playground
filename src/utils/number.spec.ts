import { toSeconds } from './number';

describe('number', () => {
  describe('toSeconds', () => {
    it('gets seconds for provided time unit', () => {
      expect(toSeconds('1s')).toBe(1);
      expect(toSeconds('1m')).toBe(60);
      expect(toSeconds('1h')).toBe(3600);
      expect(toSeconds('3h')).toBe(10_800);
      expect(toSeconds('1d')).toBe(86_400);
      expect(toSeconds('1w')).toBe(604_800);
      expect(toSeconds('1y')).toBe(31_557_600);
    });
  });
});

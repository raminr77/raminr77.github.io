import { animator } from './animator';

describe('animator', () => {
  it('returns base animated classes for a name', () => {
    const result = animator({ name: 'fadeIn' });
    expect(result).toContain('animate__animated');
    expect(result).toContain('animate__fadeIn');
  });

  it('includes speed class when provided', () => {
    const result = animator({ name: 'fadeIn', speed: 'fast' });
    expect(result).toContain('animate__fast');
  });

  it('includes repeat class when provided', () => {
    const result = animator({ name: 'bounce', repeat: 2 });
    expect(result).toContain('animate__repeat-2');
  });

  it('includes delay class when provided', () => {
    const result = animator({ name: 'fadeIn', delay: '1s' });
    expect(result).toContain('animate__delay-1s');
  });

  it('combines multiple options correctly', () => {
    const result = animator({
      name: 'slideInUp',
      speed: 'slower',
      repeat: 'infinite',
      delay: '2s'
    });
    expect(result).toContain('animate__animated');
    expect(result).toContain('animate__slideInUp');
    expect(result).toContain('animate__slower');
    expect(result).toContain('animate__repeat-infinite');
    expect(result).toContain('animate__delay-2s');
  });

  it('omits speed class when not provided', () => {
    const result = animator({ name: 'fadeIn' });
    expect(result).not.toMatch(/animate__slow|animate__fast/);
  });

  it('omits repeat class when not provided', () => {
    const result = animator({ name: 'fadeIn' });
    expect(result).not.toContain('animate__repeat');
  });

  it('omits delay class when not provided', () => {
    const result = animator({ name: 'fadeIn' });
    expect(result).not.toContain('animate__delay');
  });

  it('returns classes as a single space-separated string', () => {
    const result = animator({ name: 'fadeIn' });
    expect(result.split(' ').every(Boolean)).toBe(true);
  });
});

const runDetekt = require('../runDetekt.js');

describe('runDetekt', () => {
  test('should return true', () => {
    expect(runDetekt.runDetekt()).toBe(true);
  })
})
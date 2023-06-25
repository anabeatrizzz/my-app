describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: {
        location: 'always'
      }
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});

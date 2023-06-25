import { element, by, expect } from 'detox';
import openApp from './openApp';

describe('Example', () => {
  beforeEach(async () => {
    await openApp()
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });
});

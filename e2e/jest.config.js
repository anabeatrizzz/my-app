/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.ts'],
  testTimeout: 300000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    'detox/runners/jest/reporter',
    [
      'jest-html-reporters', {
        "publicPath": "./e2e",
        "filename": "report.html",
        "inlineSource": true
      }
    ]
  ],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  detectOpenHandles: true,
  forceExit: true
};

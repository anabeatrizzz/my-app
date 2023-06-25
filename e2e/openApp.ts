/* eslint-disable no-shadow */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-return-await */
import { device } from 'detox';
import { resolveConfig } from "detox/internals"
import appConfig from "../app.json"

const platform = device.getPlatform();
const SLEEP_MS = 15000;
const permissions: Detox.DevicePermissions = {
  location: 'never'
}

export default async function openApp() {
  const config = await resolveConfig();
  // @ts-ignore
  if (config.configurationName.split('.')[1] === 'debug') {
    return await openAppForDebugBuild(platform);
  }
  return await device.launchApp({
    newInstance: true,
    permissions
  });
}

async function openAppForDebugBuild(platform: 'ios' | 'android') {
  // const deepLinkUrl = getDeepLinkUrl(getDevLauncherPackagerUrl(platform));
  const deepLinkUrl = process.env.EXPO_USE_UPDATES
    ? // Testing latest published EAS update for the test_debug channel
      getDeepLinkUrl(getLatestUpdateUrl())
    : // Local testing with packager
      getDeepLinkUrl(getDevLauncherPackagerUrl(platform));

  if (platform === 'ios') {
    await device.launchApp({
      newInstance: true,
      permissions
    });
    sleep(SLEEP_MS);
    await device.openURL({
      url: deepLinkUrl
    });
  } else {
    await device.launchApp({
      newInstance: true,
      url: deepLinkUrl,
      permissions
    });
  }
  await sleep(SLEEP_MS);
}

const getDeepLinkUrl = (url: string) => `exp+my-app://expo-development-client/?url=${encodeURIComponent(url)}`;

const getDevLauncherPackagerUrl = (platform: 'ios' | 'android') =>
  `http://localhost:8081/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;

const getLatestUpdateUrl = () =>
  `https://u.expo.dev/${getAppId()}?channel-name=test_debug&disableOnboarding=1`;

const getAppId = () => appConfig?.expo?.extra?.eas?.projectId ?? '';

const sleep = (t: number) => new Promise((res) => setTimeout(res, t));

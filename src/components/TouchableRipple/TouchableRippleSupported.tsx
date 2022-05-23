import { Platform } from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;

export default {
  supported:
    Platform.OS === 'web' ||
    (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP),
};

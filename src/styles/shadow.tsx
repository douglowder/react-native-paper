import * as Colors from './colors';
import { Animated } from 'react-native';

const SHADOW_COLOR = Colors.black;
const SHADOW_OPACITY = 0.24;

export default function shadow(elevation: number | Animated.Value = 0) {
  if (elevation instanceof Animated.Value) {
    const inputRange = [0, 1, 2, 3, 8, 24];

    return {
      shadowColor: SHADOW_COLOR,
      shadowOpacity: elevation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, SHADOW_OPACITY],
        extrapolate: 'clamp',
      }),
      shadowRadius: elevation.interpolate({
        inputRange,
        outputRange: [0, 0.75, 1.5, 3, 8, 24],
      }),
    };
  } else {
    if (elevation === 0) {
      return {};
    }

    let radius;
    switch (elevation) {
      case 1:
        radius = 0.75;
        break;
      case 2:
        radius = 1.5;
        break;
      default:
        radius = elevation;
    }

    return {
      shadowColor: SHADOW_COLOR,
      shadowOpacity: SHADOW_OPACITY,
      shadowRadius: radius,
    };
  }
}

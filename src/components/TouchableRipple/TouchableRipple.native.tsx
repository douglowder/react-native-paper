import * as React from 'react';
import {
  BackgroundPropType,
  StyleProp,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import color from 'color';
import { withTheme } from '../../core/theming';
import TouchableRippleSupported from './TouchableRippleSupported';
import 'react-native/tvos-types.d';

const ANDROID_VERSION_PIE = 28;

type Props = React.ComponentProps<typeof TouchableWithoutFeedback> & {
  borderless?: boolean;
  background?: BackgroundPropType;
  disabled?: boolean;
  onPress?: () => void | null;
  rippleColor?: string;
  underlayColor?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme: ReactNativePaper.Theme;
  tvParallaxProperties?: any;
  onFocus?: any;
  onBlur?: any;
  nextFocusUp?: any;
  nextFocusDown?: any;
  nextFocusLeft?: any;
  nextFocusRight?: any;
};

const TouchableRipple = React.forwardRef(
  (
    {
      style,
      background,
      borderless = false,
      disabled: disabledProp,
      rippleColor,
      underlayColor,
      children,
      theme,
      ...rest
    }: Props,
    ref: any
  ) => {
    const { dark, colors } = theme;
    const disabled = disabledProp || !rest.onPress;
    const calculatedRippleColor =
      rippleColor ||
      color(colors.text)
        .alpha(dark ? 0.32 : 0.2)
        .rgb()
        .string();

    // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
    // https://github.com/facebook/react-native/issues/6480
    const useForeground =
      Platform.OS === 'android' &&
      Platform.Version >= ANDROID_VERSION_PIE &&
      borderless;

    if (TouchableRippleSupported.supported) {
      return (
        <TouchableNativeFeedback
          {...rest}
          ref={ref}
          disabled={disabled}
          useForeground={useForeground}
          background={
            background != null
              ? background
              : TouchableNativeFeedback.Ripple(
                  calculatedRippleColor,
                  borderless
                )
          }
        >
          <View style={[borderless && styles.overflowHidden, style]}>
            {React.Children.only(children)}
          </View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableHighlight
        {...rest}
        ref={ref}
        disabled={disabled}
        style={[borderless && styles.overflowHidden, style]}
        underlayColor={
          underlayColor != null
            ? underlayColor
            : color(calculatedRippleColor).fade(0.5).rgb().string()
        }
      >
        {React.Children.only(children)}
      </TouchableHighlight>
    );
  }
);

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
});

export default withTheme(TouchableRipple);

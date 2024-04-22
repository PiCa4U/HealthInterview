import {SkImage} from '@shopify/react-native-skia';
import {RefObject} from 'react';
import {View} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

export type ScreenSchemeName = 'screen1' | 'screen2';

export interface ScreenScheme {
  active: boolean;
  screenScheme: ScreenSchemeName;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
}

export interface ScreenSchemeContextI extends ScreenScheme {
  ref: RefObject<View>;
  transition: SharedValue<number>;
  circle: SharedValue<{x: number; y: number; r: number}>;
  dispatch: (scheme: ScreenScheme) => void;
}

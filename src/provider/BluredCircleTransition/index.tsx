import {ScreenScheme, ScreenSchemeContextI} from './types.ts';
import {createContext, ReactNode, useReducer, useRef} from 'react';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {
  Canvas,
  mix,
  Image,
  Circle,
  ImageShader,
  BlurMask,
} from '@shopify/react-native-skia';
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';

const defaultValue: ScreenScheme = {
  active: false,
  screenScheme: 'screen1',
  overlay1: null,
  overlay2: null,
};

export const ScreenSchemeContext = createContext<ScreenSchemeContextI | null>(
  null,
);
const screenSchemeReducer = (_: ScreenScheme, screenScheme: ScreenScheme) => {
  return screenScheme;
};

interface ScreenSchemeProviderProps {
  children: ReactNode;
}

const {width, height} = Dimensions.get('screen');

export const ScreenSchemeProvider = ({children}: ScreenSchemeProviderProps) => {
  const circle = useSharedValue({x: 0, y: 0, r: 0});
  const transition = useSharedValue(0);
  const ref = useRef(null);
  const windowWidth = useSharedValue(width);
  const windowHeight = useSharedValue(height);

  const [{screenScheme, overlay1, overlay2, active}, dispatch] = useReducer(
    screenSchemeReducer,
    defaultValue,
  );
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    windowWidth.value = width;
    windowHeight.value = height;
  };

  return (
    <View style={{flex: 1}}>
      <View ref={ref} onLayout={onLayout} style={{flex: 1}} collapsable={false}>
        <ScreenSchemeContext.Provider
          value={{
            active,
            screenScheme,
            overlay1,
            overlay2,
            dispatch,
            ref,
            transition,
            circle,
          }}>
          {children}
        </ScreenSchemeContext.Provider>
      </View>
      <View style={StyleSheet.absoluteFill} pointerEvents={'none'}>
        <Canvas style={{flex: 1}} pointerEvents={'none'}>
          <Image
            image={overlay1}
            x={0}
            y={0}
            width={windowWidth}
            height={windowHeight}
          />
          {overlay2 && (
            <Circle c={circle} r={r}>
              <BlurMask blur={10} style={'normal'} />
              <ImageShader
                image={overlay2}
                x={0}
                y={0}
                width={windowWidth}
                height={windowHeight}
                fit="cover"
              />
            </Circle>
          )}
        </Canvas>
      </View>
    </View>
  );
};

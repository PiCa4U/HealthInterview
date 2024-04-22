import {dist, makeImageFromView, vec} from '@shopify/react-native-skia';
import {useCallback, useContext} from 'react';
import {ScreenSchemeContext} from './index.tsx';
import {wait} from './utills.ts';
import {withTiming} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

export const useColorScheme = () => {
  const ctx = useContext(ScreenSchemeContext);
  if (ctx === null) {
    throw new Error('No ColorScheme context context found');
  }
  const {screenScheme, dispatch, ref, transition, circle, active} = ctx;
  const toggle = useCallback(
    async (x: number, y: number) => {
      const newColorScheme = screenScheme === 'screen1' ? 'screen1' : 'screen2';

      dispatch({
        active: true,
        screenScheme,
        overlay1: null,
        overlay2: null,
      });
      // 0. Define the circle and its maximum radius
      const r = Math.max(...corners.map(corner => dist(corner, {x, y})));
      circle.value = {x, y, r};

      // 1. Take the screenshot
      const overlay1 = await makeImageFromView(ref);
      // 2. display it
      dispatch({
        active: true,
        screenScheme,
        overlay1,
        overlay2: null,
      });
      // 3. switch to another screen
      await wait(16);
      dispatch({
        active: true,
        screenScheme: newColorScheme,
        overlay1,
        overlay2: null,
      });
      // 4. wait for the another screen to render
      await wait(16);
      // 5. take screenshot
      const overlay2 = await makeImageFromView(ref);
      dispatch({
        active: true,
        screenScheme: newColorScheme,
        overlay1,
        overlay2,
      });
      // 6. transition
      transition.value = 0;
      transition.value = withTiming(1, {duration: 650});
      await wait(650);
      dispatch({
        active: false,
        screenScheme: newColorScheme,
        overlay1: null,
        overlay2: null,
      });
    },
    [circle, screenScheme, dispatch, ref, transition],
  );
  return {screenScheme, toggle, active};
};

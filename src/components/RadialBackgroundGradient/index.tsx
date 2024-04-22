import React, {memo, useEffect} from 'react';
import {Canvas, Fill, SweepGradient, vec} from '@shopify/react-native-skia';
import {StyleSheet} from 'react-native';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const duration = 3000;

const easing = Easing.in(Easing.linear);

type props = {
  isActive?: boolean;
};

export const RadialBackgroundGradient = memo<props>(({isActive = true}) => {
  const size = useSharedValue({width: 0, height: 0});
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }
    progress.value = withRepeat(withTiming(1, {duration, easing}), -1, false);
  }, [isActive]);

  const center = useDerivedValue(() => {
    return vec(size.value.width / 2, size.value.height * 2);
  }, [size.value]);
  const rotate = useDerivedValue(() => {
    // Преобразование прогресса в градусы
    const degrees = -progress.value * 360;

    // Преобразование градусов в радианы
    return (degrees * Math.PI) / 180;
  });

  const transform = useDerivedValue(() => [{rotate: rotate.value}], [rotate]);

  return (
    <Canvas onSize={size} style={StyleSheet.absoluteFill}>
      <Fill>
        <SweepGradient
          c={center}
          origin={center}
          transform={transform}
          colors={['#1ba8ff', '#c0c060', '#d78cb5', '#1ba8ff']}
        />
      </Fill>
    </Canvas>
  );
});

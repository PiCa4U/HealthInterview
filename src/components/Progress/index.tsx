import React, {FC} from 'react';
import {View} from 'react-native';
import {Button} from '../Button';
import {ProgressIndicator} from './components';
import {styles} from './styles.ts';
import Animated, {FadeOut} from 'react-native-reanimated';

type ProgressProps = {
  total: number;
  count: number;
  onUp: () => void;
  onDown: () => void;
};

export const Progress: FC<ProgressProps> = ({total, count, onDown, onUp}) => {
  return (
    <View style={styles.container}>
      <ProgressIndicator count={count} total={total} />
      <View style={styles.footer}>
        {count !== total && (
          <Animated.View exiting={FadeOut}>
            <Button style={styles.btn} text={'+'} onPress={onUp} />
          </Animated.View>
        )}
        <Button style={styles.btn} text={'-'} onPress={onDown} />
      </View>
    </View>
  );
};

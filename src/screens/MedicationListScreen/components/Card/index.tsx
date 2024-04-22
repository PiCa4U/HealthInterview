import React, {FC, memo, useCallback} from 'react';
import {styles} from './styles.ts';
import {AppText} from '../../../../components';
import {Medication} from '../../../../types';
import {Swipeable} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {TouchableOpacity, View} from 'react-native';
import {Progress} from '../../../../components/Progress';

type CardProps = Omit<Medication, 'updatedDate' | 'id'> & {
  onPress: () => void;
  onDelete: () => void;
  onUpdateCount: (count: number) => void;
};

export const Card: FC<CardProps> = memo(
  ({
    count,
    onUpdateCount,
    destinationCount,
    onPress,
    description,
    onDelete,
    name,
  }) => {
    const renderLeftActions = () => {
      return (
        <TouchableOpacity style={styles.leftAction} onPress={onDelete}>
          <Animated.Text style={[styles.actionText]}>Delete</Animated.Text>
        </TouchableOpacity>
      );
    };

    const onUp = useCallback(() => {
      if (count + 1 > destinationCount) {
        return;
      }
      onUpdateCount(count + 1);
    }, [count, destinationCount, onUpdateCount]);

    const onDown = useCallback(() => {
      if (count - 1 < 0) {
        return;
      }
      onUpdateCount(count - 1);
    }, [count, onUpdateCount]);

    return (
      <Swipeable renderRightActions={renderLeftActions}>
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={styles.content}>
            <AppText text={name} style={styles.title} />
            <AppText text={description} style={styles.subTitle} />
          </View>
          <Progress
            total={destinationCount}
            count={count}
            onDown={onDown}
            onUp={onUp}
          />
        </TouchableOpacity>
      </Swipeable>
    );
  },
);

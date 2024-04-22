import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import {MedicationListProps} from '../../navigation/StackNavigator/types.ts';
import {useColorScheme} from '../../provider/BluredCircleTransition/useScreenScheme.ts';
import {Card} from './components';
import {styles} from './styles.ts';
import {Button} from '../../components/Button';
import {RadialBackgroundGradient} from '../../components/RadialBackgroundGradient';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  LinearTransition,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {AppText} from '../../components';
import {Colors} from '../../constants/colors.ts';
import {SkiaSvg} from '../../components/SkiaSvg';
import {useAnimHeaderStyle} from '../../hooks/useAnimHeaderStyle.ts';
import {
  useCountUpdateMedication,
  useMedications,
  useRemoveMedication,
} from '../../hooks';

export const MedicationListScreen: FC<MedicationListProps> = ({navigation}) => {
  const onCountUpdate = useCountUpdateMedication();
  const onItemDelete = useRemoveMedication();
  const [aRef, animatedStyle] = useAnimHeaderStyle();
  const medications = useMedications();
  const tapCoords = useSharedValue({x: 0, y: 0});
  const {toggle} = useColorScheme();

  const onPressHandler = useCallback(() => {
    toggle(tapCoords.value.x, tapCoords.value.y);
    navigation.navigate('Add Medication');
  }, [navigation, toggle]);

  const onItemPressHandler = useCallback(
    (id: number) => {
      toggle(tapCoords.value.x, tapCoords.value.y);
      navigation.navigate('Details', {id});
    },
    [navigation],
  );

  const tap = Gesture.Tap().onStart(event => {
    tapCoords.value = {x: event.x, y: event.y};
  });

  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
        <Animated.ScrollView ref={aRef} contentContainerStyle={styles.list}>
          <Animated.View style={[styles.header, animatedStyle]}>
            <RadialBackgroundGradient />
          </Animated.View>

          {medications.length > 0 ? (
            medications.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInLeft}
                exiting={FadeOutRight}
                layout={LinearTransition}>
                <Card
                  destinationCount={item.destinationCount}
                  name={item.name}
                  description={item.description}
                  count={item.count}
                  onDelete={() => onItemDelete(index)}
                  onUpdateCount={value => onCountUpdate(index, value)}
                  onPress={() => onItemPressHandler(item.id)}
                />
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyList}>
              <SkiaSvg />
              <AppText text={'List is empty'} style={{color: Colors.WHITE}} />
            </View>
          )}
        </Animated.ScrollView>
        <Button text={'Add'} style={styles.fubBtn} onPress={onPressHandler} />
      </View>
    </GestureDetector>
  );
};

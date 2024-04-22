import React, {FC, useCallback, useMemo} from 'react';
import {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import {RadialBackgroundGradient} from '../../components/RadialBackgroundGradient';
import {styles} from './styles.ts';
import Animated from 'react-native-reanimated';
import {MedicationDetailsProps} from '../../navigation/StackNavigator/types.ts';
import {storage} from '../../storage';
import {Card} from './components';
import {useMMKVObject} from 'react-native-mmkv';
import {Input} from '../../components/formElements';
import {Note} from './components/Note';
import {AppKeyboardAvoidView} from '../../components/AppKeyboardAvoidView';
import {useColorScheme} from '../../provider/BluredCircleTransition/useScreenScheme.ts';
import {useAnimHeaderStyle} from '../../hooks/useAnimHeaderStyle.ts';
import {useMedications, useRemoveMedication} from '../../hooks';

export const MedicationDetailsScreen: FC<MedicationDetailsProps> = ({
  route,
  navigation,
}) => {
  const id = route.params.id;
  const onRemove = useRemoveMedication();
  const {active} = useColorScheme();
  const [aRef, animatedStyle] = useAnimHeaderStyle();

  const medications = useMedications();
  const [notes = [], setNotes] = useMMKVObject<string[]>(
    'medicationNotes' + id,
    storage,
  );

  const item = useMemo(() => {
    return medications.find(medication => medication.id === id)!;
  }, [id, medications]);

  const onItemDelete = useCallback(() => {
    const index = medications.findIndex(item => item.id === id)!;

    onRemove(index);
    navigation.goBack();
  }, [id, medications, navigation, onRemove]);

  const onAddNote = useCallback(
    (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      setNotes([...notes, event.nativeEvent.text]);
    },
    [notes, setNotes],
  );

  return (
    <AppKeyboardAvoidView>
      <Animated.FlatList
        ref={aRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={16}
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={
          <View>
            <Animated.View style={[styles.headerContainer, animatedStyle]}>
              <RadialBackgroundGradient isActive={!active} />
            </Animated.View>
            {item && (
              <Card
                id={item.id}
                name={item.name}
                onItemDelete={onItemDelete}
                description={item.description}
                count={item.count}
                destinationCount={item.destinationCount}
              />
            )}
          </View>
        }
        data={notes}
        renderItem={({item}) => <Note title={item} />}
        ListFooterComponentStyle={styles.footer}
        ListFooterComponent={
          <Input title={'type here your note'} onSubmitEditing={onAddNote} />
        }
      />
    </AppKeyboardAvoidView>
  );
};

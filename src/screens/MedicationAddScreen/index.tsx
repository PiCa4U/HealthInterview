import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import {
  AddMedicationForm,
  AddMedicationFormProps,
} from '../../components/forms/AddMedicationrForm';
import {MedicationAddMedicationProps} from '../../navigation/StackNavigator/types.ts';
import {storage} from '../../storage';
import {Medication} from '../../types';
import {RadialBackgroundGradient} from '../../components/RadialBackgroundGradient';
import {useColorScheme} from '../../provider/BluredCircleTransition/useScreenScheme.ts';
import {AppKeyboardAvoidView} from '../../components/AppKeyboardAvoidView';
import {sortMedications} from '../../utills';
import {styles} from './styles.ts';

export const MedicationAddScreen: FC<MedicationAddMedicationProps> = ({
  navigation,
}) => {
  const {active} = useColorScheme();

  const onSubmit = useCallback<AddMedicationFormProps['onSubmit']>(
    value => {
      const res = storage.getString('medicationList');
      const medicationList: Medication[] = res ? JSON.parse(res) : [];

      medicationList.unshift(value);

      storage.set('medicationId', value.id + 1);
      storage.set(
        'medicationList',
        JSON.stringify(sortMedications(medicationList)),
      );
      navigation.goBack();
    },
    [navigation],
  );

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <AppKeyboardAvoidView style={styles.container}>
      <View style={styles.header}>
        <RadialBackgroundGradient isActive={!active} />
      </View>
      <AddMedicationForm onSubmit={onSubmit} onCancel={onCancel} />
    </AppKeyboardAvoidView>
  );
};

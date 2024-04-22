import React, {FC, useCallback, useState} from 'react';
import {Animated, Modal, Platform, View} from 'react-native';
import {styles} from './styles.ts';
import {Medication} from '../../../../types';
import {ProgressIndicator} from '../../../../components/Progress/components';
import {Button} from '../../../../components/Button';
import {AppText} from '../../../../components';
import {sortMedications} from '../../../../utills';
import {storage} from '../../../../storage';
import {
  AddMedicationForm,
  AddMedicationFormProps,
} from '../../../../components/forms/AddMedicationrForm';
import {AppKeyboardAvoidView} from '../../../../components/AppKeyboardAvoidView';
import ScrollView = Animated.ScrollView;

type props = Omit<Medication, 'updatedDate'> & {
  onItemDelete: () => void;
};

const KeyboardWrapper =
  Platform.OS === 'ios' ? AppKeyboardAvoidView : React.Fragment;

export const Card: FC<props> = ({
  id,
  count,
  destinationCount,
  name,
  onItemDelete,
  description,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const CountUpdate = useCallback(
    (value: number) => {
      const res = storage.getString('medicationList');
      const medicationList: Medication[] = res ? JSON.parse(res) : [];
      const index = medicationList.findIndex(item => item.id === id)!;
      medicationList[index].count = value;
      medicationList[index].updatedDate = Date.now();
      storage.set(
        'medicationList',
        JSON.stringify(sortMedications(medicationList)),
      );
    },
    [id],
  );

  const onSubmit = useCallback<AddMedicationFormProps['onSubmit']>(
    value => {
      const res = storage.getString('medicationList');
      const medicationList: Medication[] = res ? JSON.parse(res) : [];

      const index = medicationList.findIndex(item => item.id === id)!;

      medicationList[index] = {...value, id};

      storage.set(
        'medicationList',
        JSON.stringify(sortMedications(medicationList)),
      );
      setIsVisible(false);
    },
    [id],
  );

  const openModal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onPlus = () => {
    if (count + 1 > destinationCount) {
      return;
    }
    CountUpdate(count + 1);
  };

  const onMinus = () => {
    if (count <= 0) {
      return;
    }
    CountUpdate(count - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBtn}>
        <Button text={'Edit'} onPress={openModal} />
        <Button
          text={'Delete'}
          onPress={onItemDelete}
          style={styles.deleteBtn}
        />
      </View>
      <AppText text={name} style={styles.title} variant={'bodyLarge'} />
      <AppText
        text={description}
        style={styles.subTitle}
        variant={'bodyLarge'}
      />
      <View style={styles.row}>
        <Button style={styles.btn} text={'-'} onPress={onMinus} />
        <ProgressIndicator count={count} total={destinationCount} />
        <Button style={styles.btn} text={'+'} onPress={onPlus} />
      </View>
      <Modal animationType={'fade'} visible={isVisible} transparent>
        <KeyboardWrapper>
          <ScrollView contentContainerStyle={styles.modal}>
            <AddMedicationForm
              initialValues={{
                initialCount: count.toString(),
                destinationCount: destinationCount.toString(),
                description,
                name,
              }}
              onSubmit={onSubmit}
              onCancel={hideModal}
            />
          </ScrollView>
        </KeyboardWrapper>
      </Modal>
    </View>
  );
};

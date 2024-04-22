import React, {FC} from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';
import {styles} from './styles';
import {INIT_VALUES, MedicationSchema} from './scheme.ts';
import {AppText} from '../../AppText';
import {Input} from '../../formElements';
import {Medication} from '../../../types';
import {Button} from '../../Button';
import {storage} from '../../../storage';

export type AddMedicationFormProps = {
  initialValues?: typeof INIT_VALUES;
  onSubmit: (values: Medication) => void;
  onCancel: () => void;
};

export const AddMedicationForm: FC<AddMedicationFormProps> = ({
  initialValues = INIT_VALUES,
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MedicationSchema}
      onSubmit={values => {
        const updatedDate = Date.now();
        const id = storage.getNumber('medicationId') ?? 0;

        const submValue: Medication = {
          id,
          updatedDate,
          name: values.name,
          description: values.description,
          count: Number(values.initialCount),
          destinationCount: Number(values.destinationCount),
        };

        onSubmit(submValue);
      }}>
      {({submitForm}) => (
        <View style={styles.container}>
          <View style={styles.content}>
            <AppText text={'Your new medication'} style={styles.title} />
            <Input formikName={'name'} placeholder={'Type your name here...'} />
            <Input
              formikName={'description'}
              placeholder={'Type your description here...'}
            />
            <Input
              formikName={'destinationCount'}
              keyboardType={'numeric'}
              placeholder={'Type your medication destination count here...'}
            />
            <Input
              formikName={'initialCount'}
              keyboardType={'numeric'}
              placeholder={'Type your medication count here...'}
            />
          </View>

          <View style={styles.footer}>
            <Button text={'Cancel'} onPress={onCancel} />
            <Button text={'Add'} onPress={submitForm} />
          </View>
        </View>
      )}
    </Formik>
  );
};

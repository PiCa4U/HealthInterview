import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MedicationAddScreen,
  MedicationDetailsScreen,
  MedicationListScreen,
} from '../../screens';
import {MedicationParamList} from './types.ts';

const Stack = createNativeStackNavigator<MedicationParamList>();

export const MedicationStack = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'none', headerShown: false}}>
      <Stack.Screen name={'List'} component={MedicationListScreen} />
      <Stack.Screen name={'Details'} component={MedicationDetailsScreen} />
      <Stack.Screen name={'Add Medication'} component={MedicationAddScreen} />
    </Stack.Navigator>
  );
};

import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MedicationParamList = {
  ['List']: undefined;
  ['Details']: {id: number};
  ['Add Medication']: undefined;
};

export type MedicationScreenProps<RouteName extends keyof MedicationParamList> =
  NativeStackScreenProps<MedicationParamList, RouteName>;

export type MedicationListProps = MedicationScreenProps<'List'>;
export type MedicationDetailsProps = MedicationScreenProps<'Details'>;
export type MedicationAddMedicationProps =
  MedicationScreenProps<'Add Medication'>;

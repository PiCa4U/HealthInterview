import {useCallback} from 'react';
import {useMMKVObject} from 'react-native-mmkv';
import {Medication} from '../types';
import {storage} from '../storage';
import {sortMedications} from '../utills';

export const useMedications = () => {
  const [medications = []] = useMMKVObject<Medication[]>(
    'medicationList',
    storage,
  );
  return medications;
};

export const useRemoveMedication = () => {
  const [medications = [], setMedications] = useMMKVObject<Medication[]>(
    'medicationList',
    storage,
  );

  const onItemDelete = useCallback(
    (index: number) => {
      const arr = [
        ...medications.slice(0, index),
        ...medications.slice(index + 1),
      ];
      setMedications(arr);
    },
    [medications, setMedications],
  );
  return onItemDelete;
};

export const useCountUpdateMedication = () => {
  const [medications = [], setMedications] = useMMKVObject<Medication[]>(
    'medicationList',
    storage,
  );

  const onCountUpdate = useCallback(
    (index: number, value: number) => {
      const arr = [...medications];
      medications[index].count = value;
      medications[index].updatedDate = Date.now();

      setMedications(sortMedications(arr));
    },
    [medications, setMedications],
  );
  return onCountUpdate;
};

import React, {useEffect, useRef, useState} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {MedicationStack} from './StackNavigator';
import {storage} from '../storage';
import {getInitialState} from './utills.ts';

export const RootNavigation = () => {
  const [navigationState] = useState<NavigationState | undefined>(
    getInitialState(),
  );
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    const saveNavigationState = async () => {
      const state = navigationRef.current?.getRootState();
      if (state) {
        storage.set('NAVIGATION_STATE', JSON.stringify(state));
      }
    };

    const unsubscribe = navigationRef.current?.addListener(
      'state',
      saveNavigationState,
    );

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer initialState={navigationState} ref={navigationRef}>
      <MedicationStack />
    </NavigationContainer>
  );
};

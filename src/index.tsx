import React from 'react';
import {RootNavigation} from './navigation';
import {ScreenSchemeProvider} from './provider/BluredCircleTransition';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

/*
if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}
*/

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScreenSchemeProvider>
        <RootNavigation />
      </ScreenSchemeProvider>
    </GestureHandlerRootView>
  );
};

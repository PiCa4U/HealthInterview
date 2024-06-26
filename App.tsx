import React from 'react';
import {RootNavigation} from './src/navigation';
import {ScreenSchemeProvider} from './src/provider/BluredCircleTransition';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScreenSchemeProvider>
        <RootNavigation />
      </ScreenSchemeProvider>
    </GestureHandlerRootView>
  );
};

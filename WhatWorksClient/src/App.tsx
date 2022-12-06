import AppNavigator from "./AppNavigator";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

// UI Kitten
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { store } from './store';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </ApplicationProvider>
  );
}

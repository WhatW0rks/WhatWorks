import AppNavigator from "./AppNavigator";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { DependencyContext } from './src/presentation/context/DependencyContext';
import { getPokemonListUseCase } from './src/core/di/container';

export default function App() {
  return (
    <SafeAreaProvider>
      <DependencyContext.Provider value={{ getPokemonListUseCase }}>
        <SafeAreaView>
          <AppNavigator />
        </SafeAreaView>
      </DependencyContext.Provider>
    </SafeAreaProvider>
  );
}

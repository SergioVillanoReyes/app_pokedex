import { JSX, useEffect } from 'react'
import { FlatList, Text, View, Image } from 'react-native'
import { NavController, Route } from '../../navigation/navigator.types'
import { useListScreenViewModel } from '../../hooks/useListScreenViewModel'
import { styles } from './styles'
import { AppButton } from '../../components/AppButton'

export const ListScreen = (
  { navController }: { navController: NavController }
): JSX.Element => {

  const { loading, error, pokemons, fetchList } = useListScreenViewModel();

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>POKEDEX</Text>
      </View>
      {loading && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      )}
      {error && (
        <View style={styles.loading}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {!loading && !error && (
        <FlatList
          style={styles.list}
          data={pokemons}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardInfo}>
                <Text style={styles.title}>{item.name}</Text>
                <AppButton
                  text="Ver detalle"
                  variant="primary"
                  onPress={() =>
                    navController.navigate({ name: Route.DETAIL, id: item.id })
                  }
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

import { JSX, useEffect, useRef } from 'react'
import { FlatList, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { NavController, Route } from '../../navigation/navigator.types'
import { useListScreenViewModel } from '../../hooks/useListScreenViewModel'
import { styles } from './styles'
import { AppButton } from '../../components/AppButton'
import { ListSkeletonCard } from '../../components/SkeletonLoader'
import { colors } from '../../../core/theme'

export const ListScreen = (
  { navController }: { navController: NavController }
): JSX.Element => {

  const { loading, loadingMore, error, pokemons, fetchList, loadMore } = useListScreenViewModel();
  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    fetchList();
  }, []);

  const scrollToTop = () => listRef.current?.scrollToOffset({ offset: 0, animated: true })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>POKÉDEX</Text>
      </View>
      {loading && (
        <View style={styles.listContent}>
          {[1, 2, 3, 4, 5].map((i) => <ListSkeletonCard key={i} />)}
        </View>
      )}
      {error && (
        <View style={styles.loading}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {!loading && !error && (
        <>
          <FlatList
            ref={listRef}
            style={styles.list}
            data={pokemons}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore
                ? <ActivityIndicator size="small" color={colors.primary} style={styles.footer} />
                : null
            }
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
          <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
            <Text style={styles.scrollTopText}>↑</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

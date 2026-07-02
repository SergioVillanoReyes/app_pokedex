import { JSX, useEffect } from 'react'
import { Button, FlatList, Text, View, Image } from 'react-native'
import { NavController, Route } from '../navigation/navigator.types'
import { useListScreenViewModel } from '../hooks/useListScreenViewModel'

export const ListScreen = (
  { navController }: { navController: NavController }
) : JSX.Element => {
  const { loading, error, pokemons, fetchList } = useListScreenViewModel();

  useEffect(() => {
    fetchList();
  }, []);

  if(loading) {
    return <Text>Cargando...</Text>
  }

  return (
    <>
      <FlatList 
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{padding: 10}}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <Button title="GO DETAIL" onPress={() => {
              navController.navigate({ name: Route.DETAIL, id: 1 })
            }} />
          </View>
        )}
      />
    </>
  )
}

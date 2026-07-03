import { JSX, useEffect } from 'react'
import { Text, Button, View, Image } from 'react-native'
import { NavController } from '../navigation/navigator.types'
import { useDetailScreenViewModel } from '../hooks/useDetailScreenViewModel'

type DetailScreenProps = {
  navController: NavController
  id: number
}

export const DetailScreen = (
  { navController, id }: DetailScreenProps
) : JSX.Element => {
  const { loading, error, detailPokemon, fetchDetail } = useDetailScreenViewModel(id)

  useEffect(() => {
    fetchDetail()
  }, [])

  if(loading) {
    return <Text>Cargando...</Text>
  }

  if(error){
    return <Text>{error}</Text>
  }

  return (
    <View style={{backgroundColor: 'white', height: '100%', padding: 20 }}>

      <Image source={{ uri: detailPokemon?.image }} style={{ width: 100, height: 100 }} />
      <Text>#{detailPokemon?.id} — {detailPokemon?.name}</Text>
      <Text>Height: {detailPokemon?.height}</Text>
      <Text>Weight: {detailPokemon?.weight}</Text>
      <Text>Base Experience: {detailPokemon?.baseExperience}</Text>

      <Text>Types: {detailPokemon?.types.join(', ')}</Text>
      <Text>Abilities: {detailPokemon?.abilities.join(', ')}</Text>

      <Text>Stats:</Text>
      {detailPokemon?.stats.map((stat) => (
        <Text key={stat.name}>{stat.name}: {stat.value}</Text>
      ))}
      <Button title="GO BACK" onPress={() => navController.goBack()} />
    </View>
  )
}
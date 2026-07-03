import { JSX, useEffect } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import { NavController } from '../../navigation/navigator.types'
import { useDetailScreenViewModel } from '../../hooks/useDetailScreenViewModel'
import { styles } from './styles'
import { AppButton } from '../../components/AppButton'
import { DetailSkeletonLoader } from '../../components/SkeletonLoader'

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <AppButton
            text="Volver"
            variant="secondary"
            onPress={() => navController.goBack()}
          />
        </View>
      </View>

      {loading && <DetailSkeletonLoader />}

      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {detailPokemon && (
        <>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: detailPokemon.image }} style={styles.image} />
          </View>

          <Text style={styles.title}>{detailPokemon.name}</Text>

          <View style={styles.typesRow}>
            {detailPokemon.types.map((type) => (
              <View key={type} style={styles.typeBadge}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Información</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>{detailPokemon.height / 10} m</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>{detailPokemon.weight / 10} kg</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Exp. base</Text>
              <Text style={styles.infoValue}>{detailPokemon.baseExperience}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Habilidades</Text>
              <Text style={styles.infoValue}>{detailPokemon.abilities.join(', ')}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Stats</Text>
            {detailPokemon.stats.map((stat) => (
              <View key={stat.name} style={styles.statRow}>
                <Text style={styles.statName}>{stat.name}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <View style={styles.statBarBg}>
                  <View style={[styles.statBarFill, { width: `${Math.min((stat.value / 255) * 100, 100)}%` }]} />
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  )
}

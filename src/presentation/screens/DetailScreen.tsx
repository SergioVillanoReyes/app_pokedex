import { JSX } from 'react'
import { Text, Button } from 'react-native'
import { NavController } from '../navigation/navigator.types'

export const DetailScreen = (
  { navController }: { navController: NavController }
) : JSX.Element => {
  return (
    <>
      <Text>Detail Screen</Text>
      <Button title="GO BACK" onPress={() => {
        navController.goBack()
      }} />
    </>
  )
}
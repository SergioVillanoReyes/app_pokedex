import { JSX, useMemo, useState } from 'react'
import { View } from 'react-native'
import { AppRoute, Route } from './navigator.types'

// SCREENS
import { ListScreen } from '../screens/ListScreen';
import { DetailScreen } from '../screens/DetailScreen';

export const AppNavigator = () : JSX.Element => {
    
  const [stack, setStack] = useState<AppRoute[]>([{name: Route.LIST}])

  const currentRoute = stack[stack.length - 1];

  const navigation = useMemo(() => ({
    navigate: (route: AppRoute) => {
      setStack((prev) => [...prev, route])
    },
    goBack: () => {
      if(stack.length <= 1) return
      setStack((prev) => prev.slice(0, -1))
    },
  }), [stack])

  const resolveScreen = (route: AppRoute) : JSX.Element => {
    switch(route.name) {
    case Route.LIST:
      return <ListScreen navController={navigation} />
    case Route.DETAIL:
      return <DetailScreen navController={navigation} id={route.id} />
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {resolveScreen(currentRoute)}
    </View>
  )

}
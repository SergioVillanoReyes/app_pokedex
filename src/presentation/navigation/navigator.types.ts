export enum Route {
    LIST = 'list',
    DETAIL = 'detail',
}

export type AppRoute =
  | { name: Route.LIST }
  | { name: Route.DETAIL, id: number }

export type NavController = {
  navigate: (route: AppRoute) => void
  goBack: () => void
}
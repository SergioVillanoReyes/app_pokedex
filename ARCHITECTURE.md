# Architecture — App Pokédex

## Capas

```
presentation  →  domain  ←  data
                   ↑
                core/di
```

`domain` no importa nada de `data` ni `presentation`. Es el núcleo puro.
`data` implementa las interfaces de `domain`.
`presentation` solo conoce entidades y casos de uso de `domain`.
`core/di` es el único lugar donde todas las capas se conectan.

---

## Estructura

```
src/
├── core/
│   ├── di/container.ts               # Único punto de instanciación
│   └── theme/                        # colors, spacing, typography, radius, dimensions
│
├── data/
│   ├── datasource/
│   │   ├── IPokemonDataSource.ts     # Interfaz
│   │   └── PokemonDataSource.ts      # fetch a PokeAPI via HttpClient
│   ├── http/
│   │   ├── HttpClient.ts             # Wrapper de fetch con interceptor
│   │   ├── HttpError.ts              # Error centralizado (status + message)
│   │   ├── INetworkChecker.ts        # Interfaz
│   │   └── NetworkChecker.ts         # Detecta errores de red via TypeError
│   ├── models/
│   │   └── PokemonRaw.ts             # PokemonRaw, PokemonListResponse, PokemonDetailResponse
│   ├── repositories/
│   │   └── PokemonRepositoryImpl.ts  # Cache por página + fallback offline
│   └── storage/
│       ├── ILocalStorage.ts          # Interfaz
│       └── LocalStorageDataSource.ts # Módulo nativo (Android) / no-op (iOS)
│
├── domain/
│   ├── entities/Pokemon.ts           # Pokemon, PokemonDetail, PokemonStat
│   ├── repositories/PokemonRepository.ts
│   └── usecases/
│       ├── GetPokemonListUseCase.ts  # execute(offset, limit)
│       └── GetPokemonDetailUseCase.ts # execute(id)
│
└── presentation/
    ├── components/
    │   ├── AppButton/                # primary | secondary
    │   └── SkeletonLoader/           # ListSkeletonCard, DetailSkeletonLoader
    ├── context/DependencyContext.tsx  # Inyección via React Context
    ├── hooks/
    │   ├── useListScreenViewModel.ts
    │   └── useDetailScreenViewModel.ts
    ├── navigation/
    │   ├── AppNavigator.tsx          # Stack manual con useState + useMemo
    │   └── navigator.types.ts        # Route, AppRoute, NavController
    └── screens/
        ├── ListScreen/
        └── DetailScreen/
```

---

## Inyección de dependencias

```
container.ts
├── new NetworkChecker()
├── new HttpClient(baseUrl, networkChecker)
├── new PokemonDataSource(httpClient)
├── new LocalStorageDataSource()
├── new PokemonRepositoryImpl(datasource, storage)
├── new GetPokemonListUseCase(repository)
└── new GetPokemonDetailUseCase(repository)
        ↓
DependencyContext.Provider (App.tsx)
        ↓
useDependencies() → hooks de presentación
```

Ningún hook importa del `container` directamente — solo consumen via `useDependencies()`.

---

## Flujo de un dato

```
FlatList.onEndReached
  → useListScreenViewModel.loadMore()
  → GetPokemonListUseCase.execute(offset, limit)
  → PokemonRepositoryImpl.getPokemonList(offset, limit)
      ├── cache válido (< 5 min)  →  retorna cache
      ├── cache expirado + red    →  fetch → guarda cache → retorna
      └── sin red + cache existe  →  retorna cache como fallback
  → Pokemon[]  →  FlatList renderiza
```

---

## Persistencia

`EncryptedSharedPreferences` (Android) via módulo nativo `StorageModule.kt`.
Cache por página con clave `pokemon_list_{offset}_{limit}` y TTL de 5 minutos.
En iOS el storage es no-op — la app funciona sin cache.

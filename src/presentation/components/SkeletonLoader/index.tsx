import { JSX, useEffect, useRef } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { colors, spacing, radius, wp } from '../../../core/theme'

type SkeletonBoxProps = {
  width: number | string
  height: number
  borderRadius?: number
  style?: object
}

const SkeletonBox = ({ width, height, borderRadius = radius.md, style }: SkeletonBoxProps): JSX.Element => {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    ).start()
  }, [])

  return (
    <Animated.View
      style={[{ width, height, borderRadius, backgroundColor: colors.border, opacity }, style]}
    />
  )
}

export const ListSkeletonCard = (): JSX.Element => (
  <View style={styles.card}>
    <SkeletonBox width={wp(18)} height={wp(18)} borderRadius={radius.round} />
    <View style={styles.cardInfo}>
      <SkeletonBox width={wp(10)} height={12} style={{ marginBottom: spacing.xs }} />
      <SkeletonBox width={wp(30)} height={18} style={{ marginBottom: spacing.sm }} />
      <SkeletonBox width={wp(25)} height={32} borderRadius={radius.lg} />
    </View>
  </View>
)

export const DetailSkeletonLoader = (): JSX.Element => (
  <View style={styles.detailContainer}>
    <View style={styles.detailHeader} />
    <View style={styles.detailImageWrapper}>
      <SkeletonBox width={wp(45)} height={wp(45)} borderRadius={radius.round} />
    </View>
    <SkeletonBox width={wp(40)} height={28} style={styles.centered} />
    <View style={styles.badgesRow}>
      <SkeletonBox width={wp(20)} height={24} borderRadius={radius.round} />
      <SkeletonBox width={wp(20)} height={24} borderRadius={radius.round} />
    </View>
    <View style={styles.detailCard}>
      <SkeletonBox width={wp(30)} height={16} style={{ marginBottom: spacing.md }} />
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.infoRow}>
          <SkeletonBox width={wp(20)} height={14} />
          <SkeletonBox width={wp(20)} height={14} />
        </View>
      ))}
    </View>
    <View style={styles.detailCard}>
      <SkeletonBox width={wp(15)} height={16} style={{ marginBottom: spacing.md }} />
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <View key={i} style={styles.statRow}>
          <SkeletonBox width={wp(25)} height={12} />
          <SkeletonBox width={wp(8)} height={12} />
          <SkeletonBox width={wp(30)} height={6} borderRadius={radius.round} />
        </View>
      ))}
    </View>
  </View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
  },
  detailHeader: {
    backgroundColor: colors.border,
    height: wp(30),
  },
  detailImageWrapper: {
    marginTop: -spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  centered: {
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
})

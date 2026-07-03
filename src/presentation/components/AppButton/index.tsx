import { JSX } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors, spacing, typography, radius } from '../../../core/theme'

type AppButtonProps = {
  text: string
  onPress: () => void
  variant: 'primary' | 'secondary'
}

export const AppButton = ({ text, onPress, variant }: AppButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={[styles.base, variant === 'primary' ? styles.primary : styles.secondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variant === 'primary' ? styles.textPrimary : styles.textSecondary]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    fontSize: typography.subtitle,
    fontWeight: '600',
  },
  textPrimary: {
    color: colors.surface,
  },
  textSecondary: {
    color: colors.primary,
  },
})

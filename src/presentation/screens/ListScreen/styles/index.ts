import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, wp } from '../../../../core/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: colors.secondary,
  },

  headerTitle: {
    fontSize: typography.h2,
    fontWeight: 'bold',
    color: colors.secondary,
    letterSpacing: 2,
  },


  list: {
    flex: 1,
  },

  listContent: {
    padding: spacing.md,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  image: {
    width: wp(26),
    height: wp(26),
    backgroundColor: colors.background,
    borderRadius: radius.round,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  cardInfo: {
    flex: 1,
  },

  pokemonId: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },

  title: {
    fontSize: typography.title,
    color: colors.textPrimary,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: spacing.sm,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },

  errorText: {
    fontSize: typography.body,
    color: colors.error,
  },

  footer: {
    paddingVertical: spacing.lg,
  },

  scrollTopButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 44,
    height: 44,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollTopText: {
    color: colors.secondary,
    fontSize: typography.title,
    fontWeight: 'bold',
  },
});

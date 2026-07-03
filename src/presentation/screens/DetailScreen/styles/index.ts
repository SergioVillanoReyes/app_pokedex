import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, wp } from '../../../../core/theme';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingBottom: spacing.xxl,
  },

  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    borderBottomWidth: 4,
    borderBottomColor: colors.secondary,
  },

  backButton: {
    width: '100%',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },

  pokemonId: {
    fontSize: typography.subtitle,
    color: colors.secondary,
    fontWeight: '600',
  },

  imageWrapper: {
    marginTop: -spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  image: {
    width: wp(45),
    height: wp(45),
    borderRadius: radius.round,
    borderWidth: 3,
    borderColor: colors.secondary,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: typography.h2,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: spacing.sm,
  },

  typesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  typeBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
  },

  typeText: {
    color: colors.surface,
    fontSize: typography.caption,
    fontWeight: '600',
    textTransform: 'capitalize',
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderTopWidth: 3,
    borderTopColor: colors.secondary,
  },

  cardTitle: {
    fontSize: typography.subtitle,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },

  infoLabel: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },

  infoValue: {
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  sectionTitle: {
    fontSize: typography.subtitle,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },

  statName: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'capitalize',
    width: wp(25),
  },

  statValue: {
    fontSize: typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
    width: wp(8),
    textAlign: 'right',
  },

  statBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: radius.round,
    overflow: 'hidden',
  },

  statBarFill: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: radius.round,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },

  loadingText: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },

  errorText: {
    fontSize: typography.body,
    color: colors.error,
  },
});

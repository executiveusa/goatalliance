import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../theme';

interface Props {
  label: string;
  active?: boolean;
  onPress: () => void;
}

export function TogglePill({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.pill, active ? styles.active : styles.inactive]}
    >
      <Text style={active ? styles.activeText : styles.inactiveText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  activeText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  inactiveText: {
    color: colors.text,
    fontWeight: '600',
  },
});

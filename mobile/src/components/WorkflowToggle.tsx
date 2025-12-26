import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors, spacing } from '../theme';

interface Props {
  name: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export function WorkflowToggle({ name, description, enabled, onChange }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.textGroup}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        accessibilityLabel={`${name} toggle`}
        trackColor={{ false: '#475569', true: colors.primary }}
        thumbColor={enabled ? '#0f172a' : '#e2e8f0'}
        onValueChange={onChange}
        value={enabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: spacing.md,
  },
  textGroup: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: colors.text,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 13,
  },
});

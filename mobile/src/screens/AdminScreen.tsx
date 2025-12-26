import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlassCard } from '../components/GlassCard';
import { colors, radii, spacing } from '../theme';

export function AdminScreen() {
  return (
    <View style={styles.container}>
      <GlassCard title="Admin access" subtitle="Stubbed Supabase Auth ready for SSO.">
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="admin@example.com" placeholderTextColor={colors.muted} />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={colors.muted} secureTextEntry />
          <Text style={styles.helper}>Connect this screen to Supabase Auth or your IdP to gate admin controls.</Text>
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  form: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontWeight: '700',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: spacing.md,
    borderRadius: radii.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  helper: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
});

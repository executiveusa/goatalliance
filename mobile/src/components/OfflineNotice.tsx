import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export function OfflineNotice() {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Offline mode</Text>
      <Text style={styles.body}>You can keep browsing cached data. Changes will sync when you reconnect.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    gap: 4,
  },
  title: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 14,
  },
  body: {
    color: colors.text,
    fontSize: 13,
  },
});

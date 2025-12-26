import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlassCard } from '../components/GlassCard';
import { WorkflowToggle } from '../components/WorkflowToggle';
import { fetchWorkflows, toggleWorkflow } from '../lib/workflows';
import { useOfflineStatus } from '../hooks/useOfflineStatus';
import { colors, spacing } from '../theme';
import { workflowCatalog } from '../data/sampleData';
import { Workflow } from '../types';

export function DashboardScreen() {
  const navigation = useNavigation<any>();
  const isOffline = useOfflineStatus();
  const [workflows, setWorkflows] = useState<Workflow[]>(workflowCatalog);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hydrate = useCallback(async () => {
    if (isOffline) {
      setError('Offline. Changes will sync when you reconnect.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWorkflows();
      setWorkflows(data.length ? data : workflowCatalog);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [isOffline]);

  const toggle = useCallback(
    async (id: string, enabled: boolean) => {
      if (isOffline) {
        setError('Offline. Reconnect to update workflow status.');
        return;
      }

      setWorkflows((prev) => prev.map((flow) => (flow.id === id ? { ...flow, enabled } : flow)));

      try {
        await toggleWorkflow(id, enabled);
      } catch (err) {
        setError('Could not update workflow. Please try again.');
        setWorkflows((prev) => prev.map((flow) => (flow.id === id ? { ...flow, enabled: !enabled } : flow)));
      }
    },
    [isOffline]
  );

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <View style={styles.container}>
      <GlassCard
        title="AI & workflow console"
        subtitle="Stubbed endpoints ready for n8n, Supabase Edge Functions, or studio agents."
      >
        <View style={styles.stack}>
          <View style={styles.adminCTA}>
            <Text style={styles.copyBody}>Need advanced controls?</Text>
            <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('Admin')}>
              <Text style={styles.adminButtonText}>Go to admin</Text>
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={colors.accent} />
              <Text style={styles.copyBody}>Loading workflows…</Text>
            </View>
          ) : (
            workflows.map((flow) => (
              <WorkflowToggle
                key={flow.id}
                name={flow.name}
                description={flow.description}
                enabled={Boolean(flow.enabled)}
                onChange={(next) => toggle(flow.id, next)}
              />
            ))
          )}
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </GlassCard>

      <GlassCard title="Offline operations" subtitle="Plan around fleet connectivity swings.">
        <View style={styles.stack}>
          <View style={styles.copyBlock}>
            <Text style={styles.copyTitle}>Cache playbooks</Text>
            <Text style={styles.copyBody}>
              Your daily routes, client notes, and price sheets stay stored in AsyncStorage so crews can work without
              service.
            </Text>
          </View>
          <View style={styles.copyBlock}>
            <Text style={styles.copyTitle}>Graceful fallback</Text>
            <Text style={styles.copyBody}>
              When offline, the interface keeps navigation active and queues updates for later sync.
            </Text>
          </View>
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  stack: {
    gap: spacing.sm,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  adminCTA: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  adminButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
  },
  adminButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  copyBlock: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: spacing.md,
    borderRadius: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  copyTitle: {
    color: colors.text,
    fontWeight: '700',
  },
  copyBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  error: {
    color: '#fca5a5',
    fontSize: 13,
  },
});

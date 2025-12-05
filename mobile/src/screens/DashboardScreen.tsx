import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Feather } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"
import { ScreenLayout } from "../components/ScreenLayout"
import { GlassPanel } from "../components/GlassPanel"
import { RootStackParamList } from "../navigation/types"
import { palette } from "../theme/colors"

const tasks = [
  {
    title: "Invite team",
    detail: "Send a Supabase magic link to bring teammates into the workspace.",
    icon: "users"
  },
  {
    title: "Review submissions",
    detail: "Approve new provider profiles and keep the directory fresh.",
    icon: "check-circle"
  },
  {
    title: "Schedule onboarding",
    detail: "Book a kickoff with premium members directly from the app.",
    icon: "calendar"
  }
] as const

export function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <ScreenLayout
      title="Dashboard"
      subtitle="Monitor progress with the same gradient shell used across the app."
      onPressAdmin={() => navigation.navigate("Admin")}
    >
      <GlassPanel>
        <Text style={styles.sectionTitle}>At a glance</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricBlock}>
            <Text style={styles.metricValue}>92%</Text>
            <Text style={styles.metricLabel}>Profile completeness</Text>
          </View>
          <View style={styles.metricBlock}>
            <Text style={styles.metricValue}>14</Text>
            <Text style={styles.metricLabel}>Active members</Text>
          </View>
        </View>
      </GlassPanel>

      <GlassPanel>
        <Text style={styles.sectionTitle}>Next steps</Text>
        <View style={styles.stack}>
          {tasks.map((task) => (
            <View key={task.title} style={styles.row}>
              <View style={styles.iconBubble}>
                <Feather name={task.icon} size={20} color={palette.keppel} />
              </View>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>{task.title}</Text>
                <Text style={styles.rowDescription}>{task.detail}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={"rgba(255,255,255,0.7)"} />
            </View>
          ))}
        </View>
      </GlassPanel>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: palette.white,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8
  },
  metricsRow: {
    flexDirection: "row",
    gap: 10
  },
  metricBlock: {
    flex: 1,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.glassBorder
  },
  metricValue: {
    color: palette.keppel,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4
  },
  metricLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    lineHeight: 18
  },
  stack: {
    gap: 12
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: palette.glassBorder
  },
  rowCopy: {
    flex: 1,
    gap: 2
  },
  rowTitle: {
    color: palette.white,
    fontSize: 16,
    fontWeight: "700"
  },
  rowDescription: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    lineHeight: 20
  }
})
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Switch, Text, View } from "react-native";

import { GlassCard } from "../components/GlassCard";
import { useOfflineStatus } from "../hooks/useOfflineStatus";
import { listWorkflows, toggleWorkflowStatus, updateLocalWorkflowState, type Workflow } from "../lib/workflows";

export function DashboardScreen() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const isOffline = useOfflineStatus();

  const sortedWorkflows = useMemo(
    () => [...workflows].sort((a, b) => a.name.localeCompare(b.name)),
    [workflows],
  );

  useEffect(() => {
    let isMounted = true;

    if (isOffline) {
      setLoading(false);
      setFeedback("Offline. Connect to refresh workflow status.");
      return;
    }

    setLoading(true);
    setError(null);
    setFeedback(null);

    listWorkflows()
      .then((data) => {
        if (!isMounted) return;
        setWorkflows(data);
      })
      .catch((err: Error) => {
        if (!isMounted) return;
        setError(err.message || "Unable to load workflows.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOffline]);

  const handleToggle = useCallback(
    async (workflow: Workflow) => {
      if (isOffline) {
        setFeedback("You are offline. Changes will be available once you reconnect.");
        return;
      }

      const nextEnabled = !workflow.enabled;
      setFeedback(`Turning ${nextEnabled ? "on" : "off"}…`);
      updateLocalWorkflowState(setWorkflows, workflow.id, nextEnabled);

      try {
        const updated = await toggleWorkflowStatus(workflow.id, nextEnabled);
        updateLocalWorkflowState(setWorkflows, workflow.id, updated.enabled);
        setFeedback(`Workflow ${updated.enabled ? "enabled" : "disabled"}.`);
      } catch (err) {
        updateLocalWorkflowState(setWorkflows, workflow.id, workflow.enabled);
        const message = err instanceof Error ? err.message : "Unable to update workflow.";
        setFeedback(message);
      }
    },
    [isOffline],
  );

  return (
    <GlassCard>
      {loading ? (
        <View style={{ gap: 8, alignItems: "center" }}>
          <ActivityIndicator />
          <Text>Loading workflows…</Text>
        </View>
      ) : error ? (
        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: "600" }}>Something went wrong</Text>
          <Text>{error}</Text>
        </View>
      ) : (
        <View style={{ gap: 16 }}>
          {sortedWorkflows.map((workflow) => (
            <View
              key={workflow.id}
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{workflow.name}</Text>
                {workflow.description ? (
                  <Text style={{ color: "#6b7280", marginTop: 4 }}>{workflow.description}</Text>
                ) : null}
              </View>
              <Switch value={workflow.enabled} onValueChange={() => handleToggle(workflow)} />
            </View>
          ))}

          {sortedWorkflows.length === 0 ? (
            <Text style={{ color: "#6b7280" }}>No workflows available yet.</Text>
          ) : null}

          {feedback ? <Text style={{ color: "#6b7280" }}>{feedback}</Text> : null}
        </View>
      )}
    </GlassCard>
  );
}

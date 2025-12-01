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

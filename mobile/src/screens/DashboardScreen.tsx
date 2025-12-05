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

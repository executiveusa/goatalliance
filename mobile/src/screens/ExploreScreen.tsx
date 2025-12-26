import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Feather } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"
import { ScreenLayout } from "../components/ScreenLayout"
import { GlassPanel } from "../components/GlassPanel"
import { RootStackParamList } from "../navigation/types"
import { palette } from "../theme/colors"

const featuredItems = [
  {
    title: "Verified Pros",
    description: "Browse vetted contractors and consultants with real project histories."
  },
  {
    title: "Seattle Focus",
    description: "Tap into the Pacific Northwest network with localized expertise."
  },
  {
    title: "Membership Tiers",
    description: "Preview Ally, Professional, and Enterprise perks before you upgrade."
  }
]

export function ExploreScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <ScreenLayout
      title="Explore"
      subtitle="Discover the best of GOAT Alliance with a guided, glassy shell."
      onPressAdmin={() => navigation.navigate("Admin")}
    >
      <GlassPanel>
        <Text style={styles.sectionTitle}>Featured Paths</Text>
        <View style={styles.chipRow}>
          <View style={styles.chip}>
            <Feather name="compass" size={16} color={palette.white} />
            <Text style={styles.chipText}>Curated Trails</Text>
          </View>
          <View style={styles.chip}>
            <Feather name="sparkles" size={16} color={palette.white} />
            <Text style={styles.chipText}>Premium Picks</Text>
          </View>
        </View>
        <View style={styles.stack}>
          {featuredItems.map((item) => (
            <View key={item.title} style={styles.row}>
              <View style={styles.iconBubble}>
                <Feather name="sunrise" size={20} color={palette.saffron} />
              </View>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </GlassPanel>

      <GlassPanel>
        <Text style={styles.sectionTitle}>Handoff Ready</Text>
        <Text style={styles.body}>Keep the Seattle-inspired gradient, glass cards, and generous spacing as you pivot tabs.</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>24</Text>
            <Text style={styles.metricLabel}>Open projects</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>8</Text>
            <Text style={styles.metricLabel}>Premium leads</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricLabel}>New partners</Text>
          </View>
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
    marginBottom: 6
  },
  body: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    lineHeight: 21
  },
  chipRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.glassBorder
  },
  chipText: {
    color: palette.white,
    fontWeight: "600"
  },
  stack: {
    gap: 14,
    marginTop: 4
  },
  row: {
    flexDirection: "row",
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
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },
  metric: {
    alignItems: "flex-start",
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.glassBorder,
    minWidth: 90
  },
  metricValue: {
    color: palette.saffron,
    fontSize: 22,
    fontWeight: "800"
  },
  metricLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 2
  }
})

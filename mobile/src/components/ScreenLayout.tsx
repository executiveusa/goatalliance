import { ReactNode } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { palette } from "../theme/colors"

interface ScreenLayoutProps {
  title: string
  subtitle?: string
  onPressAdmin?: () => void
  children: ReactNode
}

export function ScreenLayout({ title, subtitle, onPressAdmin, children }: ScreenLayoutProps) {
  return (
    <LinearGradient colors={[palette.midnight, palette.charcoal, "#1D2A32"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          bounces
        >
          <View style={styles.headerRow}>
            <View style={styles.titleGroup}>
              <Text style={styles.kicker}>GOAT Alliance</Text>
              <Text style={styles.title}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            {onPressAdmin ? (
              <TouchableOpacity
                accessibilityLabel="Open admin"
                onPress={onPressAdmin}
                style={styles.adminButton}
              >
                <Feather name="shield" size={18} color={palette.white} />
                <Text style={styles.adminText}>Admin</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {children}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  safeArea: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 16
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 2
  },
  titleGroup: {
    flex: 1
  },
  kicker: {
    color: palette.saffron,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 6
  },
  title: {
    color: palette.white,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 15,
    lineHeight: 20
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.glass,
    borderColor: palette.glassBorder,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
    shadowColor: palette.charcoal,
    shadowOpacity: 0.35,
    shadowRadius: 10
  },
  adminText: {
    color: palette.white,
    fontWeight: "600",
    fontSize: 14
  }
})

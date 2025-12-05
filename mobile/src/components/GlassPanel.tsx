import { ReactNode } from "react"
import { StyleSheet, View } from "react-native"
import { BlurView } from "expo-blur"
import { palette } from "../theme/colors"

interface GlassPanelProps {
  children: ReactNode
  padding?: number
}

export function GlassPanel({ children, padding = 16 }: GlassPanelProps) {
  return (
    <BlurView intensity={35} tint="dark" style={styles.container}>
      <View style={[styles.inner, { padding }]}>{children}</View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: palette.glass,
    borderWidth: 1,
    borderColor: palette.glassBorder,
    marginBottom: 14
  },
  inner: {
    gap: 8
  }
})

import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ScreenLayout } from "../components/ScreenLayout"
import { GlassPanel } from "../components/GlassPanel"
import { palette } from "../theme/colors"

export function AdminScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSignIn = () => {
    // Placeholder for Supabase Auth; wire up supabase.auth.signInWithPassword when keys are provided
    if (email.trim() && password.trim()) {
      setIsAuthenticated(true)
    }
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setPassword("")
  }

  return (
    <ScreenLayout
      title="Admin"
      subtitle="Protected area for premium actions; swap this guard with Supabase Auth."
    >
      {!isAuthenticated ? (
        <GlassPanel padding={18}>
          <Text style={styles.sectionTitle}>Sign in</Text>
          <Text style={styles.subcopy}>Use Supabase credentials to unlock admin controls.</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
            <Feather name="log-in" size={18} color={palette.white} />
            <Text style={styles.primaryText}>Sign in with Supabase</Text>
          </TouchableOpacity>
        </GlassPanel>
      ) : (
        <GlassPanel padding={18}>
          <View style={styles.row}>
            <View>
              <Text style={styles.sectionTitle}>Authenticated</Text>
              <Text style={styles.subcopy}>Replace this with real Supabase session state.</Text>
            </View>
            <Feather name="unlock" size={24} color={palette.keppel} />
          </View>
          <View style={styles.cardRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Pending approvals</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Billing escalations</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSignOut}>
            <Feather name="log-out" size={18} color={palette.white} />
            <Text style={styles.secondaryText}>Sign out</Text>
          </TouchableOpacity>
        </GlassPanel>
      )}
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
  subcopy: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 14,
    marginBottom: 8
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.glassBorder,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: palette.white,
    fontSize: 15,
    marginBottom: 10
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: palette.keppel,
    borderRadius: 14,
    paddingVertical: 12,
    shadowColor: palette.keppel,
    shadowOpacity: 0.35,
    shadowRadius: 10
  },
  primaryText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: 15
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12
  },
  cardRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12
  },
  statCard: {
    flex: 1,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.glassBorder
  },
  statValue: {
    color: palette.saffron,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4
  },
  statLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13
  },
  secondaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.glassBorder,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginTop: 4
  },
  secondaryText: {
    color: palette.white,
    fontWeight: "700",
    fontSize: 15
  }
})

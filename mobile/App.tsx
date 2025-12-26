import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { OfflineNotice } from './src/components/OfflineNotice';
import { useCachedHighlights } from './src/hooks/useCachedHighlights';
import { useOfflineStatus } from './src/hooks/useOfflineStatus';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { AdminScreen } from './src/screens/AdminScreen';
import { colors, spacing } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    card: 'rgba(15,23,42,0.85)',
    text: colors.text,
    border: 'rgba(255,255,255,0.08)',
  },
};

function ScreenLayout({ title, subtitle, children, showOffline }: { title: string; subtitle?: string; children: React.ReactNode; showOffline?: boolean }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {showOffline ? <OfflineNotice /> : null}
      {children}
    </ScrollView>
  );
}

function Tabs() {
  const isOffline = useOfflineStatus();
  const { highlights, loading, refresh, error } = useCachedHighlights();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderTopColor: 'rgba(255,255,255,0.1)',
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.muted,
        sceneContainerStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Tab.Screen name="Explore">
        {() => (
          <ScreenLayout title="Mobile-first YAPP preview" subtitle="Glass panels, fluid hero, and cached content." showOffline={isOffline}>
            <HomeScreen
              highlights={highlights}
              refresh={refresh}
              loading={loading}
              error={error}
              isOffline={isOffline}
            />
          </ScreenLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Dashboard">
        {() => (
          <ScreenLayout title="Internal dashboard" subtitle="Workflow control center" showOffline={isOffline}>
            <DashboardScreen />
          </ScreenLayout>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#0f172a', '#0b1220', '#0f172a']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StatusBar style="light" />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer theme={navTheme}>
            <Stack.Navigator
              screenOptions={{
                headerTransparent: true,
                headerTintColor: colors.text,
                headerTitleStyle: { color: colors.text },
                contentStyle: { backgroundColor: 'transparent' },
              }}
            >
              <Stack.Screen name="Root" component={Tabs} options={{ headerShown: false }} />
              <Stack.Screen
                name="Admin"
                component={AdminScreen}
                options={{
                  title: 'Admin controls',
                  headerBackTitleVisible: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
  },
});

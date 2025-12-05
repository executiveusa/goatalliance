import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BlurView } from "expo-blur"
import { Feather } from "@expo/vector-icons"
import { enableScreens } from "react-native-screens"
import { StyleSheet } from "react-native"
import { ExploreScreen } from "./src/screens/ExploreScreen"
import { DashboardScreen } from "./src/screens/DashboardScreen"
import { AdminScreen } from "./src/screens/AdminScreen"
import { MainTabParamList, RootStackParamList } from "./src/navigation/types"
import { palette } from "./src/theme/colors"

enableScreens()

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<MainTabParamList>()

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
    card: palette.charcoal,
    text: palette.white,
    primary: palette.keppel,
    border: "rgba(255,255,255,0.15)"
  }
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.saffron,
        tabBarInactiveTintColor: "rgba(255,255,255,0.7)",
        tabBarLabelStyle: { fontWeight: "700", fontSize: 13 },
        tabBarItemStyle: { paddingVertical: 6 },
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <BlurView tint="dark" intensity={30} style={StyleSheet.absoluteFill} />,
        tabBarIcon: ({ color, size }) => {
          const name = route.name === "Explore" ? "map" : "layout"
          return <Feather name={name as any} color={color} size={size} />
        }
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
          <Stack.Screen name="Root" component={MainTabs} />
          <Stack.Screen name="Admin" component={AdminScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(0,0,0,0.35)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 20,
    height: 76
  }
})

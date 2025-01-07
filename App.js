import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Homescreen from "./views/Homescreen";
import Detailscreen from "./views/Detailscreen";
import Booking from "./views/Booking";
import Payment from "./views/Payment";
import Carwashscreen from "./views/Carwashscreen";
import Profilescreen from "./views/Profilescreen";
import Activityscreen from "./views/Activityscreen";
import Favoritescreen from "./views/Favoritescreen";
import Morescreen from "./views/Morescreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable header for all screens
      }}
    >
      <Stack.Screen name="Home" component={Homescreen} />
      <Stack.Screen name="Details" component={Detailscreen} />
      <Stack.Screen name="Carwashdetail" component={Carwashscreen} />
      <Stack.Screen name="Carwashprofile" component={Profilescreen} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};
const ActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivityScreen"
        component={Activityscreen}
        options={{
          title: "Activity", // Header title
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333", // Header text color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};
const PostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivityScreen"
        component={Activityscreen}
        options={{
          title: "Posts", // Header title
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333", // Header text color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivityScreen"
        component={Activityscreen}
        options={{
          title: "Chats", // Header title
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerTintColor: "#333", // Header text color
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};
const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Disable header in tab navigator
        tabBarActiveTintColor: "#f00036", // Active tab color
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack} // Stack as a Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036",
                    position: "absolute",
                    top: -6,
                  }}
                />
              )}
              <Feather
                name="home"
                color={focused ? "#f00036" : color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        // component={Categoryscreen}
        component={ActivityStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036",
                    position: "absolute",
                    top: -6,
                  }}
                />
              )}
              <Fontisto
                name="bell"
                color={focused ? "#f00036" : color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036",
                    position: "absolute",
                    top: -2,
                  }}
                />
              )}
              <Ionicons name="add-circle" color={"#f00036"} size={35} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036",
                    position: "absolute",
                    top: -6,
                  }}
                />
              )}
              <Ionicons
                name="chatbubble-outline"
                color={focused ? "#f00036" : color}
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={Morescreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036",
                    position: "absolute",
                    top: -6,
                  }}
                />
              )}
              <AntDesign
                name="user"
                color={focused ? "#f00036" : color}
                size={size}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     {/* Include TabNav as the main navigation */}
    //     <Stack.Screen name="Main" component={TabNav} />
    //     {/* Add other screens */}
    //     <Stack.Screen name="Details" component={Detailscreen} />
    //     <Stack.Screen name="Carwashdetail" component={Carwashscreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

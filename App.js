import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./views/Homescreen";
import Detailscreen from "./views/Detailscreen";
import Cartscreen from "./views/Cartscreen";
import Categoryscreen from "./views/Categoryscreen";
import Favoritescreen from "./views/Favoritescreen";
import Morescreen from "./views/Morescreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f00036", // Set active tab color
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            // <Feather
            //   name="home"
            //   color={focused ? "#f00036" : color} // Change color when focused
            //   size={size}
            // />
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036", // Color of the line
                    position: "absolute",
                    top: -6, // Adjust spacing above the icon
                  }}
                />
              )}
              <Feather
                name="home"
                color={focused ? "#f00036" : color} // Change icon color when focused
                size={size}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Categoryscreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            // <Fontisto
            //   name="bell"
            //   color={focused ? "#f00036" : color} // Change color when focused
            //   size={size}
            // />
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036", // Color of the line
                    position: "absolute",
                    top: -6, // Adjust spacing above the icon
                  }}
                />
              )}
              <Fontisto
                name="bell"
                color={focused ? "#f00036" : color} // Change color when focused
                size={size}
              />
            </View>
          ),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            lineHeight: 30,
            color: "white",
            fontFamily: "Helvetica Neue",
          },

          headerStyle: {
            backgroundColor: "#2A4BA0",
          },
          title: "Activity",
        }}
      />
      <Tab.Screen
        name="Post"
        component={Categoryscreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036", // Color of the line
                    position: "absolute",
                    top: -2, // Adjust spacing above the icon
                  }}
                />
              )}
              <Ionicons
                name="add-circle"
                color={"#f00036"} // Change color when focused
                size={35}
              />
            </View>
            // <Ionicons
            //   name="add-circle"
            //   color={"#f00036"} // Change color when focused
            //   size={35}
            // />
          ),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            lineHeight: 30,
            color: "white",
            fontFamily: "Helvetica Neue",
          },
          headerStyle: {
            backgroundColor: "#2A4BA0",
          },
          title: "Post",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Favoritescreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            // <Ionicons
            //   name="chatbubble-outline"
            //   color={focused ? "#f00036" : color}
            //   size={size}
            // />
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036", // Color of the line
                    position: "absolute",
                    top: -6, // Adjust spacing above the icon
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
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            lineHeight: 30,
            color: "white",
            fontFamily: "Helvetica Neue",
          },
          headerStyle: {
            backgroundColor: "#2A4BA0",
          },
          title: "Chat",
        }}
      />
      <Tab.Screen
        name="User"
        component={Morescreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            // <AntDesign
            //   name="user"
            //   color={focused ? "#f00036" : color}
            //   size={size}
            // />
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#f00036", // Color of the line
                    position: "absolute",
                    top: -6, // Adjust spacing above the icon
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
          headerShown: false,
          headerTitleStyle: {
            fontSize: 22,
            lineHeight: 30,
            color: "white",
            fontFamily: "Helvetica Neue",
          },
          headerStyle: {
            backgroundColor: "#2A4BA0",
          },
          title: "User",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Homescreen />
    // </View>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNav}

          // options={{ title: "Silent Hill" }}
        />
        <Stack.Screen
          name="Details"
          component={Detailscreen}
          // options={{ tabBarStyle: { display: "none" } }}
          // options={{ title: "Silent Hill" }}
        />
        <Stack.Screen
          name="Cart"
          component={Cartscreen}
          // options={{ tabBarStyle: { display: "none" } }}
          // options={{ title: "Silent Hill" }}
        />
      </Stack.Navigator>
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

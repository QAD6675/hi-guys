import React, { useEffect, useState, useContext } from "react";
import { Text, View, LogBox } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import ContextWrapper from "./context/ContextWrapper";
import Context from "./context/Context";
import SignIn from "./Screens/SignIn";
import Profile from "./Screens/Profile";
import Photo from "./Screens/Photo";
import Chats from "./Screens/Chats";
import Contacts from "./Screens/Contacts.js";
import Chat from "./Screens/Chat";
import ChatHeader from './components/ChatHeader';

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) setCurrUser(user);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>تحميل...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              title: "hi-guys",
              headerTitleStyle: { color: "#00005e" }
            }}
          />
          <Stack.Screen
            name="contacts"
            options={{
              title: "اختر جهة اتصال",
              headerTitleStyle: { color: "#00005e" },
            }}
            component={Contacts}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{ headerTitle: (props) => <ChatHeader {...props} /> }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" size={20} color={colors.black} />;
            } else {
              return <Text style={{ color: colors.black }}>المحادثات</Text>;
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.black,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
          },
          tabBarStyle: {
            backgroundColor: colors.secondary,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
}

const main = () => {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chat.png"),
    require("./assets/chatbg.png"),
  );
  if (!assets) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>تحميل...</Text>
      </View>
    );
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
};
export default main;

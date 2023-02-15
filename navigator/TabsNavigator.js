import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabIcon from "../component/icon/TabIcons";
import Home from "../screen/main/home/Home";
import RegistWork from "../screen/main/regist/RegistWork";
import SearchAddress from "../screen/main/regist/SearchAddress";
import SelectWorkTheme from "../screen/main/regist/SelectWorkTheme";
import Works from "../screen/main/works/Works";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "rgba(0,0,0,0.3)",
          paddingTop: 0,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="home"
              size={22}
              focused={focused}
              iconText="홈"
            />
          ),
        }}
        component={Home}
      />
      <Tabs.Screen
        name="TabRegistWork"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="add-circle"
              size={24}
              focused={focused}
              iconText="작업 등록"
            />
          ),
        }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              name="SelectWorkTheme"
              component={SelectWorkTheme}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegistWork"
              component={RegistWork}
              options={{
                headerBackTitleVisible: false,
                title: "작업 등록",
              }}
            />
            <Stack.Screen
              name="SearchAddress"
              component={SearchAddress}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="Works"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="list"
              size={24}
              focused={focused}
              iconText="내 작업보기"
            />
          ),
        }}
        component={Works}
      />
    </Tabs.Navigator>
  );
}

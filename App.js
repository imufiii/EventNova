

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { load as databaseLoad } from './src/database';
import SettingScreen from './src/Screens/SettingScreen';
import Screen1 from './src/Screens/Screen1';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from "./src/components/Header/Header";
import Tasks from "./src/components/Tasks/Tasks";
import Form from "./src/components/Form/Form";
import { Entypo } from "@expo/vector-icons";



const Tab = createBottomTabNavigator();
const generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};



export default function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [tasks, setTasks] = useState([
    {
      id: generateId(),
      description: "Birthday Party",
      done: true,
      date: "2024-04-16",
      time: "10:00 AM",
    },
    {
      id: generateId(),
      description: "Graduation Ceremony",
      done: false,
      date: "2024-04-17",
      time: "11:30 AM",
    },
    {
      id: generateId(),
      description: "Wedding Event",
      done: false,
      date: "2024-04-18",
      time: "03:00 PM",
    },
  ]);

  const handleAddTask = (taskDescription, taskDone, taskDate, taskTime) => {
    const updatedTasks = [...tasks];
    updatedTasks.push({
      id: generateId(),
      description: taskDescription,
      done: taskDone,
      date: taskDate,
      time: taskTime,
    });
    setTasks(updatedTasks);
  };
  
  const handleStatusChange = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  
  const handleTaskRemoval = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    databaseLoad()
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch(() => {
        Alert.alert(
          'Database Load',
          'There was an error loading the database. Please try again later.'
        );
      })
      .finally(() => {
        SplashScreen.hideAsync();
      });
  }, []);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Header />
        <Tab.Navigator>
       


        <Tab.Screen
            name="List"
            options={{
              headerShown: false,
              title: "List of Events",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="list-ul" size={size} color={color} />
              ),
            }}
          >
            {(props) => (
              <Tasks
                {...props}
                tasks={tasks}
                onStatusChange={handleStatusChange}
                onTaskRemoval={handleTaskRemoval}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Add"
            options={{
              title: "Add Event",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#5494FF",
              },
              tabBarIcon: ({ color, size }) => (
                <Entypo name="add-to-list" size={size} color={color} />
              ),
            }}
          >
            {(props) => <Form {...props} onAddTask={handleAddTask} />}
          </Tab.Screen>
          <Tab.Screen
            name="About"
            component={SettingScreen}
            options={{
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#5494FF",
              },
              title: 'About',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="cog" size={size} color={color} />
                // <FontAwesome name="cog" size={size} color="#008080" />
              ),
            }}
          />
          <Tab.Screen
            name="Screen1"
            component={Screen1}
            options={{
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#5494FF",
              },
              title: 'Events',
              tabBarIcon: ({ color, size }) => (
                
                <FontAwesome5 name="calendar-alt" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}




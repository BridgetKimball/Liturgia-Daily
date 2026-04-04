import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeScreen from '../features/home/HomeScreen';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <HomeScreen />
    </>
  );
}

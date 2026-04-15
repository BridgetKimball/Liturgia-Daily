import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomeScreen from '../features/home/HomeScreen';
import PrayerScreen from '../features/prayer/PrayerScreen';
import ReadingScreen from '../features/reading/ReadingScreen';

export default function App() {
  const [activePage, setActivePage] = React.useState('home');

  const navigate = (page) => {
    setActivePage(page);
  };

  let screen = null;

  if (activePage === 'prayer') {
    screen = <PrayerScreen onNavigate={navigate} />;
  } else if (activePage === 'reading') {
    screen = <ReadingScreen onNavigate={navigate} />;
  } else {
    screen = <HomeScreen onNavigate={navigate} />;
  }

  return (
    <>
      <StatusBar style="light" />
      {screen}
    </>
  );
}

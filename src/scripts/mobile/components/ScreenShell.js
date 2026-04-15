import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenNav from './ScreenNav';

function gradientColors(info) {
  switch (info.color) {
    case 'Purple':
      return ['#3E1C6E', '#1A0A3A'];
    case 'Rose':
      return ['#8B4C66', '#4A1F36'];
    case 'White':
      return ['#7A6030', '#2E1E08'];
    case 'Green':
      return ['#1A4D2B', '#091A0F'];
    case 'Red':
      return ['#7D1A14', '#2E0A08'];
    default:
      return ['#0A1628', '#03070F'];
  }
}

export default function ScreenShell({ info, dateLabel, activePage, onNavigate, children }) {
  const [gradTop, gradBottom] = gradientColors(info);

  return (
    <LinearGradient colors={[gradTop, gradBottom]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.brand}>LITURGIA DAILY</Text>
          <View style={styles.rule} />
          <Text style={styles.date}>{dateLabel}</Text>
          <ScreenNav activePage={activePage} onNavigate={onNavigate} />
          <View style={styles.content}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 26 : 12,
    paddingBottom: 34,
  },
  brand: {
    color: 'rgba(255,255,255,0.93)',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4.2,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  rule: {
    width: 78,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.26)',
    marginTop: 14,
    marginBottom: 12,
  },
  date: {
    color: 'rgba(255,255,255,0.64)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 4,
  },
  content: {
    width: '100%',
    maxWidth: 520,
    alignItems: 'center',
    marginTop: 10,
  },
});

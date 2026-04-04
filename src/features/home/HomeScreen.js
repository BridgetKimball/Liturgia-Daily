import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useMemo } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getLiturgicalInfo } from '../../lib/liturgicalCalendar';
import WidgetPreview from './WidgetPreview';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];

/**
 * Returns a human-readable date string like "Sunday, April 4, 2026".
 */
function formatDate(d) {
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Returns the background gradient colours for a given liturgical colour.
 * We always provide a top-to-bottom gradient with a darker bottom shade.
 */
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

export default function HomeScreen() {
  const today = useMemo(() => new Date(), []);
  const info = useMemo(() => getLiturgicalInfo(today), [today]);

  const [gradTop, gradBottom] = gradientColors(info);

  React.useEffect(() => {
  AsyncStorage.multiSet([
    ['season',   info.season],
    ['color',    info.color],
    ['colorHex', info.colorHex],
  ]);
}, [info]);

  return (
    <LinearGradient colors={[gradTop, gradBottom]} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* App name */}
          <Text style={styles.appTitle}>Liturgia Daily</Text>
          <View style={styles.divider} />

          {/* Cross */}
          <Text style={[styles.cross, { color: info.colorHex }]}>✝</Text>

          {/* Season */}
          <Text style={styles.seasonLabel}>{info.season}</Text>
          {info.note ? (
            <Text style={[styles.noteLabel, { color: info.colorHex }]}>
              {info.note}
            </Text>
          ) : null}

          {/* Color swatch + name */}
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: info.colorHex }]} />
            <Text style={styles.colorText}>{info.color}</Text>
          </View>

          {/* Date */}
          <Text style={styles.dateText}>{formatDate(today)}</Text>

          {/* Description */}
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>{info.description}</Text>
          </View>

          {/* Widget preview */}
          <WidgetPreview info={info} />
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 16,
    paddingBottom: 40,
  },

  // App title
  appTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: 16,
  },

  // Cross icon
  cross: {
    fontSize: 64,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },

  // Season
  seasonLabel: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  noteLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.95,
  },

  // Color row
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  colorSwatch: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  colorText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Date
  dateText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
    letterSpacing: 0.3,
    marginBottom: 28,
  },

  // Description card
  descriptionCard: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  descriptionText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
});

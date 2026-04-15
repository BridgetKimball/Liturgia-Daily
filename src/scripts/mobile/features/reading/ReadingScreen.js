import React, { useEffect, useMemo, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import { getLiturgicalInfo } from '../../lib/liturgicalCalendar';
import { loadDailyReadings, formatDateWithOrdinal } from '../../lib/mobileContent';

const VATICAN_SOURCE_URL = 'https://www.vaticannews.va/en/word-of-the-day.html';

export default function ReadingScreen({ onNavigate = () => {} }) {
  const today = useMemo(() => new Date(), []);
  const info = useMemo(() => getLiturgicalInfo(today), [today]);
  const [readingData, setReadingData] = useState(undefined);

  useEffect(() => {
    let active = true;

    loadDailyReadings(today)
      .then((parsed) => {
        if (active) {
          setReadingData(parsed);
        }
      })
      .catch(() => {
        if (active) setReadingData(null);
      });

    return () => {
      active = false;
    };
  }, [today]);

  const noteSuffix = info.note ? ` - ${info.note}` : '';
  const readingNote =
    readingData === undefined
      ? 'Loading reading...'
      : readingData && readingData.liturgicalDay
        ? readingData.liturgicalDay
        : info.season + noteSuffix;
  const fallbackReading = 'Daily readings are temporarily unavailable. Tap the button below to open Vatican Word of the Day directly.';
  const fallbackGospel = 'Please use the Vatican source page for the complete Gospel text and references for today.';
  const fallbackPope = 'A daily papal reflection is available on the Vatican Word of the Day page.';
  const readingBody = readingData === undefined ? 'Loading reading...' : readingData && readingData.reading ? readingData.reading : fallbackReading;
  const gospelBody = readingData === undefined ? 'Loading Gospel...' : readingData && readingData.gospel ? readingData.gospel : fallbackGospel;
  const popeBody = readingData === undefined ? 'Loading reflection...' : readingData && readingData.pope ? readingData.pope : fallbackPope;

  return (
    <ScreenShell
      info={info}
      dateLabel={formatDateWithOrdinal(today)}
      activePage="reading"
      onNavigate={onNavigate}
    >
      <View style={styles.heroPrimary}>
        <View style={[styles.logoContainer, { backgroundColor: info.darkColorHex }]}> 
          <Image
            source={require('../../../../../Images/Liturgia_Daily_Logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.pageTitle}>Daily Reading</Text>
        <Text style={styles.pageNote}>{readingNote}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Reading of the Day</Text>
        <Text style={styles.cardBody}>{readingBody}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Gospel of the Day</Text>
        <Text style={styles.cardBody}>{gospelBody}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Words of the Popes</Text>
        <Text style={styles.cardBody}>{popeBody}</Text>
      </View>

      <Pressable
        onPress={() => Linking.openURL(VATICAN_SOURCE_URL)}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Open Vatican Word of the Day</Text>
      </Pressable>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  heroPrimary: {
    width: '100%',
    alignItems: 'center',
    marginTop: 4,
  },
  logoContainer: {
    width: 88,
    height: 88,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.38)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  pageNote: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.84)',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  card: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 24,
    marginTop: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(199, 168, 92, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 5,
  },
  cardHeading: {
    marginBottom: 10,
    color: '#4A3916',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cardBody: {
    color: '#5F4A1D',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(245, 239, 213, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(245, 239, 213, 0.28)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonPressed: {
    transform: [{ translateY: 1 }],
  },
  buttonText: {
    color: '#7A5E1F',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
});

import React, { useEffect, useMemo, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import { getLiturgicalInfo } from '../../lib/liturgicalCalendar';
import { getDailyPrayer, getIntention, loadSourcePrayer, formatDateWithOrdinal } from '../../lib/mobileContent';

const PRAYER_SOURCE_URL = 'https://www.heartofthenation.org/prayer-resources/todays-prayer-for-you';

export default function PrayerScreen({ onNavigate = () => {} }) {
  const today = useMemo(() => new Date(), []);
  const info = useMemo(() => getLiturgicalInfo(today), [today]);
  const [sourcePrayer, setSourcePrayer] = useState(undefined);

  useEffect(() => {
    let active = true;

    loadSourcePrayer()
      .then((parsed) => {
        if (active) {
          setSourcePrayer(parsed);
        }
      })
      .catch(() => {
        if (active) setSourcePrayer(null);
      });

    return () => {
      active = false;
    };
  }, []);

  const prayerHeading =
    sourcePrayer === undefined
      ? 'Loading today\'s prayer...'
      : sourcePrayer
        ? sourcePrayer.heading
        : info.note
          ? `${info.season} - ${info.note}`
          : info.season;
  const prayerText =
    sourcePrayer === undefined
      ? 'Loading today\'s prayer...'
      : sourcePrayer
        ? sourcePrayer.prayerText
        : getDailyPrayer(info.season);

  return (
    <ScreenShell
      info={info}
      dateLabel={formatDateWithOrdinal(today)}
      activePage="prayer"
      onNavigate={onNavigate}
    >
      <View style={styles.heroPrimary}>
        <View style={[styles.logoContainer, { backgroundColor: info.darkColorHex }]}> 
          <Image
            source={require('../../../../../Images/Liturgia_Daily_Logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.pageTitle}>Daily Prayer</Text>
        <Text style={styles.pageNote}>{prayerHeading}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.prayerText}>{prayerText}</Text>
      </View>

      <View style={styles.cardSecondary}>
        <Text style={styles.cardHeading}>Prayer Intention</Text>
        <Text style={styles.cardBody}>{getIntention(info.color)}</Text>
      </View>

      <Pressable
        onPress={() => Linking.openURL(PRAYER_SOURCE_URL)}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Open Today's Prayer Resource</Text>
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
    marginTop: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(199, 168, 92, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 5,
  },
  prayerText: {
    color: '#6F5A20',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  cardSecondary: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(199, 168, 92, 0.35)',
  },
  cardHeading: {
    marginBottom: 8,
    color: '#4A3916',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  cardBody: {
    color: '#5F4A1D',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
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

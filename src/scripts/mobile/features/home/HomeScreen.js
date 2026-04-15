import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import { getLiturgicalInfo } from '../../lib/liturgicalCalendar';
import {
  formatDateWithOrdinal,
  formatMonthDayOrdinal,
  getSeasonEndInfo,
  loadSaintFeastDay,
} from '../../lib/mobileContent';
import WidgetPreview from './WidgetPreview';

export default function HomeScreen({ onNavigate = () => {} }) {
  const today = useMemo(() => new Date(), []);
  const info = useMemo(() => getLiturgicalInfo(today), [today]);
  const [saintFeast, setSaintFeast] = useState('');

  useEffect(() => {
    AsyncStorage.multiSet([
      ['season', info.season],
      ['color', info.color],
      ['colorHex', info.colorHex],
    ]);
  }, [info]);

  useEffect(() => {
    let active = true;

    loadSaintFeastDay(today)
      .then((saintName) => {
        if (active) {
          setSaintFeast(saintName || '');
        }
      })
      .catch(() => {
        if (active) {
          setSaintFeast('');
        }
      });

    return () => {
      active = false;
    };
  }, [today]);

  const seasonEndInfo = getSeasonEndInfo(today, info.season);
  const seasonEndLabel = seasonEndInfo ? 'Season ends: ' + formatMonthDayOrdinal(seasonEndInfo.date) : '';

  return (
    <ScreenShell
      info={info}
      dateLabel={formatDateWithOrdinal(today)}
      activePage="home"
      onNavigate={onNavigate}
    >
      <View style={styles.heroPrimary}>
        <View style={[styles.logoContainer, { backgroundColor: info.darkColorHex }]}> 
          <Image
            source={require('../../../../../Images/Liturgia_Daily_Logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.seasonLabel}>{info.season}</Text>
        {info.note ? <Text style={styles.noteLabel}>{info.note}</Text> : null}
        {seasonEndLabel ? <Text style={styles.seasonEnd}>{seasonEndLabel}</Text> : null}
        {saintFeast ? <Text style={styles.saintFeast}>{saintFeast}</Text> : null}
        <View style={styles.colorLine}>
          <View style={[styles.colorDot, { backgroundColor: info.colorHex, borderColor: info.darkColorHex }]} />
          <Text style={styles.colorText}>{info.color}</Text>
        </View>
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionText}>{info.description}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => onNavigate('prayer')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Open Daily Prayer</Text>
        </Pressable>
        <Pressable
          onPress={() => onNavigate('reading')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Open Daily Reading</Text>
        </Pressable>
      </View>

      <WidgetPreview info={info} />
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
  seasonLabel: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  noteLabel: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.84)',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  seasonEnd: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.72)',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  saintFeast: {
    marginTop: 8,
    color: '#F7EAD0',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  colorLine: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    marginRight: 10,
  },
  colorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  descriptionCard: {
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
  descriptionText: {
    color: '#6F5A20',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 26,
  },
  button: {
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

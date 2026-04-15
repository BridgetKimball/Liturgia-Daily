import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

/**
 * WidgetPreview renders a small home-screen-style widget showing the
 * liturgical color and season name.
 */
export default function WidgetPreview({ info }) {
  const { season, note, color, colorHex, darkColorHex } = info;
  const label = note || season;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.widget, { backgroundColor: colorHex }]}>
        <View style={[styles.logoBackground, { backgroundColor: darkColorHex }]}>
          <Image
            source={require('../../../Images/Liturgia_Daily_Logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.appName}>Liturgia</Text>
        <Text style={styles.seasonLabel} numberOfLines={2}>
          {label}
        </Text>
        <View style={[styles.colorDot, { backgroundColor: darkColorHex }]} />
        <Text style={styles.colorName}>{color}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  heading: {
    color: 'rgba(212,175,55,0.75)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  widget: {
    width: 140,
    height: 140,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  logoBackground: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  appName: {
    color: 'rgba(212,175,55,0.85)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  seasonLabel: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 3,
  },
  colorName: {
    color: 'rgba(212,175,55,0.9)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

/**
 * WidgetPreview renders a small home-screen-style widget showing the
 * liturgical color and season name.
 */
export default function WidgetPreview({ info }) {
  const { season, note, color, darkColorHex } = info;
  const label = note || season;

  return (
    <View style={styles.wrapper}>
      <View style={styles.widget}>
        <View style={[styles.logoBackground, { backgroundColor: darkColorHex }]}>
          <Image
            source={require('../../../../../Images/Liturgia_Daily_Logo.png')}
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
    marginTop: 30,
    marginBottom: 16,
  },
  widget: {
    width: 160,
    minHeight: 178,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E8E1C9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
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
    color: '#C5A036',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  seasonLabel: {
    color: '#C5A036',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 4,
  },
  colorName: {
    color: '#C5A036',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

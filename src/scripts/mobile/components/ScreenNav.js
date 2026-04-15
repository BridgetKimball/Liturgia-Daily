import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'prayer', label: 'Daily Prayer' },
  { key: 'reading', label: 'Daily Reading' },
];

export default function ScreenNav({ activePage, onNavigate }) {
  return (
    <View style={styles.navRow}>
      {NAV_ITEMS.map((item) => {
        const isActive = activePage === item.key;

        return (
          <Pressable
            key={item.key}
            onPress={() => onNavigate?.(item.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [
              styles.tab,
              isActive && styles.activeTab,
              pressed && styles.pressedTab,
            ]}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    marginBottom: 8,
  },
  tab: {
    minWidth: 96,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(245, 239, 213, 0.22)',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(199, 168, 81, 0.62)',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  pressedTab: {
    transform: [{ translateY: 1 }],
  },
  tabText: {
    color: '#F5EFD5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  activeTabText: {
    color: '#6F5A20',
  },
});

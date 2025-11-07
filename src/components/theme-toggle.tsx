import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../context/theme-context';
import {lightColors, darkColors} from '../styles/colors';

export const ThemeToggle: React.FC = () => {
  const {themeMode, isDarkMode, setThemeMode} = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  const toggleTheme = () => {
    if (themeMode === 'system') {
      setThemeMode('dark');
    } else if (themeMode === 'dark') {
      setThemeMode('light');
    } else {
      setThemeMode('system');
    }
  };

  const getThemeLabel = () => {
    if (themeMode === 'system') {
      return 'Sistema';
    }
    return themeMode === 'dark' ? 'Escuro' : 'Claro';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      onPress={toggleTheme}
      activeOpacity={0.7}>
      <Text style={[styles.icon, {color: colors.text}]}>
        {isDarkMode ? '🌙' : '☀️'}
      </Text>
      <Text style={[styles.label, {color: colors.text}]}>
        {getThemeLabel()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});


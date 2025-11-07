import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HandwrittenText} from './handwritten-text';
import {ThemeToggle} from './theme-toggle';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';

export const NotebookHeader: React.FC = () => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  return (
    <View style={[styles.container, {backgroundColor: colors.paper}]}>
      <View style={styles.titleContainer}>
        <HandwrittenText size="xlarge" color={colors.penBlue}>
          ✓ Minhas Tarefas
        </HandwrittenText>
        <View style={[styles.underline, {backgroundColor: colors.penBlue, opacity: isDarkMode ? 0.6 : 0.3}]} />
      </View>
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  titleContainer: {
    gap: 4,
  },
  underline: {
    height: 2,
    width: '100%',
    opacity: 0.3,
  },
});


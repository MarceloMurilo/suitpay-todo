import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {lightColors, darkColors} from '../styles/colors';

export const TaskCounter: React.FC = () => {
  const {getTaskStats} = useTasks();
  const stats = getTaskStats();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      <View style={styles.statItem}>
        <Text style={[styles.statValue, {color: colors.text}]}>
          {stats.total}
        </Text>
        <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
          Total
        </Text>
      </View>
      <View style={[styles.divider, {backgroundColor: colors.border}]} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, {color: colors.success}]}>
          {stats.completed}
        </Text>
        <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
          Concluídas
        </Text>
      </View>
      <View style={[styles.divider, {backgroundColor: colors.border}]} />
      <View style={styles.statItem}>
        <Text style={[styles.statValue, {color: colors.primary}]}>
          {stats.pending}
        </Text>
        <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
          Pendentes
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    marginHorizontal: 12,
    opacity: 0.15,
  },
});


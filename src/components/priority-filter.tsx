import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Priority, PRIORITY_LABELS, PRIORITY_COLORS, getPriorityLabel, getPriorityColor} from '../types/task';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';

export const PriorityFilter: React.FC = () => {
  const {priorityFilter, setPriorityFilter} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  const priorities: (Priority | 'all')[] = ['all', 'high', 'medium', 'low'];

  // Funções seguras com fallback
  const safeGetPriorityLabel = (pri: Priority): string => {
    return typeof getPriorityLabel === 'function'
      ? getPriorityLabel(pri)
      : PRIORITY_LABELS?.[pri] || pri;
  };

  const safeGetPriorityColor = (pri: Priority): string => {
    return typeof getPriorityColor === 'function'
      ? getPriorityColor(pri)
      : PRIORITY_COLORS?.[pri] || '#FF9500';
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: colors.penBlack}]}>🎯 Prioridades:</Text>
      <View style={styles.filterRow}>
        {priorities.map(pri => (
          <TouchableOpacity
            key={pri}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  priorityFilter === pri
                    ? pri === 'all'
                      ? colors.penBlue
                      : safeGetPriorityColor(pri as Priority)
                    : colors.paperDark,
                borderColor: pri === 'all' 
                  ? colors.penBlue 
                  : safeGetPriorityColor(pri as Priority),
              },
            ]}
            onPress={() => setPriorityFilter(pri)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    priorityFilter === pri
                      ? '#FFFFFF'
                      : colors.penBlack,
                  fontWeight: priorityFilter === pri ? 'bold' : '500',
                },
              ]}>
              {pri === 'all' ? 'Todas' : safeGetPriorityLabel(pri as Priority)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
});


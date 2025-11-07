import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FilterType} from '../types/task';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {lightColors, darkColors} from '../styles/colors';

export const FilterButtons: React.FC = () => {
  const {filter, setFilter} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  const filters: {label: string; value: FilterType}[] = [
    {label: 'Todas', value: 'all'},
    {label: 'Ativas', value: 'active'},
    {label: 'Concluídas', value: 'completed'},
  ];

  return (
    <View style={styles.container}>
      {filters.map(filterOption => (
        <TouchableOpacity
          key={filterOption.value}
          style={[
            styles.filterButton,
            {
              backgroundColor:
                filter === filterOption.value
                  ? colors.primary
                  : colors.surface,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setFilter(filterOption.value)}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.filterText,
              {
                color:
                  filter === filterOption.value
                    ? '#FFFFFF'
                    : colors.textSecondary,
                fontWeight: filter === filterOption.value ? '600' : '400',
              },
            ]}>
            {filterOption.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
});


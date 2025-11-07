import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import {Category, CATEGORY_LABELS, getCategoryLabel} from '../types/task';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';

export const CategoryFilter: React.FC = () => {
  const {categoryFilter, setCategoryFilter, customCategories} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: colors.penBlack}]}>📁 Categorias:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {/* Opção "Todas" */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: categoryFilter === 'all' ? colors.postItBlue : colors.paperDark,
              borderColor: categoryFilter === 'all' ? colors.penBlue : colors.lines,
            },
          ]}
          onPress={() => setCategoryFilter('all')}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.filterText,
              {
                color: categoryFilter === 'all' ? '#2C3E50' : colors.penBlack,
                fontWeight: categoryFilter === 'all' ? 'bold' : '500',
              },
            ]}>
            Todas
          </Text>
        </TouchableOpacity>

        {/* Categorias Personalizadas */}
        {customCategories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.filterButton,
              {
                backgroundColor: categoryFilter === cat.id ? colors.postItBlue : colors.paperDark,
                borderColor: categoryFilter === cat.id ? colors.penBlue : colors.lines,
              },
            ]}
            onPress={() => setCategoryFilter(cat.id as any)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.filterText,
                {
                  color: categoryFilter === cat.id ? '#2C3E50' : colors.penBlack,
                  fontWeight: categoryFilter === cat.id ? 'bold' : '500',
                },
              ]}>
              {cat.emoji} {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollView: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
});


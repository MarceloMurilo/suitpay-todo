import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {TaskItem} from './task-item';
import {Task} from '../types/task';
import {useTheme} from '../context/theme-context';
import {lightColors, darkColors} from '../styles/colors';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({tasks}) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  if (tasks.length === 0) {
    return (
      <View style={[styles.emptyContainer, {backgroundColor: colors.surface}]}>
        <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
          Nenhuma tarefa encontrada
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TaskItem task={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 16,
  },
  emptyContainer: {
    padding: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});


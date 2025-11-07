import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';

interface QuickAddTaskProps {
  onOpenAdvanced: () => void;
}

export const QuickAddTask: React.FC<QuickAddTaskProps> = ({onOpenAdvanced}) => {
  const {addTask} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;
  const [quickTitle, setQuickTitle] = useState('');

  const handleQuickAdd = () => {
    if (quickTitle.trim() === '') {
      // Se não tem texto, abre o modal avançado
      onOpenAdvanced();
      return;
    }
    
    // Adiciona SEM categoria e prioridade (pode adicionar depois)
    addTask(quickTitle.trim());
    setQuickTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
            color: colors.penBlack,
            borderColor: colors.lines,
          },
        ]}
        placeholder="✏️ Escreva a tarefa..."
        placeholderTextColor={colors.linesStrong}
        value={quickTitle}
        onChangeText={setQuickTitle}
        onSubmitEditing={handleQuickAdd}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, {backgroundColor: colors.penBlue}]}
        onPress={quickTitle.trim() === '' ? onOpenAdvanced : handleQuickAdd}
        activeOpacity={0.7}>
        <View style={styles.plusIcon}>
          <View style={[styles.plusLine, styles.plusVertical, {backgroundColor: '#FFFFFF'}]} />
          <View style={[styles.plusLine, styles.plusHorizontal, {backgroundColor: '#FFFFFF'}]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  plusIcon: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  plusLine: {
    position: 'absolute',
  },
  plusVertical: {
    width: 3,
    height: 20,
    left: 8.5,
    top: 0,
    borderRadius: 2,
  },
  plusHorizontal: {
    width: 20,
    height: 3,
    left: 0,
    top: 8.5,
    borderRadius: 2,
  },
});


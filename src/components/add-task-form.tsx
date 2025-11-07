import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {lightColors, darkColors} from '../styles/colors';
import {
  Category,
  Priority,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  getCategoryLabel,
  getPriorityLabel,
  getPriorityColor,
} from '../types/task';

// Logs para debugar importações
console.log('[add-task-form.tsx] ===== DEBUG IMPORTAÇÕES =====');
console.log('[add-task-form.tsx] getCategoryLabel tipo:', typeof getCategoryLabel);
console.log('[add-task-form.tsx] getCategoryLabel valor:', getCategoryLabel);
console.log('[add-task-form.tsx] getPriorityLabel tipo:', typeof getPriorityLabel);
console.log('[add-task-form.tsx] getPriorityColor tipo:', typeof getPriorityColor);
console.log('[add-task-form.tsx] CATEGORY_LABELS:', CATEGORY_LABELS);
console.log('[add-task-form.tsx] PRIORITY_LABELS:', PRIORITY_LABELS);
console.log('[add-task-form.tsx] PRIORITY_COLORS:', PRIORITY_COLORS);
console.log('[add-task-form.tsx] ============================');

export const AddTaskForm: React.FC = () => {
  console.log('[add-task-form.tsx] Componente AddTaskForm renderizando');
  console.log('[add-task-form.tsx] getCategoryLabel disponível?', typeof getCategoryLabel === 'function');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [priority, setPriority] = useState<Priority>('medium');
  const {addTask} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  const handleAddTask = () => {
    if (title.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite um título para a tarefa.');
      return;
    }
    addTask(title, category, priority);
    setTitle('');
    setCategory('other');
    setPriority('medium');
  };

  const categories: Category[] = ['work', 'personal', 'shopping', 'health', 'other'];
  const priorities: Priority[] = ['high', 'medium', 'low'];

  // Log antes de usar getCategoryLabel
  console.log('[add-task-form.tsx] Antes de renderizar categorias');
  console.log('[add-task-form.tsx] getCategoryLabel é função?', typeof getCategoryLabel === 'function');
  
  // Função wrapper com fallback para segurança
  const safeGetCategoryLabel = (cat: Category): string => {
    console.log('[add-task-form.tsx] safeGetCategoryLabel chamada com:', cat);
    if (typeof getCategoryLabel === 'function') {
      try {
        return getCategoryLabel(cat);
      } catch (error) {
        console.error('[add-task-form.tsx] Erro ao chamar getCategoryLabel:', error);
        return CATEGORY_LABELS?.[cat] || cat;
      }
    } else {
      console.warn('[add-task-form.tsx] getCategoryLabel não é função, usando fallback');
      return CATEGORY_LABELS?.[cat] || cat;
    }
  };

  const safeGetPriorityLabel = (pri: Priority): string => {
    if (typeof getPriorityLabel === 'function') {
      try {
        return getPriorityLabel(pri);
      } catch (error) {
        console.error('[add-task-form.tsx] Erro ao chamar getPriorityLabel:', error);
        return PRIORITY_LABELS?.[pri] || pri;
      }
    } else {
      return PRIORITY_LABELS?.[pri] || pri;
    }
  };

  const safeGetPriorityColor = (pri: Priority): string => {
    if (typeof getPriorityColor === 'function') {
      try {
        return getPriorityColor(pri);
      } catch (error) {
        console.error('[add-task-form.tsx] Erro ao chamar getPriorityColor:', error);
        return PRIORITY_COLORS?.[pri] || '#FF9500';
      }
    } else {
      return PRIORITY_COLORS?.[pri] || '#FF9500';
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholder="Digite uma nova tarefa..."
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleAddTask}
      />

      <Text style={[styles.label, {color: colors.text}]}>Categoria:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.optionButton,
              {
                backgroundColor: category === cat ? colors.primary : colors.background,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setCategory(cat)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.optionText,
                {
                  color: category === cat ? '#FFFFFF' : colors.text,
                },
              ]}>
              {safeGetCategoryLabel(cat)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.label, {color: colors.text}]}>Prioridade:</Text>
      <View style={styles.optionsContainer}>
        {priorities.map(pri => (
          <TouchableOpacity
            key={pri}
            style={[
              styles.priorityButton,
              {
                backgroundColor: priority === pri ? safeGetPriorityColor(pri) : colors.background,
                borderColor: safeGetPriorityColor(pri),
              },
            ]}
            onPress={() => setPriority(pri)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.optionText,
                {
                  color: priority === pri ? '#FFFFFF' : colors.text,
                },
              ]}>
              {safeGetPriorityLabel(pri)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, {backgroundColor: colors.primary}]}
        onPress={handleAddTask}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    marginRight: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

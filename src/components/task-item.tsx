import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Animated,
  ScrollView,
} from 'react-native';
import {Task, Category, Priority, CATEGORY_LABELS, PRIORITY_LABELS, PRIORITY_COLORS, getCategoryLabel, getPriorityLabel, getPriorityColor} from '../types/task';
import {useTasks} from '../context/tasks-context';
import {formatDate} from '../utils/date-utils';
import {useTheme} from '../context/theme-context';
import {lightColors, darkColors} from '../styles/colors';

// Logs para debugar
console.log('[task-item.tsx] ===== DEBUG IMPORTAÇÕES =====');
console.log('[task-item.tsx] getCategoryLabel tipo:', typeof getCategoryLabel);
console.log('[task-item.tsx] getPriorityLabel tipo:', typeof getPriorityLabel);
console.log('[task-item.tsx] getPriorityColor tipo:', typeof getPriorityColor);
console.log('[task-item.tsx] ============================');

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({task}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState<Category>(task.category);
  const [editPriority, setEditPriority] = useState<Priority>(task.priority);
  const {toggleTask, deleteTask, editTask} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Funções seguras com fallback
  const safeGetCategoryLabel = (cat: Category): string => {
    return typeof getCategoryLabel === 'function'
      ? getCategoryLabel(cat)
      : CATEGORY_LABELS?.[cat] || cat;
  };

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

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir a tarefa "${task.title}"?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              deleteTask(task.id);
            });
          },
        },
      ],
    );
  };

  const handleEdit = () => {
    if (editTitle.trim() === '') {
      Alert.alert('Atenção', 'O título da tarefa não pode estar vazio.');
      return;
    }
    editTask(task.id, {
      title: editTitle,
      category: editCategory,
      priority: editPriority,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const categories: Category[] = ['work', 'personal', 'shopping', 'health', 'other'];
  const priorities: Priority[] = ['high', 'medium', 'low'];

  if (isEditing) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}>
        <TextInput
          style={[
            styles.editInput,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          value={editTitle}
          onChangeText={setEditTitle}
          autoFocus
        />

        <Text style={[styles.editLabel, {color: colors.text}]}>Categoria:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.editOptionsContainer}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.editOptionButton,
                {
                  backgroundColor: editCategory === cat ? colors.primary : colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => setEditCategory(cat)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.editOptionText,
                  {
                    color: editCategory === cat ? '#FFFFFF' : colors.text,
                  },
                ]}>
                {safeGetCategoryLabel(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.editLabel, {color: colors.text}]}>Prioridade:</Text>
        <View style={styles.editOptionsContainer}>
          {priorities.map(pri => (
            <TouchableOpacity
              key={pri}
              style={[
                styles.editPriorityButton,
                {
                  backgroundColor: editPriority === pri ? safeGetPriorityColor(pri) : colors.background,
                  borderColor: safeGetPriorityColor(pri),
                },
              ]}
              onPress={() => setEditPriority(pri)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.editOptionText,
                  {
                    color: editPriority === pri ? '#FFFFFF' : colors.text,
                  },
                ]}>
                {safeGetPriorityLabel(pri)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.editActions}>
          <TouchableOpacity
            style={[styles.editButton, {backgroundColor: colors.success}]}
            onPress={handleEdit}>
            <Text style={styles.editButtonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editButton, {backgroundColor: colors.danger}]}
            onPress={handleCancelEdit}>
            <Text style={styles.editButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: fadeAnim,
        },
      ]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleTask(task.id)}
        activeOpacity={0.7}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: task.completed
                ? colors.success
                : 'transparent',
              borderColor: task.completed ? colors.success : colors.border,
            },
          ]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.title,
              {
                color: task.completed ? colors.completed : colors.text,
                textDecorationLine: task.completed ? 'line-through' : 'none',
              },
            ]}>
            {task.title}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              {
                backgroundColor: safeGetPriorityColor(task.priority),
              },
            ]}>
            <Text style={styles.priorityBadgeText}>
              {safeGetPriorityLabel(task.priority)}
            </Text>
          </View>
        </View>
        <View style={styles.metaRow}>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}>
            <Text style={[styles.categoryBadgeText, {color: colors.textSecondary}]}>
              {safeGetCategoryLabel(task.category)}
            </Text>
          </View>
          <Text style={[styles.date, {color: colors.textSecondary}]}>
            {formatDate(task.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: colors.primary}]}
          onPress={() => setIsEditing(true)}
          activeOpacity={0.7}>
          <Text style={styles.actionButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: colors.danger}]}
          onPress={handleDelete}
          activeOpacity={0.7}>
          <Text style={styles.actionButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 16,
  },
  editInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  editLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 4,
  },
  editOptionsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  editOptionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    marginRight: 8,
  },
  editPriorityButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    marginRight: 8,
  },
  editOptionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

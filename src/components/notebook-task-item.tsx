import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Task} from '../types/task';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';
import {HandDrawnCheckbox} from './hand-drawn-checkbox';
import {HandwrittenText} from './handwritten-text';
import {formatDate} from '../utils/date-utils';
import {TaskDetailsModal} from './task-details-modal';

interface NotebookTaskItemProps {
  task: Task;
}

export const NotebookTaskItem: React.FC<NotebookTaskItemProps> = ({task}) => {
  const {toggleTask, customCategories} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;
  const [detailsVisible, setDetailsVisible] = useState(false);

  // Buscar categoria personalizada
  const getCategoryDisplay = () => {
    if (!task.category) return '';
    
    const customCat = customCategories.find(cat => cat.id === task.category);
    if (customCat) {
      return `${customCat.emoji} ${customCat.name}`;
    }
    // Fallback para categorias padrão
    const defaultCategories: Record<string, string> = {
      work: '💼 Trabalho',
      personal: '🏠 Pessoal',
      shopping: '🛒 Compras',
      health: '⚕️ Saúde',
      other: '📌 Outros',
    };
    return defaultCategories[task.category] || '📌 Outros';
  };

  const getPriorityDisplay = () => {
    if (!task.priority) return '';
    
    const priorities: Record<string, string> = {
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
    };
    return priorities[task.priority] || 'Média';
  };

  const getPriorityColor = () => {
    if (!task.priority) return colors.lines;
    
    const colorMap: Record<string, string> = {
      high: colors.priorityHigh,
      medium: colors.priorityMedium,
      low: colors.priorityLow,
    };
    return colorMap[task.priority] || colors.priorityMedium;
  };

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.taskCard, {
          backgroundColor: isDarkMode ? '#252525' : '#FFFFFF',
          borderColor: colors.lines,
        }]}>
          <View style={styles.content}>
            {/* Checkbox - Clique para completar */}
            <HandDrawnCheckbox
              checked={task.completed}
              onPress={() => toggleTask(task.id)}
            />

            {/* Conteúdo da tarefa - Clique no título para ver detalhes */}
            <TouchableOpacity
              style={styles.taskContent}
              onPress={() => setDetailsVisible(true)}
              activeOpacity={0.7}>
              {/* Título da tarefa */}
              <HandwrittenText
                size="medium"
                color={task.completed ? colors.linesStrong : colors.penBlack}
                style={[styles.title, task.completed && styles.completedText]}>
                {task.title}
              </HandwrittenText>

              {/* Preview da descrição se existir */}
              {task.description && (
                <Text 
                  style={[styles.descriptionPreview, {color: colors.lines}]}
                  numberOfLines={1}>
                  {task.description}
                </Text>
              )}

              {/* Metadados: Categoria, Prioridade, Data */}
              <View style={styles.metaRow}>
                {/* Categoria - mini post-it (só aparece se definida) */}
                {task.category && (
                  <View
                    style={[
                      styles.miniPostIt,
                      {backgroundColor: colors.postItBlue},
                    ]}>
                    <Text style={styles.miniPostItText}>
                      {getCategoryDisplay()}
                    </Text>
                  </View>
                )}

                {/* Prioridade - marcador colorido (só aparece se definida) */}
                {task.priority && (
                  <View
                    style={[
                      styles.priorityMarker,
                      {backgroundColor: getPriorityColor()},
                    ]}>
                    <Text style={styles.priorityText}>
                      {getPriorityDisplay()}
                    </Text>
                  </View>
                )}

                {/* Data */}
                <Text style={[styles.date, {color: isDarkMode ? '#9CA3AF' : colors.lines}]}>
                  📅 {formatDate(task.createdAt)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal de Detalhes - abre ao clicar no título */}
      <TaskDetailsModal
        visible={detailsVisible}
        task={task}
        onClose={() => setDetailsVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  taskCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  taskContent: {
    flex: 1,
    gap: 8,
  },
  title: {
    lineHeight: 24,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  descriptionPreview: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: -4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  miniPostIt: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    transform: [{rotate: '-1deg'}],
  },
  miniPostItText: {
    fontSize: 11,
    color: '#2C3E50',
    fontWeight: '600',
  },
  priorityMarker: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 11,
  },
});

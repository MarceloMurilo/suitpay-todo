import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {Task, Category, Priority, CATEGORY_LABELS, PRIORITY_LABELS, getCategoryLabel, getPriorityLabel, getPriorityColor} from '../types/task';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';
import {HandwrittenText} from './handwritten-text';
import {formatDate} from '../utils/date-utils';

interface TaskDetailsModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  visible,
  task,
  onClose,
}) => {
  const {editTask, deleteTask, toggleTask, customCategories} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedCategory, setEditedCategory] = useState<string>('');
  const [editedPriority, setEditedPriority] = useState<string>('');

  React.useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description || '');
      setEditedCategory(task.category || '');
      setEditedPriority(task.priority || '');
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      Alert.alert('Atenção', 'O título não pode estar vazio.');
      return;
    }
    editTask(task.id, {
      title: editedTitle,
      description: editedDescription.trim() || undefined,
      category: editedCategory ? (editedCategory as Category) : undefined,
      priority: editedPriority ? (editedPriority as Priority) : undefined,
    });
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Tarefa',
      `Tem certeza que deseja excluir "${task.title}"?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            onClose();
          },
        },
      ],
    );
  };

  const priorities: Priority[] = ['high', 'medium', 'low'];

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
    return typeof getPriorityColor === 'function' ? getPriorityColor(pri) : '#FF9500';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, {backgroundColor: colors.paper}]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <HandwrittenText size="xlarge" color={colors.penBlue}>
                📋 Detalhes da Tarefa
              </HandwrittenText>
              <Text style={[styles.dateText, {color: isDarkMode ? '#9CA3AF' : colors.lines}]}>
                Criada {formatDate(task.createdAt)}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, {color: colors.penRed}]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* Status da tarefa */}
            <TouchableOpacity
              style={[
                styles.statusBadge,
                {
                  backgroundColor: task.completed ? colors.completed : colors.pending,
                },
              ]}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}>
              <Text style={styles.statusText}>
                {task.completed ? '✓ Concluída' : '○ Pendente'}
              </Text>
            </TouchableOpacity>

            {isEditing ? (
              <>
                {/* Edição de Título */}
                <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
                  📝 Título
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                      color: colors.penBlack,
                      borderColor: colors.lines,
                    },
                  ]}
                  value={editedTitle}
                  onChangeText={setEditedTitle}
                  autoFocus
                />

                {/* Edição de Descrição */}
                <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
                  📄 Descrição (opcional)
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.descriptionInput,
                    {
                      backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                      color: colors.penBlack,
                      borderColor: colors.lines,
                    },
                  ]}
                  value={editedDescription}
                  onChangeText={setEditedDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholder="Adicione detalhes..."
                  placeholderTextColor={colors.lines}
                />

                {/* Categoria */}
                <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
                  📁 Categoria (opcional)
                </Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.horizontalScroll}>
                  {/* Opção "Nenhuma" */}
                  <TouchableOpacity
                    style={[
                      styles.optionChip,
                      {
                        backgroundColor:
                          editedCategory === '' ? colors.postItYellow : colors.paperDark,
                        borderColor: editedCategory === '' ? colors.penBlue : colors.lines,
                      },
                    ]}
                    onPress={() => setEditedCategory('')}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.optionChipText,
                        {
                          color: editedCategory === '' ? '#2C3E50' : colors.penBlack,
                        },
                      ]}>
                      Nenhuma
                    </Text>
                  </TouchableOpacity>
                  
                  {customCategories.map(cat => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.optionChip,
                        {
                          backgroundColor:
                            editedCategory === cat.id ? colors.postItBlue : colors.paperDark,
                          borderColor: editedCategory === cat.id ? colors.penBlue : colors.lines,
                        },
                      ]}
                      onPress={() => setEditedCategory(cat.id)}
                      activeOpacity={0.7}>
                      <Text
                        style={[
                          styles.optionChipText,
                          {
                            color: editedCategory === cat.id ? '#2C3E50' : colors.penBlack,
                          },
                        ]}>
                        {cat.emoji} {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Prioridade */}
                <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
                  🎯 Prioridade (opcional)
                </Text>
                <View style={styles.priorityContainer}>
                  {/* Opção "Nenhuma" */}
                  <TouchableOpacity
                    style={[
                      styles.priorityChip,
                      {
                        backgroundColor: colors.paperDark,
                        borderColor: editedPriority === '' ? colors.penBlue : colors.lines,
                      },
                    ]}
                    onPress={() => setEditedPriority('')}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.priorityChipText,
                        {
                          color: colors.penBlack,
                          fontWeight: editedPriority === '' ? 'bold' : 'normal',
                        },
                      ]}>
                      Nenhuma
                    </Text>
                  </TouchableOpacity>
                  
                  {priorities.map(pri => (
                    <TouchableOpacity
                      key={pri}
                      style={[
                        styles.priorityChip,
                        {
                          backgroundColor:
                            editedPriority === pri
                              ? safeGetPriorityColor(pri)
                              : colors.paperDark,
                          borderColor: safeGetPriorityColor(pri),
                        },
                      ]}
                      onPress={() => setEditedPriority(pri)}
                      activeOpacity={0.7}>
                      <Text
                        style={[
                          styles.priorityChipText,
                          {
                            color: editedPriority === pri ? '#FFFFFF' : colors.penBlack,
                          },
                        ]}>
                        {safeGetPriorityLabel(pri)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <>
                {/* Visualização */}
                <View style={styles.section}>
                  <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
                    📝 Título
                  </Text>
                  <HandwrittenText
                    size="large"
                    color={colors.penBlack}
                    style={task.completed && styles.completedText}>
                    {task.title}
                  </HandwrittenText>
                </View>

                {task.description && (
                  <View style={styles.section}>
                    <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
                      📄 Descrição
                    </Text>
                    <Text style={[styles.descriptionText, {color: colors.penBlack}]}>
                      {task.description}
                    </Text>
                  </View>
                )}

                <View style={styles.metaContainer}>
                  {task.category && (
                    <View style={styles.metaItem}>
                      <Text style={[styles.metaLabel, {color: colors.lines}]}>
                        📁 Categoria
                      </Text>
                      <View
                        style={[
                          styles.metaBadge,
                          {backgroundColor: colors.paperDark, borderColor: colors.lines},
                        ]}>
                        <Text style={[styles.metaText, {color: colors.penBlack}]}>
                          {safeGetCategoryLabel(task.category)}
                        </Text>
                      </View>
                    </View>
                  )}

                  {task.priority && (
                    <View style={styles.metaItem}>
                      <Text style={[styles.metaLabel, {color: colors.lines}]}>
                        🎯 Prioridade
                      </Text>
                      <View
                        style={[
                          styles.metaBadge,
                          {backgroundColor: safeGetPriorityColor(task.priority)},
                        ]}>
                        <Text style={[styles.metaText, {color: '#FFFFFF'}]}>
                          {safeGetPriorityLabel(task.priority)}
                        </Text>
                      </View>
                    </View>
                  )}

                  {!task.category && !task.priority && (
                    <Text style={[styles.noMetaText, {color: colors.lines}]}>
                      💡 Clique em "Editar" para adicionar categoria e prioridade
                    </Text>
                  )}
                </View>
              </>
            )}
          </ScrollView>

          {/* Footer com botões */}
          <View style={styles.modalFooter}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.paperDark}]}
                  onPress={() => setIsEditing(false)}
                  activeOpacity={0.7}>
                  <Text style={[styles.buttonText, {color: colors.penBlack}]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton, {backgroundColor: colors.penBlue}]}
                  onPress={handleSave}
                  activeOpacity={0.7}>
                  <Text style={[styles.buttonText, {color: '#FFFFFF'}]}>
                    ✓ Salvar
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colors.penRed}]}
                  onPress={handleDelete}
                  activeOpacity={0.7}>
                  <Text style={[styles.buttonText, {color: '#FFFFFF'}]}>
                    🗑 Excluir
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.primaryButton, {backgroundColor: colors.penBlue}]}
                  onPress={() => setIsEditing(true)}
                  activeOpacity={0.7}>
                  <Text style={[styles.buttonText, {color: '#FFFFFF'}]}>
                    ✏️ Editar
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 24,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerLeft: {
    flex: 1,
  },
  dateText: {
    fontSize: 13,
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: '300',
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.7,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  descriptionInput: {
    minHeight: 100,
    marginBottom: 20,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  optionChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  priorityChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  priorityChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  metaBadge: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noMetaText: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    flex: 1.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


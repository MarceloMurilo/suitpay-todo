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
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';
import {
  Category,
  Priority,
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  getCategoryLabel,
  getPriorityLabel,
  getPriorityColor,
} from '../types/task';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({visible, onClose}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const {addTask, customCategories} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  const handleAddTask = () => {
    if (title.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite um título para a tarefa.');
      return;
    }
    addTask(
      title, 
      category ? (category as Category) : undefined, 
      priority ? (priority as Priority) : undefined, 
      description
    );
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('');
    onClose();
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
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, {color: colors.penBlack}]}>
              ✏️ Nova Tarefa
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, {color: colors.penRed}]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
              📝 Título da Tarefa
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
              placeholder="O que precisa ser feito?"
              placeholderTextColor={colors.lines}
              value={title}
              onChangeText={setTitle}
              autoFocus
            />

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
              placeholder="Detalhes adicionais sobre a tarefa..."
              placeholderTextColor={colors.lines}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
              📁 Categoria (opcional)
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={styles.optionsGrid}>
              {/* Opção "Nenhuma" */}
              <TouchableOpacity
                style={[
                  styles.optionChip,
                  {
                    backgroundColor:
                      category === '' ? colors.postItYellow : colors.paperDark,
                    borderColor: category === '' ? colors.penBlue : colors.lines,
                  },
                ]}
                onPress={() => setCategory('')}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.optionChipText,
                    {
                      color: category === '' ? '#2C3E50' : colors.penBlack,
                    },
                  ]}>
                  Nenhuma
                </Text>
              </TouchableOpacity>
              
              {/* Categorias personalizadas */}
              {customCategories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.optionChip,
                    {
                      backgroundColor:
                        category === cat.id ? colors.postItBlue : colors.paperDark,
                      borderColor: category === cat.id ? colors.penBlue : colors.lines,
                    },
                  ]}
                  onPress={() => setCategory(cat.id)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.optionChipText,
                      {
                        color: category === cat.id ? '#2C3E50' : colors.penBlack,
                      },
                    ]}>
                    {cat.emoji} {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
              🎯 Prioridade (opcional)
            </Text>
            <View style={styles.priorityContainer}>
              {/* Opção "Nenhuma" */}
              <TouchableOpacity
                style={[
                  styles.priorityChip,
                  {
                    backgroundColor:
                      priority === '' ? colors.paperDark : colors.paperDark,
                    borderColor: priority === '' ? colors.penBlue : colors.lines,
                  },
                ]}
                onPress={() => setPriority('')}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.priorityChipText,
                    {
                      color: colors.penBlack,
                      fontWeight: priority === '' ? 'bold' : 'normal',
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
                        priority === pri
                          ? safeGetPriorityColor(pri)
                          : colors.paperDark,
                      borderColor: safeGetPriorityColor(pri),
                    },
                  ]}
                  onPress={() => setPriority(pri)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.priorityChipText,
                      {
                        color: priority === pri ? '#FFFFFF' : colors.penBlack,
                      },
                    ]}>
                    {safeGetPriorityLabel(pri)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.cancelButton, {backgroundColor: colors.paperDark}]}
              onPress={onClose}
              activeOpacity={0.7}>
              <Text style={[styles.cancelButtonText, {color: colors.penBlack}]}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, {backgroundColor: colors.penBlue}]}
              onPress={handleAddTask}
              activeOpacity={0.7}>
              <Text style={styles.addButtonText}>✓ Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: '300',
  },
  modalBody: {
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 56,
  },
  descriptionInput: {
    minHeight: 100,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  horizontalScroll: {
    marginBottom: 24,
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
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  priorityChip: {
    flex: 1,
    minWidth: 90,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  priorityChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


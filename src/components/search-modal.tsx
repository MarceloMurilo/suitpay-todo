import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';
import {HandwrittenText} from './handwritten-text';
import {CategoryFilter} from './category-filter';
import {PriorityFilter} from './priority-filter';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({visible, onClose}) => {
  const {searchQuery, setSearchQuery, categoryFilter, priorityFilter, setCategoryFilter, setPriorityFilter} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  const handleClearAll = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setPriorityFilter('all');
  };

  const hasActiveFilters = searchQuery !== '' || categoryFilter !== 'all' || priorityFilter !== 'all';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <View style={[styles.modalContent, {backgroundColor: colors.paper}]}>
          <View style={styles.header}>
            <HandwrittenText size="xlarge" color={colors.penBlue}>
              🔍 Buscar e Filtrar
            </HandwrittenText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeIcon, {color: colors.penRed}]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Campo de Busca */}
            <View style={styles.section}>
              <Text style={[styles.sectionLabel, {color: colors.penBlack}]}>
                📝 Buscar por Título
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
                placeholder="Digite para buscar..."
                placeholderTextColor={colors.linesStrong}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>

            {/* Filtro de Categoria */}
            <View style={styles.section}>
              <CategoryFilter />
            </View>

            {/* Filtro de Prioridade */}
            <View style={styles.section}>
              <PriorityFilter />
            </View>

            {/* Botão limpar todos os filtros */}
            {hasActiveFilters && (
              <TouchableOpacity
                style={[styles.clearAllButton, {backgroundColor: colors.paperDark}]}
                onPress={handleClearAll}>
                <Text style={[styles.clearAllButtonText, {color: colors.penRed}]}>
                  ✕ Limpar Tudo
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>

          {/* Botão Fechar */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.doneButton, {backgroundColor: colors.penBlue}]}
              onPress={onClose}>
              <Text style={styles.doneButtonText}>✓ Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 28,
    fontWeight: '300',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    maxHeight: '70%',
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  clearAllButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  clearAllButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 2,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  doneButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


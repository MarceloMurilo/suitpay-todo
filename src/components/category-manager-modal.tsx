import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import {useTheme} from '../context/theme-context';
import {useTasks} from '../context/tasks-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';
import {HandwrittenText} from './handwritten-text';

interface CategoryManagerModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  visible,
  onClose,
}) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;
  const {customCategories, addCustomCategory, deleteCustomCategory} = useTasks();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryEmoji, setNewCategoryEmoji] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') {
      Alert.alert('Atenção', 'Digite um nome para a categoria.');
      return;
    }

    addCustomCategory(newCategoryName, newCategoryEmoji);
    setNewCategoryName('');
    setNewCategoryEmoji('');
    Alert.alert('✓', 'Categoria adicionada com sucesso!');
  };

  const handleDeleteCategory = (id: string) => {
    Alert.alert(
      'Apagar categoria',
      'Tem certeza que deseja apagar esta categoria?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => {
            deleteCustomCategory(id);
          },
        },
      ]
    );
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
            <View>
              <HandwrittenText size="xlarge" color={colors.penBlue}>
                📁 Gerenciar Categorias
              </HandwrittenText>
              <HandwrittenText size="small" color={colors.lines}>
                Personalize suas categorias
              </HandwrittenText>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, {color: colors.penRed}]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            {/* Adicionar nova categoria */}
            <View style={styles.addSection}>
              <HandwrittenText size="medium" color={colors.penBlack} style={{fontWeight: '600', marginBottom: 16}}>
                ➕ Nova Categoria
              </HandwrittenText>
              
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                    color: colors.penBlack,
                    borderColor: colors.lines,
                    marginBottom: 12,
                  },
                ]}
                placeholder="Nome da categoria (ex: Academia)"
                placeholderTextColor={colors.lines}
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />

              <View style={styles.inputRow}>
                <TextInput
                  style={[
                    styles.emojiInput,
                    {
                      backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
                      color: colors.penBlack,
                      borderColor: colors.lines,
                    },
                  ]}
                  placeholder="Emoji (opcional) 😊"
                  placeholderTextColor={colors.lines}
                  value={newCategoryEmoji}
                  onChangeText={setNewCategoryEmoji}
                  maxLength={2}
                />
                <TouchableOpacity
                  style={[styles.addButton, {backgroundColor: colors.penBlue}]}
                  onPress={handleAddCategory}>
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>

              <HandwrittenText size="small" color={colors.lines} style={{marginTop: 8}}>
                💡 Dica: Cole um emoji do teclado ou deixe em branco
              </HandwrittenText>
            </View>

            {/* Lista de categorias */}
            <HandwrittenText size="medium" color={colors.penBlack} style={[styles.listTitle, {fontWeight: '600'}]}>
              📋 Suas Categorias ({customCategories.length})
            </HandwrittenText>
            <FlatList
              data={customCategories}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View
                  style={[
                    styles.categoryItem,
                    {
                      backgroundColor: isDarkMode ? '#2A2A2A' : colors.postItYellow,
                      borderColor: colors.lines,
                    },
                  ]}>
                  <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                  <HandwrittenText size="medium" color="#2C3E50" style={styles.categoryName}>
                    {item.name}
                  </HandwrittenText>
                  <TouchableOpacity
                    onPress={() => handleDeleteCategory(item.id)}
                    style={styles.deleteButton}>
                    <Text style={{color: colors.penRed, fontSize: 24}}>🗑</Text>
                  </TouchableOpacity>
                </View>
              )}
              style={styles.list}
            />
          </View>

          <View style={styles.modalFooter}>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 24,
    width: '100%',
    height: '85%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: '300',
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingTop: 20,
    flex: 1,
  },
  addSection: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
  },
  emojiInput: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listTitle: {
    marginBottom: 16,
    marginTop: 8,
  },
  list: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    flex: 1,
    fontSize: 18,
  },
  deleteButton: {
    padding: 8,
  },
  modalFooter: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  doneButton: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';
import {HandwrittenText} from './handwritten-text';
import {ThemeToggle} from './theme-toggle';

interface SidebarMenuProps {
  visible: boolean;
  onClose: () => void;
  onOpenCategoryManager: () => void;
  onOpenFilters: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  visible,
  onClose,
  onOpenCategoryManager,
  onOpenFilters,
}) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

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
        
        <View style={[styles.sidebar, {backgroundColor: colors.paper}]}>
          {/* Header */}
          <View style={[styles.header, {borderBottomColor: colors.lines}]}>
            <HandwrittenText size="xlarge" color={colors.penBlue}>
              ⚙️ Menu
            </HandwrittenText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeIcon, {color: colors.penRed}]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Tema */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, {color: isDarkMode ? '#9CA3AF' : '#6B7280'}]}>
                APARÊNCIA
              </Text>
              <View style={[styles.menuItem, {backgroundColor: isDarkMode ? '#252525' : '#FFFFFF'}]}>
                <Text style={styles.menuIcon}>🎨</Text>
                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuTitle, {color: isDarkMode ? '#F3F4F6' : '#1F2937'}]}>
                    Tema
                  </Text>
                  <Text style={[styles.menuSubtitle, {color: isDarkMode ? '#9CA3AF' : '#6B7280'}]}>
                    {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
                  </Text>
                </View>
                <ThemeToggle />
              </View>
            </View>

            {/* Gerenciar */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, {color: isDarkMode ? '#9CA3AF' : '#6B7280'}]}>
                PERSONALIZAR
              </Text>
              
              <TouchableOpacity
                style={[styles.menuItem, {backgroundColor: isDarkMode ? '#252525' : '#FFFFFF'}]}
                onPress={() => {
                  onClose();
                  onOpenCategoryManager();
                }}
                activeOpacity={0.7}>
                <Text style={styles.menuIcon}>📁</Text>
                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuTitle, {color: isDarkMode ? '#F3F4F6' : '#1F2937'}]}>
                    Categorias
                  </Text>
                  <Text style={[styles.menuSubtitle, {color: isDarkMode ? '#9CA3AF' : '#6B7280'}]}>
                    Criar e gerenciar categorias
                  </Text>
                </View>
                <Text style={{fontSize: 20, color: isDarkMode ? '#9CA3AF' : '#9CA3AF'}}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, {backgroundColor: isDarkMode ? '#252525' : '#FFFFFF'}]}
                onPress={() => {
                  onClose();
                  onOpenFilters();
                }}
                activeOpacity={0.7}>
                <Text style={styles.menuIcon}>🔍</Text>
                <View style={styles.menuTextContainer}>
                  <Text style={[styles.menuTitle, {color: isDarkMode ? '#F3F4F6' : '#1F2937'}]}>
                    Buscar e Filtrar
                  </Text>
                  <Text style={[styles.menuSubtitle, {color: isDarkMode ? '#9CA3AF' : '#6B7280'}]}>
                    Busca, categoria e prioridade
                  </Text>
                </View>
                <Text style={{fontSize: 20, color: isDarkMode ? '#9CA3AF' : '#9CA3AF'}}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Info */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, {color: isDarkMode ? '#9CA3AF' : '#6B7280'}]}>
                SOBRE
              </Text>
              <View style={[styles.infoBox, {backgroundColor: colors.postItYellow}]}>
                <Text style={[styles.infoText, {color: '#2C3E50'}]}>
                  📓 Caderno de Tarefas v1.0
                </Text>
                <Text style={[styles.infoText, {color: '#2C3E50', marginTop: 4}]}>
                  Sua lista de tarefas estilo caderno
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    width: 320,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
    borderBottomWidth: 2,
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    fontSize: 28,
    fontWeight: '300',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    fontSize: 11,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  infoText: {
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    gap: 16,
  },
  menuIcon: {
    fontSize: 28,
  },
  menuTextContainer: {
    flex: 1,
  },
  infoBox: {
    padding: 16,
    borderRadius: 8,
    transform: [{rotate: '-1deg'}],
  },
});


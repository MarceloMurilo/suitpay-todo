import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider, useTheme} from '../context/theme-context';
import {TasksProvider} from '../context/tasks-context';
import {AddTaskModal} from '../components/add-task-modal';
import {CategoryManagerModal} from '../components/category-manager-modal';
import {SidebarMenu} from '../components/sidebar-menu';
import {QuickAddTask} from '../components/quick-add-task';
import {SearchModal} from '../components/search-modal';
import {useTasks} from '../context/tasks-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';
import {NotebookBackground} from '../components/notebook-background';
import {NotebookTaskItem} from '../components/notebook-task-item';
import {HandwrittenText} from '../components/handwritten-text';

const HomeScreenContent: React.FC = () => {
  const {filteredTasks, filter, setFilter, getTaskStats} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [categoryManagerVisible, setCategoryManagerVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const stats = getTaskStats();

  return (
    <View style={styles.container}>
      {/* Fundo de papel pautado */}
      <NotebookBackground />
      
      <View style={styles.contentContainer}>
        {/* Cabeçalho manuscrito */}
        <View style={[styles.topBar, {backgroundColor: colors.paper}]}>
          {/* Ícone de busca minimalista */}
          <TouchableOpacity 
            onPress={() => setSearchVisible(true)}
            style={styles.searchIcon}
            activeOpacity={0.7}>
            <Text style={{fontSize: 20}}>🔍</Text>
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={[styles.appTitle, {color: colors.penBlue}]}>
              Caderno de Tarefas
            </Text>
            <View style={[styles.underline, {backgroundColor: colors.penBlue}]} />
          </View>

          {/* Menu hamburger à DIREITA */}
          <TouchableOpacity 
            onPress={() => setSidebarVisible(true)}
            style={styles.menuButton}
            activeOpacity={0.7}>
            <View style={styles.hamburger}>
              <View style={[styles.hamburgerLine, {backgroundColor: colors.penBlue}]} />
              <View style={[styles.hamburgerLine, {backgroundColor: colors.penBlue}]} />
              <View style={[styles.hamburgerLine, {backgroundColor: colors.penBlue}]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Contador + Filtros Combinados - estilo post-its clicáveis */}
        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={[
              styles.statPostIt,
              {backgroundColor: colors.postItYellow},
              filter === 'all' && styles.activePostIt,
            ]}
            onPress={() => setFilter('all')}
            activeOpacity={0.7}>
            <HandwrittenText size="xlarge" color="#2C3E50" style={{fontWeight: 'bold'}}>
              {stats.total}
            </HandwrittenText>
            <HandwrittenText size="small" color="#2C3E50" style={{fontWeight: '600'}}>
              Todas
            </HandwrittenText>
            {filter === 'all' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statPostIt,
              {backgroundColor: colors.postItGreen},
              filter === 'completed' && styles.activePostIt,
            ]}
            onPress={() => setFilter('completed')}
            activeOpacity={0.7}>
            <HandwrittenText size="xlarge" color="#166534" style={{fontWeight: 'bold'}}>
              {stats.completed}
            </HandwrittenText>
            <HandwrittenText size="small" color="#166534" style={{fontWeight: '600'}}>
              Concluídas
            </HandwrittenText>
            {filter === 'completed' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statPostIt,
              {backgroundColor: colors.postItPink},
              filter === 'active' && styles.activePostIt,
            ]}
            onPress={() => setFilter('active')}
            activeOpacity={0.7}>
            <HandwrittenText size="xlarge" color="#9F1239" style={{fontWeight: 'bold'}}>
              {stats.pending}
            </HandwrittenText>
            <HandwrittenText size="small" color="#9F1239" style={{fontWeight: '600'}}>
              Ativas
            </HandwrittenText>
            {filter === 'active' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Input Rápido de Adicionar Tarefa */}
        <View style={styles.quickAddBar}>
          <QuickAddTask onOpenAdvanced={() => setAddModalVisible(true)} />
        </View>

        {/* Lista de tarefas */}
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => <NotebookTaskItem task={item} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <HandwrittenText size="large" color={colors.lines}>
                📝 Nenhuma tarefa por aqui...
              </HandwrittenText>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <AddTaskModal
          visible={addModalVisible}
          onClose={() => setAddModalVisible(false)}
        />

        <CategoryManagerModal
          visible={categoryManagerVisible}
          onClose={() => setCategoryManagerVisible(false)}
        />

        <SidebarMenu
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          onOpenCategoryManager={() => setCategoryManagerVisible(true)}
          onOpenFilters={() => setSearchVisible(true)}
        />

        <SearchModal
          visible={searchVisible}
          onClose={() => setSearchVisible(false)}
        />
      </View>
    </View>
  );
};

const HomeScreenWithTheme: React.FC = () => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: colors.paper}]}
      edges={['top']}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.paper}
      />
      <TasksProvider>
        <HomeScreenContent />
      </TasksProvider>
    </SafeAreaView>
  );
};

export const HomeScreen: React.FC = () => {
  return (
    <ThemeProvider>
      <HomeScreenWithTheme />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuButton: {
    padding: 8,
  },
  hamburger: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    height: 3,
    borderRadius: 2,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'serif',
  },
  underline: {
    height: 2,
    width: '60%',
    opacity: 0.3,
    marginTop: 4,
  },
  searchIcon: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    gap: 12,
  },
  statPostIt: {
    flex: 1,
    padding: 16,
    borderRadius: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    borderTopWidth: 15,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
    transform: [{rotate: '2deg'}],
    position: 'relative',
  },
  activePostIt: {
    transform: [{rotate: '0deg'}, {scale: 1.05}],
    elevation: 10,
    borderWidth: 2,
    borderColor: '#2C3E50',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 30,
    height: 3,
    backgroundColor: '#2C3E50',
    borderRadius: 2,
  },
  quickAddBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
});

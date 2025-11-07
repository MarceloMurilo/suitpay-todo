import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useTasks} from '../context/tasks-context';
import {useTheme} from '../context/theme-context';
import {lightColors, darkColors} from '../styles/colors';

export const SearchBar: React.FC = () => {
  const {searchQuery, setSearchQuery} = useTasks();
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholder="Buscar tarefas..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
});


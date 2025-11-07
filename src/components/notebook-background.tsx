import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';

const {height} = Dimensions.get('window');

export const NotebookBackground: React.FC = () => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  // Gerar linhas horizontais (papel pautado)
  const lineCount = Math.floor(height / 32);
  const lines = Array.from({length: lineCount}, (_, i) => i);

  return (
    <View style={[styles.container, {backgroundColor: colors.paper}]}>
      {/* Margem esquerda */}
      <View style={[styles.margin, {backgroundColor: colors.margin}]} />
      
      {/* Linhas horizontais do caderno - mais sutis no modo escuro */}
      {lines.map(index => (
        <View
          key={index}
          style={[
            styles.line,
            {
              top: index * 32,
              backgroundColor: colors.lines,
              opacity: isDarkMode ? 0.2 : 0.3,
            },
          ]}
        />
      ))}
      
      {/* Furos de caderno (apenas no modo claro para manter limpo) */}
      {!isDarkMode && (
        <>
          <View style={[styles.hole, {top: 50, backgroundColor: colors.paperDark}]} />
          <View style={[styles.hole, {top: height / 2, backgroundColor: colors.paperDark}]} />
          <View style={[styles.hole, {top: height - 100, backgroundColor: colors.paperDark}]} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  margin: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    opacity: 0.3,
  },
  hole: {
    position: 'absolute',
    left: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00000020',
  },
});


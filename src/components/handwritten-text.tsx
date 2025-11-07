import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';

interface HandwrittenTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: string;
}

export const HandwrittenText: React.FC<HandwrittenTextProps> = ({
  children,
  style,
  size = 'medium',
  color,
}) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;

  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    xlarge: styles.xlarge,
  };

  return (
    <Text
      style={[
        styles.base,
        sizeStyles[size],
        {color: color || colors.penBlack},
        style,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System', // Vamos usar System por enquanto, pode adicionar custom fonts depois
    fontWeight: '400',
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
  },
  large: {
    fontSize: 22,
    lineHeight: 32,
  },
  xlarge: {
    fontSize: 28,
    lineHeight: 36,
  },
});


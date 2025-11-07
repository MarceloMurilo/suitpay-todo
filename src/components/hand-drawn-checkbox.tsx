import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, Animated, StyleSheet} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import {useTheme} from '../context/theme-context';
import {notebookColors, notebookColorsDark} from '../styles/notebook-colors';

interface HandDrawnCheckboxProps {
  checked: boolean;
  onPress: () => void;
}

export const HandDrawnCheckbox: React.FC<HandDrawnCheckboxProps> = ({
  checked,
  onPress,
}) => {
  const {isDarkMode} = useTheme();
  const colors = isDarkMode ? notebookColorsDark : notebookColors;
  const checkAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(checkAnim, {
      toValue: checked ? 1 : 0,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}>
      <Animated.View style={{transform: [{scale: Animated.add(1, Animated.multiply(checkAnim, 0.1))}]}}>
        <Svg width="32" height="32" viewBox="0 0 32 32">
          {/* Quadrado desenhado à mão com fundo quando marcado */}
          <Path
            d="M 4 4 Q 4 3.5 4.5 3.5 L 27.5 3.5 Q 28 3.5 28 4 L 28 28 Q 28 28.5 27.5 28.5 L 4.5 28.5 Q 4 28.5 4 28 Z"
            stroke={checked ? colors.completed : colors.penBlue}
            strokeWidth="2.5"
            fill={checked ? colors.postItGreen : 'none'}
            fillOpacity={checked ? 0.3 : 0}
            strokeLinecap="round"
          />
          
          {/* Check GRANDE E VISÍVEL quando marcado */}
          {checked && (
            <Path
              d="M 8 16 L 13 22 L 24 10"
              stroke={isDarkMode ? '#15803D' : '#16A34A'}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={checkAnim}
            />
          )}
        </Svg>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


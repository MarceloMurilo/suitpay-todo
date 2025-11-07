import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle, View} from 'react-native';
import {HandwrittenText} from './handwritten-text';

interface PostItButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  color?: string;
  style?: ViewStyle;
  active?: boolean;
}

export const PostItButton: React.FC<PostItButtonProps> = ({
  onPress,
  children,
  color = '#FFF4A3',
  style,
  active = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.postIt,
        {
          backgroundColor: color,
          transform: [
            {rotate: active ? '0deg' : `${Math.random() * 4 - 2}deg`},
          ],
          opacity: 1, // Garante que sempre está visível
        },
        active && styles.activePostIt,
        style,
      ]}
      activeOpacity={0.8}>
      <View style={active && styles.activeBorder}>
        <HandwrittenText 
          size="small" 
          color="#2C3E50"
          style={{fontWeight: active ? 'bold' : 'normal'}}>
          {children}
        </HandwrittenText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postIt: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 20,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    minWidth: 80, // Garante tamanho mínimo
  },
  activePostIt: {
    elevation: 8,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#2C3E50',
  },
  activeBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#2C3E50',
  },
});


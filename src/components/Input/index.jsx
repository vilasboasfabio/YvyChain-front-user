import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const AnimatedInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animation = useRef(new Animated.Value(props.value ? 1 : 0)).current;

  // Effect to handle the label animation when value changes
  useEffect(() => {
    if (props.value) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (!props.value && !isFocused) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [props.value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!props.value) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: 'relative',
    left: 0,
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -12],
    }),
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    fontFamily: 'sans-serif-medium',
    marginBottom: 0,
    marginTop: 5,
  };

  return (
    <View style={tw`relative pt-5 items-center`}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        {...props}
        style={[tw`border-b border-gray-800 mt-4`, props.style, { width: '100%' }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="#cbd5e1" // Lighter gray for placeholder
      />
    </View>
  );
};

export default AnimatedInput;

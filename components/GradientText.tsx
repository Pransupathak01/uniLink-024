import React, { ReactNode, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { Easing, withRepeat, withTiming } from 'react-native-reanimated';
import { Svg, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

interface GradientTextProps {
  children: ReactNode;
  fontSize?: number;
  height?: number
  fontWeight?: string,
  fontFamily?: string;

}
const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  fontSize = 20, 
  height = 44, 
  fontWeight, 
  fontFamily = 'Montserrat'}) => {
  const [colorTransition, setColorTransition] = useState(0);
  const AnimatedText = Animated.createAnimatedComponent(SvgText);
  useEffect(() => {
    setColorTransition(withRepeat(withTiming(1, { duration: 2000, easing: Easing.linear }), -1));
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Svg height={height} width="100%">
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFA652" stopOpacity={colorTransition} />
            <Stop offset="100%" stopColor="#FC7F9C" stopOpacity={1 - colorTransition} />
          </LinearGradient>
        </Defs>
        <AnimatedText
          x="50%"
          y="80%"
          fontSize={fontSize * 2}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          fill="url(#grad1)"
          textAnchor="middle"
        >
          {children}
        </AnimatedText>
      </Svg>
    </View>
  );
};

export default GradientText;

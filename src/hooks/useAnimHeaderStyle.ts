import {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {FlatList} from 'react-native';

export const useAnimHeaderStyle = () => {
  const aRef = useAnimatedRef<FlatList>();
  // @ts-ignore
  const scrollOffset = useScrollViewOffset(aRef);

  const animatedStyle = useAnimatedStyle(() => {
    const additionalHeight = scrollOffset.value < 0 ? scrollOffset.value : 0;
    return {
      transform: [{translateY: additionalHeight}],
    };
  }, [scrollOffset]);

  return [aRef, animatedStyle];
};

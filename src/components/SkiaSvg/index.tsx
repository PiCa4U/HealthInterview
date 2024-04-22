import {Canvas, ImageSVG, useSVG} from '@shopify/react-native-skia';
import {StyleSheet} from 'react-native';

export const SkiaSvg = () => {
  const svg = useSVG(require('../../assets/svg/Smile.svg'));
  return (
    <Canvas style={styles.container}>
      {svg && <ImageSVG svg={svg} width={179} height={179} />}
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 179,
    height: 179,
  },
});

import React, {FC, memo, useMemo} from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Canvas,
  Paragraph,
  Path,
  rect,
  rrect,
  Skia,
  TextAlign,
  useFont,
} from '@shopify/react-native-skia';
import {Colors} from '../../../../constants/colors.ts';

type props = {
  count: number;
  total: number;
  size?: number;
};

const STROKE_WIDTH = 8;
const RECT_SIZE = 40;
const FONT_SIZE = 24;

export const ProgressIndicator: FC<props> = memo(({count, total}) => {
  const size = useSharedValue({width: 0, height: 0});

  const progress = useDerivedValue(() => withTiming(count / total), [count]);
  const font = useFont(require('../../../../assets/fonts/Inter.ttf'));

  const path = useDerivedValue(() => {
    const rectPath = Skia.Path.Make();
    const rrectPath = rrect(
      rect(STROKE_WIDTH / 2, STROKE_WIDTH / 2, 2 * RECT_SIZE, 2 * RECT_SIZE),
      24,
      24,
    );

    rectPath.addRRect(rrectPath);
    return rectPath;
  }, [size.value.width]);

  const paragraph = useMemo(() => {
    // Are the font loaded already?
    if (!font) {
      return null;
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center,
    };
    const textStyle = {
      color: Skia.Color(Colors.CARD_TITLE),
      fontFamilies: ['Inter'],
      fontSize: FONT_SIZE,
    };
    return Skia.ParagraphBuilder.Make(paragraphStyle)
      .pushStyle(textStyle)
      .addText(`${count}/${total}`)
      .pushStyle({...textStyle, fontStyle: {weight: 500}})
      .pop()
      .build();
  }, [count, font, total]);

  if (!font) {
    return null;
  }

  return (
    <Canvas
      style={{
        width: RECT_SIZE * 2 + STROKE_WIDTH,
        height: RECT_SIZE * 2 + STROKE_WIDTH,
      }}>
      <Path
        path={path}
        style="stroke"
        color={Colors.CARD_SUBTITLE}
        strokeWidth={8}
        strokeCap="round"
      />
      <Path
        path={path}
        style="stroke"
        color={count === total ? Colors.CARD_SUBTITLE : Colors.BRAND_50}
        strokeWidth={8}
        end={progress}
        strokeCap="round"
      />
      <Paragraph
        paragraph={paragraph}
        x={0}
        y={RECT_SIZE + STROKE_WIDTH - FONT_SIZE / 2}
        width={RECT_SIZE * 2 + STROKE_WIDTH}
      />
    </Canvas>
  );
});

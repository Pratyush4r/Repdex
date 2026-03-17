/** Module: HorizontalScrollbar.tsx */
import React from 'react';
import { Box } from '@mui/material';
import './HorizontalScrollbar.css';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import type { ExerciseRecord } from '../types';

type BodyPartScrollbarProps = {
  data: string[];
  bodyParts: true;
  setBodyPart?: (value: string) => void;
  bodyPart?: string;
};

type ExerciseScrollbarProps = {
  data: ExerciseRecord[];
  bodyParts?: false;
  setBodyPart?: (value: string) => void;
  bodyPart?: string;
};

type HorizontalScrollbarProps = BodyPartScrollbarProps | ExerciseScrollbarProps;

const ItemBox = Box as unknown as React.ElementType;

const HorizontalScrollbar = ({
  data,
  bodyParts = false,
  setBodyPart = () => undefined,
  bodyPart = 'all',
}: HorizontalScrollbarProps) => (
  <Box className="horizontal-scrollbar-container">
    {bodyParts
      ? (data as string[]).map((item) => (
        <ItemBox key={item} m="0 40px" flexShrink={0}>
          <BodyPart
            item={item}
            setBodyPart={setBodyPart}
            bodyPart={bodyPart}
          />
        </ItemBox>
      ))
      : (data as ExerciseRecord[]).map((item) => (
        <ItemBox key={item.id} m="0 40px" flexShrink={0}>
          <ExerciseCard exercise={item} />
        </ItemBox>
      ))}
  </Box>
);

export default HorizontalScrollbar;

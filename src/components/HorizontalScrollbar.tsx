/** Module: HorizontalScrollbar.tsx */
import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

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

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <IconButton
      onClick={() => scrollPrev()}
      className="slider-arrow slider-arrow-left"
      aria-label="Scroll left"
    >
      <ArrowBackIosNewRoundedIcon />
    </IconButton>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <IconButton
      onClick={() => scrollNext()}
      className="slider-arrow slider-arrow-right"
      aria-label="Scroll right"
    >
      <ArrowForwardIosRoundedIcon />
    </IconButton>
  );
};

const HorizontalScrollbar = ({
  data,
  bodyParts = false,
  setBodyPart = () => undefined,
  bodyPart = 'all',
}: HorizontalScrollbarProps) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {bodyParts
      ? (data as string[]).map((item) => (
          <ItemBox key={item} itemID={item} title={item} m="0 40px">
            <BodyPart
              item={item}
              setBodyPart={setBodyPart}
              bodyPart={bodyPart}
            />
          </ItemBox>
        ))
      : (data as ExerciseRecord[]).map((item) => (
          <ItemBox key={item.id} itemID={String(item.id)} title={String(item.id)} m="0 40px">
            <ExerciseCard exercise={item} />
          </ItemBox>
        ))}
  </ScrollMenu>
);

export default HorizontalScrollbar;

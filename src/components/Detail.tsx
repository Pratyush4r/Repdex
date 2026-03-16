/** Module: Detail.tsx */
import React from 'react';
import { Typography, Stack, Button } from '@mui/material';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';
import { useFavorites } from '../context/FavoritesContext';
import type { ExerciseRecord } from '../types';

type DetailProps = {
  exerciseDetail: Partial<ExerciseRecord>;
};

const Detail = ({ exerciseDetail }: DetailProps) => {
  const { bodyPart, gifUrl, name, target, equipment, id } = exerciseDetail;
  const { isFavorite, toggleFavorite } = useFavorites();
  const bookmarked = isFavorite(id ?? '');

  const extraDetail = [
    {
      icon: BodyPartImage,
      label: 'Body part',
      name: bodyPart,
    },
    {
      icon: TargetImage,
      label: 'Target muscle',
      name: target,
    },
    {
      icon: EquipmentImage,
      label: 'Equipment',
      name: equipment,
    },
  ];

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack
        sx={{
          gap: { lg: '35px', xs: '20px' },
          p: { xs: '16px', md: '24px' },
          borderRadius: '20px',
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1.2}
        >
          <Typography
            sx={{
              fontSize: { lg: '68px', xs: '34px' },
              color: 'var(--text-primary)',
            }}
            fontWeight={700}
            textTransform="capitalize"
          >
            {name}
          </Typography>
          <Button
            startIcon={
              bookmarked ? (
                <BookmarkRoundedIcon />
              ) : (
                <BookmarkBorderRoundedIcon />
              )
            }
            onClick={() => toggleFavorite(exerciseDetail)}
            sx={{
              textTransform: 'none',
              border: '1px solid var(--border-color)',
              bgcolor: bookmarked ? 'var(--accent)' : 'var(--muted-surface)',
              color: bookmarked ? 'var(--accent-text)' : 'var(--text-primary)',
              fontWeight: 700,
              px: 2,
              '&:hover': {
                bgcolor: bookmarked
                  ? 'var(--accent-strong)'
                  : 'var(--surface-color)',
              },
            }}
          >
            {bookmarked ? 'Saved' : 'Save'}
          </Button>
        </Stack>
        <Typography
          sx={{
            fontSize: { lg: '26px', xs: '20px' },
            color: 'var(--text-secondary)',
          }}
        >
          Exercises keep you strong.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> is one of
          the best <br /> exercises to target your {target}. It will help you
          improve your <br /> mood and gain energy.
        </Typography>
        {extraDetail?.map((item) => (
          <Stack
            key={`${item.label}-${item.name}`}
            direction="row"
            gap="24px"
            alignItems="center"
          >
            <Button
              disableRipple
              sx={{
                background: 'var(--muted-surface)',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                '&:hover': {
                  background: 'var(--muted-surface)',
                  boxShadow: 'none',
                },
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{ width: '50px', height: '50px' }}
              />
            </Button>
            <Typography
              textTransform="capitalize"
              sx={{
                fontSize: { lg: '32px', xs: '22px' },
                color: 'var(--text-primary)',
              }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;

import React from 'react';
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
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
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
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
                alt={bodyPart}
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

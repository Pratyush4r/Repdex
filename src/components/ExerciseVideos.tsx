/** Module: ExerciseVideos.tsx */
import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import type { YoutubeVideoItem } from '../types';

type ExerciseVideosProps = {
  exerciseVideos: YoutubeVideoItem[];
  name?: string;
  videosUnavailable: boolean;
};

const ExerciseVideos = ({
  exerciseVideos,
  name,
  videosUnavailable,
}: ExerciseVideosProps) => {
  if (!exerciseVideos.length) {
    return (
      <Box sx={{ marginTop: { lg: '203px', xs: '20px' }, p: '20px' }}>
        <Typography
          sx={{
            fontSize: { lg: '48px', xs: '32px' },
            color: 'var(--text-primary)',
          }}
          fontWeight={700}
          mb="16px"
        >
          Watch{' '}
          <span style={{ color: 'var(--accent)', textTransform: 'capitalize' }}>
            {name}
          </span>{' '}
          exercise videos
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: '24px', xs: '18px' },
            color: 'var(--text-secondary)',
          }}
        >
          {videosUnavailable
            ? 'Video API is unavailable for your key right now.'
            : 'No videos found for this exercise.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' }, p: '20px' }}>
      <Typography
        sx={{
          fontSize: { lg: '48px', xs: '32px' },
          color: 'var(--text-primary)',
        }}
        fontWeight={700}
        mb="33px"
      >
        Watch{' '}
        <span style={{ color: 'var(--accent)', textTransform: 'capitalize' }}>
          {name}
        </span>{' '}
        exercise videos
      </Typography>
      <Stack
        direction="row"
        sx={{ p: 2, position: 'relative', overflowX: 'auto' }}
        className="horizontal-scroll"
      >
        {exerciseVideos.slice(0, 6).map((item) => (
          <Box
            key={item.video.videoId}
            component="a"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
            sx={{
              textDecoration: 'none',
              width: { lg: '320px', xs: '250px' },
              flexShrink: 0,
              mr: '20px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-soft)',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <img
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
              width="100%"
              height="180px"
              style={{ objectFit: 'cover' }}
            />
            <Box sx={{ p: '10px', backgroundColor: 'var(--surface-color)' }}>
              <Typography
                sx={{
                  fontSize: { lg: '20px', xs: '18px' },
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                {item.video.title}
              </Typography>
              <Typography fontSize="16px" color="var(--text-secondary)">
                {item.video.channelName}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;

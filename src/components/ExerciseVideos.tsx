/** Module: ExerciseVideos.tsx */
import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import type { YoutubeVideoItem } from '../types';

type ExerciseVideosProps = {
  exerciseVideos: YoutubeVideoItem[];
  name?: string;
  videosUnavailable: boolean;
};

// Import helper functions
const formatDuration = (seconds?: number): string => {
  if (!seconds) return '';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatViewCount = (views?: number): string => {
  if (!views) return '';
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
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
            ? 'Video API unavailable. Add REACT_APP_RAPID_API_KEY to your .env file if you want videos.'
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
        {exerciseVideos.slice(0, 6).map((item) => {
          const { video } = item;
          const duration = formatDuration(video.lengthSeconds);
          const viewCount = formatViewCount(video.stats?.views);

          return (
            <Box
              key={video.videoId}
              component="a"
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
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
                position: 'relative',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <img
                  src={video.thumbnails[0]?.url}
                  alt={video.title}
                  width="100%"
                  height="180px"
                  style={{ objectFit: 'cover' }}
                />
                {duration && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {duration}
                  </Box>
                )}
                {video.badges?.includes('New') && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-text)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    New
                  </Box>
                )}
              </Box>
              <Box sx={{ p: '10px', backgroundColor: 'var(--surface-color)' }}>
                <Typography
                  sx={{
                    fontSize: { lg: '18px', xs: '16px' },
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: '8px',
                    lineHeight: '1.3',
                  }}
                >
                  {video.title}
                </Typography>
                <Typography
                  fontSize="14px"
                  color="var(--text-secondary)"
                  sx={{ mb: '4px' }}
                >
                  {video.author?.title}
                </Typography>
                <Stack direction="row" gap="8px" alignItems="center">
                  {viewCount && (
                    <Typography fontSize="12px" color="var(--text-secondary)">
                      {viewCount}
                    </Typography>
                  )}
                  {video.publishedTimeText && (
                    <>
                      <Typography fontSize="12px" color="var(--text-muted)">•</Typography>
                      <Typography fontSize="12px" color="var(--text-secondary)">
                        {video.publishedTimeText}
                      </Typography>
                    </>
                  )}
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;

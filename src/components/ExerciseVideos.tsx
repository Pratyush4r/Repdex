/** Module: ExerciseVideos.tsx */
import React, { useState } from 'react';
import { Typography, Box, Stack, IconButton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
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
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    setScrollOffset(scrollLeft);
  };

  const scrollLeft = () => {
    const container = document.querySelector('.video-scroll-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.querySelector('.video-scroll-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const canScrollLeft = scrollOffset > 0;
  const canScrollRight =
    exerciseVideos.length > 2 &&
    scrollOffset < 600; // Approximate max scroll

  if (!exerciseVideos.length) {
    return (
      <Box sx={{ mt: { lg: '203px', xs: '20px' }, px: { lg: '20px', xs: '16px' } }}>
        <Typography
          sx={{
            fontSize: { lg: '3rem', xs: '2rem' },
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
            fontSize: { lg: '1.5rem', xs: '1.125rem' },
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
    <Box sx={{ mt: { lg: '203px', xs: '20px' }, px: { lg: '20px', xs: '16px' } }}>
      <Typography
        sx={{
          fontSize: { lg: '3rem', xs: '2rem' },
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
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Stack
          direction="row"
          sx={{
            p: 2,
            position: 'relative',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
          className="video-scroll-container"
          onScroll={handleScroll}
        >
          <Stack
            direction="row"
            sx={{ flex: '0 0 auto', width: '100%' }}
            spacing={{ lg: '24px', xs: '16px' }}
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
                        fontSize: { lg: '1.125rem', xs: '1rem' },
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
                          <Typography fontSize="12px" color="var(--text-muted)">
                            •
                          </Typography>
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
        </Stack>
        {/* Navigation arrows */}
        <IconButton
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          sx={{
            position: 'absolute',
            left: { lg: '-60px', xs: '-30px' },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: { lg: '54px', xs: '40px' },
            height: { lg: '54px', xs: '40px' },
            borderRadius: '50%',
            bgcolor: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-soft)',
            color: 'var(--accent-text)',
            '&:hover': {
              bgcolor: 'var(--accent)',
              color: 'var(--accent-text)',
              border: '1px solid #a88952',
            },
            '&:disabled': {
              opacity: 0,
              pointerEvents: 'none',
            },
          }}
          aria-label="Scroll left"
        >
          <ArrowBackIosNewRoundedIcon
            fontSize={{ lg: 'medium', xs: 'small' }}
          />
        </IconButton>
        <IconButton
          onClick={scrollRight}
          disabled={!canScrollRight}
          sx={{
            position: 'absolute',
            right: { lg: '-60px', xs: '-30px' },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            width: { lg: '54px', xs: '40px' },
            height: { lg: '54px', xs: '40px' },
            borderRadius: '50%',
            bgcolor: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-soft)',
            color: 'var(--accent-text)',
            '&:hover': {
              bgcolor: 'var(--accent)',
              color: 'var(--accent-text)',
              border: '1px solid #a88952',
            },
            '&:disabled': {
              opacity: 0,
              pointerEvents: 'none',
            },
          }}
          aria-label="Scroll right"
        >
          <ArrowForwardIosRoundedIcon
            fontSize={{ lg: 'medium', xs: 'small' }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ExerciseVideos;

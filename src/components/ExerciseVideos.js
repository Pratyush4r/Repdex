import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Loader from './Loader';

// const ExerciseVideos = ({ exerciseVideos, name }) => {
//   // if (!exerciseVideos.length) return <Loader />;
//   if (!exerciseVideos.length) return <Typography>No videos found.</Typography>;

//   return (
//     <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
//       <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
//         Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
//       </Typography>
//       <Stack sx={{ flexDirection: { lg: 'row' }, gap: { lg: '110px', xs: '0px' } }} justifyContent="flex-start" flexWrap="wrap" alignItems="center">
//         {exerciseVideos?.slice(0, 6)?.map((item, index) => (
//           <a
//             key={index}
//             className="exercise-video"
//             href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <img style={{ borderTopLeftRadius: '20px' }} src={item.video.thumbnails[0].url} alt={item.video.title} />
//             <Box>
//               <Typography sx={{ fontSize: { lg: '28px', xs: '18px' } }} fontWeight={600} color="#000">
//                 {item.video.title}
//               </Typography>
//               <Typography fontSize="14px" color="#000">
//                 {item.video.channelName}
//               </Typography>
//             </Box>
//           </a>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) return <Loader />;

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' }, p: '20px' }}>
      <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
        Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: 'relative', overflowX: 'auto' }} className="horizontal-scroll">
        {exerciseVideos.slice(0, 6).map((item, index) => (
          <Box
            key={index}
            component="a"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
            sx={{
              textDecoration: 'none',
              width: { lg: '320px', xs: '250px' },
              flexShrink: 0,
              mr: '20px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: 3,
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
            <Box sx={{ p: '10px', backgroundColor: '#fff' }}>
              <Typography sx={{ fontSize: { lg: '18px', xs: '16px' }, fontWeight: 600 }} color="#000">
                {item.video.title}
              </Typography>
              <Typography fontSize="14px" color="gray">
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

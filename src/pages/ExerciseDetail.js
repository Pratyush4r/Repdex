import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
import Loader from '../components/Loader';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [videosUnavailable, setVideosUnavailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      try {
        setIsLoading(true);
        setLoadError(false);
        setVideosUnavailable(false);
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const exerciseDetailData = await fetchData(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions,
        );
        if (!exerciseDetailData?.id) throw new Error('Exercise detail not found');
        setExerciseDetail(exerciseDetailData);

        const [videosResult, targetResult, equipmentResult] = await Promise.allSettled([
          fetchData(
            `${youtubeSearchUrl}/search?query=${encodeURIComponent(exerciseDetailData.name)} exercise`,
            youtubeOptions,
          ),
          fetchData(
            `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
            exerciseOptions,
          ),
          fetchData(
            `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
            exerciseOptions,
          ),
        ]);

        if (videosResult.status === 'fulfilled') {
          setExerciseVideos(
            Array.isArray(videosResult.value?.contents)
              ? videosResult.value.contents
              : [],
          );
          setVideosUnavailable(false);
        } else {
          setExerciseVideos([]);
          setVideosUnavailable(true);
        }

        if (targetResult.status === 'fulfilled') {
          setTargetMuscleExercises(
            Array.isArray(targetResult.value) ? targetResult.value : [],
          );
        } else {
          setTargetMuscleExercises([]);
        }

        if (equipmentResult.status === 'fulfilled') {
          setEquipmentExercises(
            Array.isArray(equipmentResult.value) ? equipmentResult.value : [],
          );
        } else {
          setEquipmentExercises([]);
        }
      } catch (_error) {
        setLoadError(true);
        setExerciseDetail({});
        setExerciseVideos([]);
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
        setVideosUnavailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (isLoading) return <Loader />;

  if (loadError) {
    return (
      <Box sx={{ mt: { lg: '96px', xs: '60px' }, px: 3 }}>
        <Typography variant="h5" textAlign="center">
          Could not load exercise details. Please check your API key and try
          again.
        </Typography>
      </Box>
    );
  }

  if (!exerciseDetail?.id) {
    return (
      <Box sx={{ mt: { lg: '96px', xs: '60px' }, px: 3 }}>
        <Typography variant="h5" textAlign="center">
          No exercise details were found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
        videosUnavailable={videosUnavailable}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;

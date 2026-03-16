/** Module: ExerciseDetail.tsx */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import {
  exerciseOptions,
  fetchData,
  hasYoutubeApiKey,
  youtubeOptions,
} from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';
import Loader from '../components/Loader';
import type {
  ExerciseRecord,
  YoutubeSearchResponse,
  YoutubeVideoItem,
} from '../types';

const getExerciseSignature = (exercise?: Partial<ExerciseRecord> | null) => [
  exercise?.name?.toLowerCase().trim(),
  exercise?.bodyPart?.toLowerCase().trim(),
  exercise?.target?.toLowerCase().trim(),
  exercise?.equipment?.toLowerCase().trim(),
].join('|');

const getUniqueExercises = (
  items: ExerciseRecord[],
  currentExercise?: Partial<ExerciseRecord> | null,
) => {
  const seenExerciseIds = new Set([currentExercise?.id]);
  const seenExerciseSignatures = new Set([
    getExerciseSignature(currentExercise),
  ]);

  return items.filter((item) => {
    const itemSignature = getExerciseSignature(item);

    if (
      !item?.id
      || seenExerciseIds.has(item.id)
      || seenExerciseSignatures.has(itemSignature)
    ) {
      return false;
    }

    seenExerciseIds.add(item.id);
    seenExerciseSignatures.add(itemSignature);
    return true;
  });
};

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState<Partial<ExerciseRecord>>(
    {},
  );
  const [exerciseVideos, setExerciseVideos] = useState<YoutubeVideoItem[]>([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState<
    ExerciseRecord[]
  >([]);
  const [equipmentExercises, setEquipmentExercises] = useState<
    ExerciseRecord[]
  >([]);
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

        const exerciseDetailData = await fetchData<ExerciseRecord>(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions,
        );
        if (!exerciseDetailData?.id) throw new Error('Exercise detail not found');
        setExerciseDetail(exerciseDetailData);

        const [videosResult, targetResult, equipmentResult] = await Promise.allSettled([
          hasYoutubeApiKey
            ? fetchData(
              `${youtubeSearchUrl}/search?query=${encodeURIComponent(exerciseDetailData.name)} exercise`,
              youtubeOptions,
            )
            : Promise.resolve({ contents: [] }),
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
          const videosPayload = videosResult.value as YoutubeSearchResponse;
          setExerciseVideos(
            Array.isArray(videosPayload?.contents)
              ? videosPayload.contents
              : [],
          );
          setVideosUnavailable(!hasYoutubeApiKey);
        } else {
          setExerciseVideos([]);
          setVideosUnavailable(true);
        }

        if (targetResult.status === 'fulfilled') {
          const targetPayload = targetResult.value as ExerciseRecord[];
          setTargetMuscleExercises(
            getUniqueExercises(
              Array.isArray(targetPayload) ? targetPayload : [],
              exerciseDetailData,
            ),
          );
        } else {
          setTargetMuscleExercises([]);
        }

        if (equipmentResult.status === 'fulfilled') {
          const equipmentPayload = equipmentResult.value as ExerciseRecord[];
          setEquipmentExercises(
            getUniqueExercises(
              Array.isArray(equipmentPayload) ? equipmentPayload : [],
              exerciseDetailData,
            ),
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

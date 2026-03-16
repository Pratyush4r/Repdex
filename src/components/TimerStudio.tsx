/** Module: TimerStudio.tsx */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import type { DurationInput, HiitInput, HiitState } from '../types';

type TimerMode = 'countdown' | 'hiit' | 'stopwatch';
type DurationField = keyof DurationInput;
type HiitSection = keyof Pick<HiitInput, 'work' | 'rest'>;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const normalizeDuration = (
  duration: Partial<DurationInput>,
): DurationInput => ({
  hours: clamp(Number(duration.hours) || 0, 0, 99),
  minutes: clamp(Number(duration.minutes) || 0, 0, 59),
  seconds: clamp(Number(duration.seconds) || 0, 0, 59),
});

const durationToSeconds = (duration: Partial<DurationInput>) => {
  const normalized = normalizeDuration(duration);
  return normalized.hours * 3600 + normalized.minutes * 60 + normalized.seconds;
};

const secondsToDuration = (totalSeconds: number): DurationInput => {
  const safeSeconds = Math.max(0, totalSeconds);
  return {
    hours: Math.floor(safeSeconds / 3600),
    minutes: Math.floor((safeSeconds % 3600) / 60),
    seconds: safeSeconds % 60,
  };
};

const formatClock = (totalSeconds: number) => {
  const { hours, minutes, seconds } = secondsToDuration(totalSeconds);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

type DurationFieldsProps = {
  title: string;
  value: DurationInput;
  onChange: (field: DurationField, value: number) => void;
};

const DurationFields = ({ title, value, onChange }: DurationFieldsProps) => (
  <Stack spacing={1}>
    <Typography
      sx={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 700 }}
    >
      {title}
    </Typography>
    <Stack direction="row" spacing={1}>
      <TextField
        type="number"
        label="Hours"
        value={value.hours}
        onChange={(event) => onChange('hours', Number(event.target.value))}
        sx={{
          width: { xs: '82px', sm: '110px' },
          '& .MuiInputBase-input': { color: 'var(--text-primary)' },
          '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
        }}
      />
      <TextField
        type="number"
        label="Minutes"
        value={value.minutes}
        onChange={(event) => onChange('minutes', Number(event.target.value))}
        sx={{
          width: { xs: '82px', sm: '110px' },
          '& .MuiInputBase-input': { color: 'var(--text-primary)' },
          '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
        }}
      />
      <TextField
        type="number"
        label="Seconds"
        value={value.seconds}
        onChange={(event) => onChange('seconds', Number(event.target.value))}
        sx={{
          width: { xs: '82px', sm: '110px' },
          '& .MuiInputBase-input': { color: 'var(--text-primary)' },
          '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
        }}
      />
    </Stack>
  </Stack>
);

const TimerStudio = () => {
  const [mode, setMode] = useState<TimerMode>('countdown');
  const [isRunning, setIsRunning] = useState(false);

  const [countdownInput, setCountdownInput] = useState<DurationInput>({
    hours: 0,
    minutes: 1,
    seconds: 30,
  });
  const [countdownTime, setCountdownTime] = useState(90);

  const [stopwatchTime, setStopwatchTime] = useState(0);

  const [hiitInput, setHiitInput] = useState<HiitInput>({
    work: { hours: 0, minutes: 0, seconds: 30 },
    rest: { hours: 0, minutes: 0, seconds: 15 },
    rounds: 8,
  });
  const [hiitState, setHiitState] = useState<HiitState>({
    phase: 'work',
    timeLeft: 30,
    round: 1,
    done: false,
  });

  const countdownSeconds = useMemo(
    () => durationToSeconds(countdownInput),
    [countdownInput],
  );
  const hiitWorkSeconds = useMemo(
    () => Math.max(1, durationToSeconds(hiitInput.work)),
    [hiitInput.work],
  );
  const hiitRestSeconds = useMemo(
    () => Math.max(1, durationToSeconds(hiitInput.rest)),
    [hiitInput.rest],
  );

  useEffect(() => {
    if (mode === 'countdown' && !isRunning) {
      setCountdownTime(countdownSeconds);
    }
  }, [countdownSeconds, mode, isRunning]);

  useEffect(() => {
    if (mode === 'hiit' && !isRunning) {
      setHiitState({
        phase: 'work',
        timeLeft: hiitWorkSeconds,
        round: 1,
        done: false,
      });
    }
  }, [mode, isRunning, hiitWorkSeconds, hiitRestSeconds, hiitInput.rounds]);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = window.setInterval(() => {
      if (mode === 'countdown') {
        setCountdownTime((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
        return;
      }

      if (mode === 'stopwatch') {
        setStopwatchTime((prev) => prev + 1);
        return;
      }

      setHiitState((prev) => {
        if (prev.done) {
          setIsRunning(false);
          return prev;
        }

        if (prev.timeLeft > 1) {
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        }

        if (prev.phase === 'work') {
          return { ...prev, phase: 'rest', timeLeft: hiitRestSeconds };
        }

        if (prev.round < hiitInput.rounds) {
          return {
            phase: 'work',
            timeLeft: hiitWorkSeconds,
            round: prev.round + 1,
            done: false,
          };
        }

        setIsRunning(false);
        return { ...prev, phase: 'done', timeLeft: 0, done: true };
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, mode, hiitInput.rounds, hiitWorkSeconds, hiitRestSeconds]);

  const timerLabel = useMemo(() => {
    if (mode === 'countdown') return 'Countdown';
    if (mode === 'stopwatch') return 'Stopwatch';
    return hiitState.done
      ? 'HIIT Complete'
      : `HIIT ${hiitState.phase === 'work' ? 'Work' : 'Rest'} • Round ${hiitState.round}/${hiitInput.rounds}`;
  }, [
    mode,
    hiitState.done,
    hiitState.phase,
    hiitState.round,
    hiitInput.rounds,
  ]);

  const visibleTime = useMemo(() => {
    if (mode === 'countdown') return countdownTime;
    if (mode === 'stopwatch') return stopwatchTime;
    return hiitState.timeLeft;
  }, [mode, countdownTime, stopwatchTime, hiitState.timeLeft]);

  const switchMode = (selectedMode: TimerMode) => {
    setMode(selectedMode);
    setIsRunning(false);
  };

  const updateCountdownField = (field: DurationField, rawValue: number) => {
    setIsRunning(false);
    setCountdownInput((prev) => normalizeDuration({ ...prev, [field]: rawValue }));
  };

  const updateHiitField = (
    section: HiitSection,
    field: DurationField,
    rawValue: number,
  ) => {
    setIsRunning(false);
    setHiitInput((prev) => ({
      ...prev,
      [section]: normalizeDuration({ ...prev[section], [field]: rawValue }),
    }));
  };

  const updateHiitRounds = (rawValue: number) => {
    setIsRunning(false);
    setHiitInput((prev) => ({
      ...prev,
      rounds: clamp(Number(rawValue) || 1, 1, 30),
    }));
  };

  const applyCountdownPreset = (duration: Partial<DurationInput>) => {
    setIsRunning(false);
    const normalized = normalizeDuration(duration);
    setCountdownInput(normalized);
    setCountdownTime(durationToSeconds(normalized));
    setMode('countdown');
  };

  const applyHiitPreset = (
    work: Partial<DurationInput>,
    rest: Partial<DurationInput>,
    rounds: number,
  ) => {
    setIsRunning(false);
    const nextWork = normalizeDuration(work);
    const nextRest = normalizeDuration(rest);
    const nextRounds = clamp(rounds, 1, 30);
    setHiitInput({
      work: nextWork,
      rest: nextRest,
      rounds: nextRounds,
    });
    setHiitState({
      phase: 'work',
      timeLeft: durationToSeconds(nextWork),
      round: 1,
      done: false,
    });
    setMode('hiit');
  };

  const resetActiveTimer = () => {
    setIsRunning(false);
    if (mode === 'countdown') {
      setCountdownTime(countdownSeconds);
      return;
    }
    if (mode === 'stopwatch') {
      setStopwatchTime(0);
      return;
    }
    setHiitState({
      phase: 'work',
      timeLeft: hiitWorkSeconds,
      round: 1,
      done: false,
    });
  };

  const toggleTimer = () => {
    if (mode === 'countdown' && countdownTime === 0) {
      setCountdownTime(Math.max(1, countdownSeconds));
    }
    if (mode === 'hiit' && hiitState.done) {
      setHiitState({
        phase: 'work',
        timeLeft: hiitWorkSeconds,
        round: 1,
        done: false,
      });
    }
    setIsRunning((prev) => !prev);
  };

  return (
    <Box
      id="timers-panel"
      sx={{
        mt: { lg: '18px', xs: '8px' },
        px: { xs: 1, sm: 2 },
        scrollMarginTop: { xs: '96px', sm: '112px' },
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: '42px', xs: '32px' },
          color: 'var(--text-primary)',
          fontWeight: 800,
          mb: 1,
          letterSpacing: '0.01em',
        }}
      >
        Timer Studio
      </Typography>
      <Typography
        sx={{
          color: 'var(--text-secondary)',
          fontSize: { lg: '20px', xs: '17px' },
          mb: { lg: 3.2, xs: 2.4 },
          maxWidth: '780px',
        }}
      >
        Dedicated timers for exercise sessions. Set exact hours, minutes, and
        seconds for precise pacing.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box
            sx={{
              border: '1px solid var(--border-color)',
              background: 'var(--surface-color)',
              borderRadius: '20px',
              p: { xs: 2.2, sm: 3 },
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.1}
              sx={{ mb: 2.4 }}
            >
              <Button
                onClick={() => switchMode('countdown')}
                startIcon={<TimerRoundedIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  bgcolor:
                    mode === 'countdown'
                      ? 'var(--accent)'
                      : 'var(--muted-surface)',
                  color:
                    mode === 'countdown'
                      ? 'var(--accent-text)'
                      : 'var(--text-primary)',
                  fontWeight: 700,
                }}
              >
                Countdown
              </Button>
              <Button
                onClick={() => switchMode('hiit')}
                startIcon={<BoltRoundedIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  bgcolor:
                    mode === 'hiit' ? 'var(--accent)' : 'var(--muted-surface)',
                  color:
                    mode === 'hiit'
                      ? 'var(--accent-text)'
                      : 'var(--text-primary)',
                  fontWeight: 700,
                }}
              >
                HIIT
              </Button>
              <Button
                onClick={() => switchMode('stopwatch')}
                startIcon={<AvTimerRoundedIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  bgcolor:
                    mode === 'stopwatch'
                      ? 'var(--accent)'
                      : 'var(--muted-surface)',
                  color:
                    mode === 'stopwatch'
                      ? 'var(--accent-text)'
                      : 'var(--text-primary)',
                  fontWeight: 700,
                }}
              >
                Stopwatch
              </Button>
            </Stack>

            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '15px', mb: 0.6 }}
            >
              {timerLabel}
            </Typography>
            <Typography
              sx={{
                color: 'var(--text-primary)',
                fontWeight: 800,
                fontSize: { xs: '52px', md: '74px' },
                lineHeight: 1.1,
                mb: 2.2,
              }}
            >
              {formatClock(visibleTime)}
            </Typography>

            {mode === 'countdown' && (
              <Stack spacing={2.2}>
                <DurationFields
                  title="Set Countdown"
                  value={countdownInput}
                  onChange={updateCountdownField}
                />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Button
                    onClick={() => applyCountdownPreset({ hours: 0, minutes: 5, seconds: 0 })}
                    sx={{
                      textTransform: 'none',
                      border: '1px solid var(--border-color)',
                      bgcolor: 'var(--muted-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    00:05:00
                  </Button>
                  <Button
                    onClick={() => applyCountdownPreset({
                      hours: 0,
                      minutes: 15,
                      seconds: 0,
                    })}
                    sx={{
                      textTransform: 'none',
                      border: '1px solid var(--border-color)',
                      bgcolor: 'var(--muted-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    00:15:00
                  </Button>
                  <Button
                    onClick={() => applyCountdownPreset({
                      hours: 0,
                      minutes: 30,
                      seconds: 0,
                    })}
                    sx={{
                      textTransform: 'none',
                      border: '1px solid var(--border-color)',
                      bgcolor: 'var(--muted-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    00:30:00
                  </Button>
                </Stack>
              </Stack>
            )}

            {mode === 'hiit' && (
              <Stack spacing={2.2}>
                <DurationFields
                  title="Work Duration"
                  value={hiitInput.work}
                  onChange={(field, value) => updateHiitField('work', field, value)}
                />
                <DurationFields
                  title="Rest Duration"
                  value={hiitInput.rest}
                  onChange={(field, value) => updateHiitField('rest', field, value)}
                />
                <TextField
                  type="number"
                  label="Rounds"
                  value={hiitInput.rounds}
                  onChange={(event) => updateHiitRounds(Number(event.target.value))}
                  sx={{
                    width: { xs: '120px', sm: '140px' },
                    '& .MuiInputBase-input': { color: 'var(--text-primary)' },
                    '& .MuiInputLabel-root': { color: 'var(--text-secondary)' },
                  }}
                />
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Button
                    onClick={() => applyHiitPreset(
                      { hours: 0, minutes: 0, seconds: 20 },
                      { hours: 0, minutes: 0, seconds: 10 },
                      8,
                    )}
                    sx={{
                      textTransform: 'none',
                      border: '1px solid var(--border-color)',
                      bgcolor: 'var(--muted-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    20/10 x8
                  </Button>
                  <Button
                    onClick={() => applyHiitPreset(
                      { hours: 0, minutes: 0, seconds: 40 },
                      { hours: 0, minutes: 0, seconds: 20 },
                      10,
                    )}
                    sx={{
                      textTransform: 'none',
                      border: '1px solid var(--border-color)',
                      bgcolor: 'var(--muted-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    40/20 x10
                  </Button>
                  <Button
                    onClick={() => applyHiitPreset(
                      { hours: 0, minutes: 0, seconds: 30 },
                      { hours: 0, minutes: 0, seconds: 15 },
                      12,
                    )}
                    sx={{
                      textTransform: 'none',
                      border: '1px solid var(--border-color)',
                      bgcolor: 'var(--muted-surface)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    30/15 x12
                  </Button>
                </Stack>
              </Stack>
            )}

            <Stack direction="row" spacing={1.2} mt={2.8}>
              <Button
                onClick={toggleTimer}
                startIcon={
                  isRunning ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />
                }
                sx={{
                  textTransform: 'none',
                  bgcolor: 'var(--accent)',
                  color: 'var(--accent-text)',
                  borderRadius: '12px',
                  px: 2.2,
                  py: 1.1,
                  fontWeight: 800,
                  '&:hover': { bgcolor: 'var(--accent-strong)' },
                }}
              >
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button
                onClick={resetActiveTimer}
                startIcon={<RestartAltRoundedIcon />}
                sx={{
                  textTransform: 'none',
                  bgcolor: 'var(--muted-surface)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  px: 2.2,
                  py: 1.1,
                  fontWeight: 700,
                }}
              >
                Reset
              </Button>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              border: '1px solid var(--border-color)',
              background: 'var(--surface-color)',
              borderRadius: '20px',
              p: { xs: 2.2, sm: 3 },
              boxShadow: 'var(--shadow-soft)',
              minHeight: { lg: '458px', xs: 'auto' },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <FormatListBulletedRoundedIcon sx={{ color: 'var(--accent)' }} />
              <Typography
                sx={{ color: 'var(--text-primary)', fontWeight: 800 }}
              >
                How To Use
              </Typography>
            </Stack>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '15px', mb: 1 }}
            >
              1. Pick a mode: countdown, HIIT, or stopwatch.
            </Typography>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '15px', mb: 1 }}
            >
              2. Set hours, minutes, and seconds exactly as needed.
            </Typography>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '15px', mb: 2 }}
            >
              3. Press Start and keep your pace consistent.
            </Typography>

            <Divider sx={{ borderColor: 'var(--border-color)', my: 2 }} />

            <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
              <TipsAndUpdatesRoundedIcon sx={{ color: 'var(--accent)' }} />
              <Typography
                sx={{ color: 'var(--text-primary)', fontWeight: 800 }}
              >
                Smart Tips
              </Typography>
            </Stack>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '15px', mb: 1 }}
            >
              Keep rest timers fixed between sets for better recovery tracking.
            </Typography>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '15px', mb: 1 }}
            >
              Start HIIT with lower rounds and increase weekly.
            </Typography>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '15px' }}
            >
              Use stopwatch for technique work where strict intervals are not
              needed.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimerStudio;

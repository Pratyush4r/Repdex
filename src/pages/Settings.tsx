/** Module: Settings.tsx */
import React from 'react';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { useAccessibility } from '../context/AccessibilityContext';

type SettingsProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

const valueText = (value: number) => `${Math.round(value * 100)}%`;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const Settings = ({ isDarkMode, onToggleTheme }: SettingsProps) => {
  const {
    uiScale,
    textScale,
    highContrast,
    reducedMotion,
    readableFont,
    setUiScale,
    setTextScale,
    toggleSetting,
    resetSettings,
  } = useAccessibility();

  return (
    <Box sx={{ mt: { lg: '44px', xs: '24px' }, pb: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          background: 'var(--surface-color)',
          boxShadow: 'var(--shadow-soft)',
          p: { xs: 2.2, sm: 3.2 },
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center" mb={1}>
          <AccessibilityNewRoundedIcon sx={{ color: 'var(--accent)' }} />
          <Typography
            sx={{
              fontSize: { xs: '32px', sm: '40px' },
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            Settings
          </Typography>
        </Stack>
        <Typography
          sx={{
            color: 'var(--text-secondary)',
            fontSize: { xs: '17px', sm: '19px' },
            mb: 3,
            maxWidth: '760px',
          }}
        >
          Tune the interface for readability and comfort. Changes are saved
          automatically on this device.
        </Typography>

        <Stack spacing={2.2}>
          <Box
            sx={{
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              p: { xs: 2, sm: 2.2 },
              background: 'var(--muted-surface)',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <ZoomInRoundedIcon sx={{ color: 'var(--accent)' }} />
              <Typography
                sx={{ color: 'var(--text-primary)', fontWeight: 700 }}
              >
                UI Size
              </Typography>
            </Stack>
            <Slider
              min={0.9}
              max={1.2}
              step={0.05}
              value={uiScale}
              valueLabelDisplay="auto"
              valueLabelFormat={valueText}
              onChange={(_event: Event, value: number | number[]) => {
                setUiScale(Array.isArray(value) ? value[0] : value);
              }}
              sx={{ color: 'var(--accent)' }}
            />
            <Stack direction="row" spacing={1} alignItems="center" mt={0.8}>
              <IconButton
                aria-label="Decrease UI size"
                onClick={() => setUiScale(clamp(uiScale - 0.05, 0.9, 1.2))}
                sx={{
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  bgcolor: 'var(--surface-color)',
                }}
              >
                <RemoveRoundedIcon />
              </IconButton>
              <Typography
                sx={{ color: 'var(--text-secondary)', minWidth: '74px' }}
              >
                {valueText(uiScale)}
              </Typography>
              <IconButton
                aria-label="Increase UI size"
                onClick={() => setUiScale(clamp(uiScale + 0.05, 0.9, 1.2))}
                sx={{
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  bgcolor: 'var(--surface-color)',
                }}
              >
                <AddRoundedIcon />
              </IconButton>
            </Stack>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '14px' }}
            >
              Scales controls and layout density.
            </Typography>
          </Box>

          <Box
            sx={{
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              p: { xs: 2, sm: 2.2 },
              background: 'var(--muted-surface)',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <TextFieldsRoundedIcon sx={{ color: 'var(--accent)' }} />
              <Typography
                sx={{ color: 'var(--text-primary)', fontWeight: 700 }}
              >
                Text Size
              </Typography>
            </Stack>
            <Slider
              min={0.9}
              max={1.3}
              step={0.05}
              value={textScale}
              valueLabelDisplay="auto"
              valueLabelFormat={valueText}
              onChange={(_event: Event, value: number | number[]) => {
                setTextScale(Array.isArray(value) ? value[0] : value);
              }}
              sx={{ color: 'var(--accent)' }}
            />
            <Stack direction="row" spacing={1} alignItems="center" mt={0.8}>
              <IconButton
                aria-label="Decrease text size"
                onClick={() => setTextScale(clamp(textScale - 0.05, 0.9, 1.3))}
                sx={{
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  bgcolor: 'var(--surface-color)',
                }}
              >
                <RemoveRoundedIcon />
              </IconButton>
              <Typography
                sx={{ color: 'var(--text-secondary)', minWidth: '74px' }}
              >
                {valueText(textScale)}
              </Typography>
              <IconButton
                aria-label="Increase text size"
                onClick={() => setTextScale(clamp(textScale + 0.05, 0.9, 1.3))}
                sx={{
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  bgcolor: 'var(--surface-color)',
                }}
              >
                <AddRoundedIcon />
              </IconButton>
            </Stack>
            <Typography
              sx={{ color: 'var(--text-secondary)', fontSize: '14px' }}
            >
              Increases base reading text size.
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: 'var(--border-color)', my: 3 }} />

        <Stack spacing={1.2}>
          <FormControlLabel
            control={(
              <Switch
                checked={highContrast}
                onChange={() => toggleSetting('highContrast')}
              />
            )}
            label="High Contrast"
            sx={{ color: 'var(--text-primary)' }}
          />
          <FormControlLabel
            control={(
              <Switch
                checked={reducedMotion}
                onChange={() => toggleSetting('reducedMotion')}
              />
            )}
            label="Reduce Motion"
            sx={{ color: 'var(--text-primary)' }}
          />
          <FormControlLabel
            control={(
              <Switch
                checked={readableFont}
                onChange={() => toggleSetting('readableFont')}
              />
            )}
            label="Readable Font"
            sx={{ color: 'var(--text-primary)' }}
          />
        </Stack>

        <Divider sx={{ borderColor: 'var(--border-color)', my: 3 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.2}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Button
            onClick={onToggleTheme}
            startIcon={
              isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />
            }
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'var(--muted-surface)',
              color: 'var(--text-primary)',
            }}
          >
            {isDarkMode ? 'Switch To Light Mode' : 'Switch To Dark Mode'}
          </Button>
          <Button
            onClick={resetSettings}
            startIcon={<RestartAltRoundedIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'var(--surface-color)',
              color: 'var(--text-primary)',
            }}
          >
            Reset Accessibility
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Settings;

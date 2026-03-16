/** Module: AccessibilityContext.tsx */
import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'repdex-accessibility-settings';

type AccessibilitySettings = {
  uiScale: number;
  textScale: number;
  highContrast: boolean;
  reducedMotion: boolean;
  readableFont: boolean;
};

type AccessibilitySettingKey =
  | 'highContrast'
  | 'reducedMotion'
  | 'readableFont';

type AccessibilityContextValue = AccessibilitySettings & {
  setUiScale: (value: number) => void;
  setTextScale: (value: number) => void;
  toggleSetting: (settingKey: AccessibilitySettingKey) => void;
  resetSettings: () => void;
};

const defaultSettings: AccessibilitySettings = {
  uiScale: 1,
  textScale: 1,
  highContrast: false,
  reducedMotion: false,
  readableFont: false,
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const normalize = (raw: Partial<AccessibilitySettings> | null | undefined): AccessibilitySettings => ({
  uiScale: clamp(Number(raw?.uiScale) || defaultSettings.uiScale, 0.9, 1.2),
  textScale: clamp(Number(raw?.textScale) || defaultSettings.textScale, 0.9, 1.3),
  highContrast: Boolean(raw?.highContrast),
  reducedMotion: Boolean(raw?.reducedMotion),
  readableFont: Boolean(raw?.readableFont),
});

const readFromStorage = (): AccessibilitySettings => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return defaultSettings;
    return normalize(JSON.parse(value));
  } catch (_error) {
    return defaultSettings;
  }
};

type AccessibilityProviderProps = {
  children: ReactNode;
};

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => readFromStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.documentElement.style.setProperty('--ui-scale', String(settings.uiScale));
    document.documentElement.style.setProperty('--text-scale', String(settings.textScale));
    document.body.setAttribute(
      'data-contrast',
      settings.highContrast ? 'high' : 'normal',
    );
    document.body.setAttribute(
      'data-motion',
      settings.reducedMotion ? 'reduced' : 'normal',
    );
    document.body.setAttribute(
      'data-font',
      settings.readableFont ? 'readable' : 'default',
    );
  }, [settings]);

  const setUiScale = useCallback((value: number) => {
    setSettings((current) => ({
      ...current,
      uiScale: clamp(Number(value) || defaultSettings.uiScale, 0.9, 1.2),
    }));
  }, []);

  const setTextScale = useCallback((value: number) => {
    setSettings((current) => ({
      ...current,
      textScale: clamp(Number(value) || defaultSettings.textScale, 0.9, 1.3),
    }));
  }, []);

  const toggleSetting = useCallback((settingKey: AccessibilitySettingKey) => {
    setSettings((current) => ({
      ...current,
      [settingKey]: !current[settingKey],
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const value = useMemo(
    () => ({
      ...settings,
      setUiScale,
      setTextScale,
      toggleSetting,
      resetSettings,
    }),
    [settings, setUiScale, setTextScale, toggleSetting, resetSettings],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

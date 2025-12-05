import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '../lib/supabase';

const CACHE_KEY = 'cached-highlights';

export type Highlight = {
  id: string;
  title: string;
  description?: string | null;
  url?: string | null;
  updated_at?: string | null;
};

export type CachedHighlightsState = {
  highlights: Highlight[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function useCachedHighlights(): CachedHighlightsState {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCachedHighlights = async () => {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);

        if (cached) {
          setHighlights(JSON.parse(cached));
        }
      } catch (storageError) {
        console.warn('Failed to read cached highlights', storageError);
      }
    };

    loadCachedHighlights();
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from<Highlight>('highlights')
        .select('*')
        .order('updated_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        setHighlights(data);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      }
    } catch (fetchErr) {
      console.warn('Unable to refresh highlights, falling back to cache', fetchErr);
      setError('Unable to fetch new highlights. Showing saved results.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { highlights, isLoading, error, refresh };
}

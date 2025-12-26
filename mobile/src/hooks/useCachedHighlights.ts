import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { Highlight } from '../types';
import { sampleHighlights } from '../data/sampleData';

const CACHE_KEY = 'yapp:highlights';

export function useCachedHighlights() {
  const [highlights, setHighlights] = useState<Highlight[]>(sampleHighlights);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cache = useCallback(async (items: Highlight[]) => {
    setHighlights(items);
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(items));
    } catch (storageError) {
      console.warn('Unable to persist highlights cache', storageError);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('highlights')
        .select('id,title,description,impact')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      const payload: Highlight[] =
        data?.map((row) => ({
          id: row.id,
          title: row.title ?? 'Untitled highlight',
          description: row.description ?? '',
          impact: row.impact ?? '',
        })) ?? sampleHighlights;

      await cache(payload.length ? payload : sampleHighlights);
    } catch (err) {
      console.warn('Unable to refresh highlights from Supabase', err);
      setError('Live data unavailable. Showing cached content.');
    } finally {
      setLoading(false);
    }
  }, [cache]);

  useEffect(() => {
    const load = async () => {
      try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          setHighlights(JSON.parse(cached));
        } else {
          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(sampleHighlights));
        }
      } catch (storageError) {
        console.warn('Unable to read cached highlights', storageError);
      } finally {
        setLoading(false);
      }
    };

    load().then(() => refresh());
  }, [refresh]);

  return { highlights, loading, refresh, error };

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

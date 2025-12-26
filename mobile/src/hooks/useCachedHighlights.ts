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
}

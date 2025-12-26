import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { GlassCard } from '../components/GlassCard';
import { colors, radii, spacing } from '../theme';
import { Highlight } from '../types';

interface Props {
  highlights: Highlight[];
  refresh: () => Promise<void>;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
}

export function HomeScreen({ highlights, refresh, loading, error, isOffline }: Props) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0.18] });

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.kicker}>Lovable YAPP</Text>
          <Text style={styles.headline}>Concierge on mobile, polished for desktop.</Text>
          <Text style={styles.body}>
            Rebuilt with Expo for fluid glass panels, offline caching, and ready-to-ship AI workflows.
          </Text>
        </View>
        <View style={styles.pulseWrapper}>
          <Animated.View style={[styles.pulse, { opacity, transform: [{ scale }] }]} />
          <View style={styles.pulseDot} />
        </View>
      </View>

      <GlassCard
        title="Mobile-first preview"
        subtitle="Tap-friendly cards, sticky actions, and responsive typography."
      >
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {isOffline ? <Text style={styles.offline}>Offline mode — showing cached content.</Text> : null}
        {loading ? <Text style={styles.loading}>Syncing live data…</Text> : null}
        <View style={styles.grid}>
          {highlights.map((item) => (
            <View key={item.id} style={styles.highlight}>
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightBody}>{item.description}</Text>
              <Text style={styles.highlightImpact}>{item.impact}</Text>
            </View>
          ))}
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  hero: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    gap: spacing.lg,
  },
  heroCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  kicker: {
    color: colors.accent,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  headline: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
  },
  body: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  pulseWrapper: {
    width: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
  },
  pulseDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
  },
  grid: {
    gap: spacing.md,
  },
  error: {
    color: '#fca5a5',
    fontSize: 13,
  },
  offline: {
    color: colors.muted,
    fontSize: 13,
  },
  loading: {
    color: colors.text,
    fontSize: 13,
  },
  highlight: {
    padding: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radii.md,
    gap: 6,
  },
  highlightTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  highlightBody: {
    color: colors.muted,
    fontSize: 14,
  },
  highlightImpact: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
});

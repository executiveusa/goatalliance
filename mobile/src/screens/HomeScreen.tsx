import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useCachedHighlights } from '../hooks/useCachedHighlights';

export function HomeScreen(): JSX.Element {
  const { highlights, isLoading, error, refresh } = useCachedHighlights();

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{error}</Text>
        </View>
      ) : null}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        highlights.map((highlight) => (
          <View key={highlight.id} style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>{highlight.title}</Text>
            {highlight.description ? <Text>{highlight.description}</Text> : null}
            {highlight.url ? <Text style={styles.highlightLink}>{highlight.url}</Text> : null}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  banner: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  bannerText: {
    color: '#B91C1C',
    fontWeight: '600',
    textAlign: 'center',
  },
  highlightCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  highlightLink: {
    color: '#2563EB',
    marginTop: 4,
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const YouTubePlayer = ({ videoId }: { videoId: string }) => {
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1&controls=1`;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        javaScriptEnabled={true}
        source={{ uri: youtubeUrl }}
        allowsInlineMediaPlayback={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  webview: {
    borderRadius: 10,
  },
});

export default YouTubePlayer;

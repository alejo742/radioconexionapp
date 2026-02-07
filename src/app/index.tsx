import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { Svg, Path } from 'react-native-svg';
import Privacidad from '../privacidad/Privacidad';
import * as trackPlayerService from '../services/trackPlayerService';

interface SongData {
  songName: string;
  artist: string;
  albumCover: ImageSourcePropType;
}

const RadioVivo: React.FC = () => {
  const playbackState = usePlaybackState();
  const [showPrivacidad, setShowPrivacidad] = useState<boolean>(false);
  const [songData] = useState<SongData>({
    songName: 'Radio Conexión',
    artist: '102.9 FM',
    albumCover: require('@/../assets/images/tab-logo.png'),
  });
  const animationRef = useRef<number | null>(null);

  // Animated values for equalizer bars
  const animatedValues = useRef<Animated.Value[]>(
    Array.from({ length: 15 }, () => new Animated.Value(10))
  ).current;

  // Determine if player is playing based on state
  const isPlaying = playbackState.state === State.Playing;

  useEffect(() => {
    // Setup the player
    setupTrackPlayer();

    return () => {
      // Cleanup
      stopEqualizerAnimation();
    };
  }, []);

  // Start/stop equalizer animation based on playback state
  useEffect(() => {
    if (isPlaying) {
      animateEqualizer();
    } else {
      stopEqualizerAnimation();
    }
  }, [isPlaying]);

  const setupTrackPlayer = async (): Promise<void> => {
    try {
      await trackPlayerService.setupPlayer();
      await trackPlayerService.setVolume(0.8);
    } catch (error) {
      console.error('Error setting up track player:', error);
    }
  };

  const togglePlayPause = async (): Promise<void> => {
    try {
      if (isPlaying) {
        await trackPlayerService.pause();
      } else {
        await trackPlayerService.play();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const animateEqualizer = (): void => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    animationRef.current = setInterval(() => {
      animatedValues.forEach(value => {
        Animated.timing(value, {
          toValue: Math.floor(Math.random() * 90) + 10,
          duration: 100,
          useNativeDriver: false
        }).start();
      });
    }, 100);
  };

  const stopEqualizerAnimation = (): void => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.radioCard}>
        <Image
          source={songData.albumCover}
          style={styles.albumCover}
          resizeMode="cover"
        />

        <View style={styles.cardText}>
          <Text style={styles.songTitle}>{songData.songName}</Text>
          <Text style={styles.artistText}>{songData.artist}</Text>
        </View>

        <View style={styles.equalizerContainer}>
          {animatedValues.map((value, i) => (
            <Animated.View
              key={i}
              style={[
                styles.equalizerBar,
                {
                  height: value.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%']
                  }),
                  opacity: isPlaying ? 1 : 0.3
                }
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.playerControls}>
        <TouchableOpacity
          style={[styles.playButton, isPlaying && styles.playingButton]}
          onPress={togglePlayPause}
          activeOpacity={0.7}
        >
          {isPlaying ? (
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#ffffff" />
            </Svg>
          ) : (
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path d="M8 5v14l11-7z" fill="#ffffff" />
            </Svg>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.privacidadButton}
        onPress={() => setShowPrivacidad(true)}
      >
        <Text style={styles.privacidadButtonText}>Política de Privacidad</Text>
      </TouchableOpacity>

      <Modal
        visible={showPrivacidad}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPrivacidad(false)}
      >
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Privacidad />
            <Pressable
              style={styles.cerrarButton}
              onPress={() => setShowPrivacidad(false)}
            >
              <Text style={styles.cerrarButtonText}>Cerrar</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  radioCard: {
    width: '90%',
    maxWidth: 350,
    alignItems: 'center',
  },
  albumCover: {
    width: '100%',
    height: 350,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: 'rgba(196, 188, 116, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  cardText: {
    alignSelf: 'stretch',
    marginTop: 15,
  },
  songTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#CCC8C0',
    marginBottom: 5,
  },
  artistText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#808080',
  },
  equalizerContainer: {
    flexDirection: 'row',
    height: 80,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 40,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  equalizerBar: {
    flex: 1,
    marginHorizontal: 1,
    backgroundColor: '#C4BC74',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 3,
  },
  playerControls: {
    width: '90%',
    maxWidth: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C4BC74',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(196, 188, 116, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 6,
  },
  playingButton: {
    backgroundColor: '#CCC8C0',
    shadowColor: 'rgba(56, 255, 216, 0.4)',
  },
  privacidadButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#222',
    borderRadius: 8,
    alignItems: 'center',
  },
  privacidadButtonText: {
    color: '#C4BC74',
    fontSize: 16,
    fontWeight: '600',
  },
  cerrarButton: {
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cerrarButtonText: {
    color: '#C4BC74',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RadioVivo;
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
import Slider from '@react-native-community/slider';
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
  const [volume, setVolume] = useState<number>(0.8);
  const [showPrivacidad, setShowPrivacidad] = useState<boolean>(false);
  const [songData] = useState<SongData>({
    songName: 'Radio Conexión',
    artist: '102.9 FM',
    albumCover: require('@/../assets/images/tab-logo.png'),
  });
  const animationRef = useRef<NodeJS.Timeout | null>(null);

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
      await trackPlayerService.setVolume(volume);
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

  const handleVolumeChange = async (newVolume: number): Promise<void> => {
    setVolume(newVolume);
    try {
      await trackPlayerService.setVolume(newVolume);
    } catch (error) {
      console.error('Error setting volume:', error);
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

        <View style={styles.volumeControl}>
          <Svg width={24} height={24} viewBox="0 0 24 24" style={styles.volumeIcon}>
            <Path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="#e2e2f5" />
          </Svg>

          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#C4BC74"
            maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
            thumbTintColor="#C4BC74"
          />
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  volumeIcon: {
    marginRight: 10,
  },
  volumeSlider: {
    flex: 1,
    height: 40,
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
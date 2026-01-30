import TrackPlayer, {
  Capability,
  RepeatMode,
  Event,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';

/**
 * Setup the Track Player service
 * This is called once when the app starts
 */
export async function setupPlayer(): Promise<void> {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    isSetup = true;
  }

  if (isSetup) {
    await TrackPlayer.updateOptions({
      // Android specific configuration
      android: {
        // Continue playback even if the app is killed
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      
      // Set up capabilities - what the player can do
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ],
      
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause],

      // Set up notification settings for iOS
      progressUpdateEventInterval: 2,
    });

    // Add the radio stream
    await TrackPlayer.add({
      id: 'radio-conexion-stream',
      url: 'https://a9.asurahosting.com:8760/radio.mp3',
      title: 'Radio Conexión',
      artist: '102.9 FM',
      artwork: require('@/../assets/images/tab-logo.png'),
      isLiveStream: true,
    });

    // Set repeat mode to off (not needed for live streams but good practice)
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
  }
}

/**
 * Play the radio stream
 */
export async function play(): Promise<void> {
  await TrackPlayer.play();
}

/**
 * Pause the radio stream
 */
export async function pause(): Promise<void> {
  await TrackPlayer.pause();
}

/**
 * Set volume (0.0 to 1.0)
 */
export async function setVolume(volume: number): Promise<void> {
  await TrackPlayer.setVolume(volume);
}

/**
 * Get current playback state
 */
export async function getState() {
  return await TrackPlayer.getPlaybackState();
}

/**
 * Reset the player (useful for reconnecting to stream)
 */
export async function reset(): Promise<void> {
  await TrackPlayer.reset();
  await setupPlayer();
}

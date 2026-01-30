import TrackPlayer, { Event } from 'react-native-track-player';

/**
 * This service is required by react-native-track-player
 * It handles remote events (like notification controls, headphone buttons, etc.)
 */
export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
  });
}

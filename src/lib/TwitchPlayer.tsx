import React, { useEffect, useRef, useCallback, memo } from 'react';
import useScript from './hooks/useScript';
import usePrevious from './hooks/usePrevious';
import { TwitchWindow, TwitchPlayerConstructor, TwitchPlayerInstance } from './types';

export const objectCompareWithIgnoredKeys = (
  o1: Record<string, unknown>,
  o2: Record<string, unknown>,
  keysToIgnore: string[]
): boolean => {
  for (const key in o1) {
    const v1 = o1[key];
    const v2 = o2[key];

    if (v1 !== v2 && !keysToIgnore.includes(key)) {
      return true;
    }
  }

  return false;
};

export const clearElementById = (id: string) => {
  const container = document.getElementById(id);
  if (container) {
    container.innerHTML = '';
  }
};
export interface TwitchPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onEnded' | 'onPause' | 'onPlay' | 'onPlaying'> {
  channel?: string
  parent?: string | string[]
  autoplay?: boolean
  muted?: boolean
  allowFullscreen?: boolean
  hideControls?: boolean

  play?: boolean

  onReady?: (player: TwitchPlayerInstance) => void

  id?: string
  height?: string | number
  width?: string | number
}

const nonReconstructTriggeringProps: (keyof TwitchPlayerProps)[] = ['channel', 'height', 'width', 'play', 'onReady'];
const shouldReconstructPlayer = (previousProps: TwitchPlayerProps | undefined, props: TwitchPlayerProps): boolean => {
  return objectCompareWithIgnoredKeys(
    previousProps as Record<string, unknown> ?? {},
    props as Record<string, unknown>,
    nonReconstructTriggeringProps
  );
};

const onReadyDefault = () => null;

const TwitchPlayer: React.FC<TwitchPlayerProps> = (props) => {
  const {
    channel,
    parent,
    autoplay = true,
    muted = false,
    allowFullscreen = true,
    hideControls = false,
    play = false,

    onReady = onReadyDefault,

    id = 'twitch-player',
    height = 480,
    width = 940,
    ...restOfProps
  } = props;

  const { loading, error } = useScript('https://player.twitch.tv/js/embed/v1.js');
  const previousProps = usePrevious(props);
  const player = useRef<TwitchPlayerInstance>();

  const createPlayer = useCallback((Player: TwitchPlayerConstructor) => {
    clearElementById(id!);

    const player = new Player(id!, {
      channel,
      parent: typeof parent === 'string' ? [parent] : parent,
      autoplay,
      muted,
      allowfullscreen: allowFullscreen,
      playsinline: true,
      controls: !hideControls,
      height: '100%',
      width: '100%'
    });

    player.addEventListener(Player.READY, () => onReady(player));

    return player;
  }, [
    channel,
    parent,
    autoplay,
    muted,
    allowFullscreen,
    hideControls,
    id
  ]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      console.error(error);
      return;
    }

    if (!player.current || shouldReconstructPlayer(previousProps, props)) {
      player.current = createPlayer((window as TwitchWindow).Twitch!.Player!);
      return;
    }

    if (channel && previousProps?.channel !== channel) {
      player.current!.setChannel(channel);
    }

    if (play !== previousProps?.play) {
      if (play) {
        player.current!.play();
      } else {
        player.current!.pause();
      }
    }
  }, [channel, createPlayer, error, loading, play, previousProps, props]);

  if (loading) {
    return null;
  }

  return (
    <div
      id={id}
      style={{
        height,
        width
      }}
      {...restOfProps}
    />
  );
};

export default memo(TwitchPlayer);

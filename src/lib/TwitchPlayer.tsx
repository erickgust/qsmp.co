import React, { useEffect, useRef, useCallback, memo } from 'react'
import useScript from './hooks/useScript'
import usePrevious from './hooks/usePrevious'

type TwitchPlayerInstance = {
  play: () => void
  pause: () => void
  setChannel: (channel: string) => void
  addEventListener: (event: string, callback: () => void) => void
}

type TwitchPlayerConstructor = {
  new (
    id: string,
    options: {
      channel?: string
      autoplay?: boolean
      muted?: boolean
      allowfullscreen?: boolean
      playsinline?: boolean
      controls?: boolean
      height?: string | number
      width?: string | number
    },
  ): TwitchPlayerInstance
  READY: string
}

type TwitchWindow = Window & {
  Twitch?: { Player?: TwitchPlayerConstructor }
}

const objectCompareWithIgnoredKeys = (
  o1: Record<string, unknown>,
  o2: Record<string, unknown>,
  keysToIgnore: string[],
): boolean => {
  for (const key in o1) {
    const v1 = o1[key]
    const v2 = o2[key]

    if (v1 !== v2 && !keysToIgnore.includes(key)) {
      return true
    }
  }

  return false
}

const clearElementById = (id: string) => {
  const container = document.getElementById(id)
  if (container) {
    container.innerHTML = ''
  }
}
interface TwitchPlayerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onEnded' | 'onPause' | 'onPlay' | 'onPlaying'
> {
  channel?: string
  autoplay?: boolean
  play?: boolean

  onReady?: (player: TwitchPlayerInstance) => void

  id?: string
  height?: string | number
  width?: string | number
}

const nonReconstructTriggeringProps: (keyof TwitchPlayerProps)[] = [
  'channel',
  'height',
  'width',
  'play',
  'onReady',
]
const shouldReconstructPlayer = (
  previousProps: TwitchPlayerProps | undefined,
  props: TwitchPlayerProps,
): boolean => {
  return objectCompareWithIgnoredKeys(
    (previousProps as Record<string, unknown>) ?? {},
    props as Record<string, unknown>,
    nonReconstructTriggeringProps,
  )
}

const onReadyDefault = () => null

const TwitchPlayer: React.FC<TwitchPlayerProps> = (props) => {
  const {
    channel,
    autoplay = true,
    play = false,

    onReady = onReadyDefault,

    id = 'twitch-player',
    height = 480,
    width = 940,
    ...restOfProps
  } = props

  const { loading, error } = useScript(
    'https://player.twitch.tv/js/embed/v1.js',
  )
  const previousProps = usePrevious(props)
  const player = useRef<TwitchPlayerInstance | undefined>(undefined)
  // A ref, so a new inline onReady from the parent doesn't rebuild the player
  const onReadyRef = useRef(onReady)
  useEffect(() => {
    onReadyRef.current = onReady
  })

  const createPlayer = useCallback(
    (Player: TwitchPlayerConstructor) => {
      clearElementById(id!)

      const player = new Player(id!, {
        channel,
        autoplay,
        muted: false,
        allowfullscreen: true,
        playsinline: true,
        controls: true,
        height: '100%',
        width: '100%',
      })

      player.addEventListener(Player.READY, () => onReadyRef.current(player))

      return player
    },
    [channel, autoplay, id],
  )

  useEffect(() => {
    if (loading) {
      return
    }

    if (error) {
      console.error(error)
      return
    }

    if (!player.current || shouldReconstructPlayer(previousProps, props)) {
      player.current = createPlayer((window as TwitchWindow).Twitch!.Player!)
      return
    }

    if (channel && previousProps?.channel !== channel) {
      player.current!.setChannel(channel)
    }

    if (play !== previousProps?.play) {
      if (play) {
        player.current!.play()
      } else {
        player.current!.pause()
      }
    }
  }, [channel, createPlayer, error, loading, play, previousProps, props])

  if (loading) {
    return null
  }

  return (
    <div
      id={id}
      style={{
        height,
        width,
      }}
      {...restOfProps}
    />
  )
}

export default memo(TwitchPlayer)

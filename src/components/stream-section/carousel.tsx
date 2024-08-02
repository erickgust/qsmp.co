import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import { StreamDescription } from "../ui/stream-description";
import TwitchPlayer from "@/lib/TwitchPlayer";
import LazyLoad from "react-lazy-load";
import { Members } from "@/app/[lang]/page";

export type CarouselRef = {
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
};

type PropType = {
  thumbsApi?: EmblaCarouselType;
  desktopThumbsApi?: EmblaCarouselType;

  slides: Members;
  selectedIndex: number;
  isLoading?: boolean;
  options?: EmblaOptionsType;
  onSelectIndex: (index: number) => void;
  setPrevBtnDisabled: (disabled: boolean) => void;
  setNextBtnDisabled: (disabled: boolean) => void;

  dictionary: Dictionary["stream"];
};

const EmblaCarousel = forwardRef<CarouselRef, PropType>((props, ref) => {
  const {
    thumbsApi,
    desktopThumbsApi,
    slides,
    options,
    onSelectIndex,
    selectedIndex,
    isLoading,
    setPrevBtnDisabled,
    setNextBtnDisabled,
    dictionary,
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 6000,
      stopOnInteraction: true,
      playOnInit: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const firstLoad = useRef(true);
  const { type, data } = slides;
  const hasData = data.length > 0 && !isLoading;

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.stop();
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.stop();
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi && thumbsApi && desktopThumbsApi) {
        const embla = emblaApi as EmblaCarouselType;

        embla.plugins().autoplay?.stop();
        embla.scrollTo(index);
      }
    },
    [desktopThumbsApi, emblaApi, thumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !thumbsApi || !desktopThumbsApi) return;

    thumbsApi.scrollTo(emblaApi.selectedScrollSnap());
    desktopThumbsApi.scrollTo(emblaApi.selectedScrollSnap());

    onSelectIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [
    emblaApi,
    thumbsApi,
    desktopThumbsApi,
    onSelectIndex,
    setPrevBtnDisabled,
    setNextBtnDisabled,
  ]);

  useImperativeHandle(
    ref,
    () => ({
      scrollTo,
      scrollPrev,
      scrollNext,
    }),
    [scrollNext, scrollPrev, scrollTo]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("init", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative my-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y mx-auto max-w-5.5xl">
          {hasData &&
            type === "live" &&
            data.map((member, i) => (
              <div
                className="embla__slide px-8 md:px-0 group flex flex-col md:flex-row gap-6 md:mx-12 md:justify-center"
                key={i}
                data-index={i}
                data-selected={i === selectedIndex}
              >
                <LazyLoad
                  height="420px"
                  className="max-w-5.5xl group-data-[selected=true]:max-w-3xl aspect-video !w-full max-md:!h-auto"
                >
                  {member.platform == "afreeca" ? (
                    <iframe
                      src={`https://play.afreecatv.com/${member.userName}/embed`}
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <TwitchPlayer
                      channel={member.userName}
                      height="420px"
                      width="750px"
                      id={`twitch-player-${member.userName}`}
                      className="max-w-5.5xl group-data-[selected=true]:max-w-3xl aspect-video !w-full max-md:!h-auto"
                      autoplay={false}
                      play={i === selectedIndex}
                      onReady={(player) => {
                        const playCarousel = emblaApi?.plugins().autoplay?.play;

                        if (i === selectedIndex) {
                          player.play();
                        }

                        if (firstLoad.current && playCarousel) {
                          playCarousel();
                        }

                        firstLoad.current = false;
                      }}
                    />
                  )}
                </LazyLoad>

                <div className="hidden relative group-data-[selected=true]:inline-block">
                  <StreamDescription
                    dictionary={dictionary}
                    description={member.description}
                    language={member.language}
                    url={`https://twitch.tv/${member.userName}`}
                    channel={{
                      image: member.avatar,
                      name: member.name,
                    }}
                    viewerCount={member.viewerCount}
                    isLive={true}
                  />
                </div>
              </div>
            ))}

          {hasData &&
            type === "youtube" &&
            data.map((video, i) => (
              <div
                className="embla__slide px-8 md:px-0 group flex flex-col md:flex-row gap-6 md:mx-12 md:justify-center"
                key={i}
                data-index={i}
                data-selected={i === selectedIndex}
              >
                <div className="max-w-5.5xl group-data-[selected=true]:max-w-3xl !w-full h-auto md:min-h-full md:max-h-0">
                  <LiteYouTubeEmbed id={video.id} title={video.title} />
                </div>

                <div className="hidden relative group-data-[selected=true]:inline-block">
                  <StreamDescription
                    dictionary={dictionary}
                    description={video.description}
                    url={`https://www.youtube.com/watch?v=${video.id}`}
                    channel={{
                      image: video.channel.avatar,
                      name: video.channel.name,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

EmblaCarousel.displayName = "EmblaCarousel";

export default EmblaCarousel;

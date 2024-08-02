"use client";

import { ArrowOutwardRounded } from "@/assets/icons/arrow-outward";
import { ExploreOutlined } from "@/assets/icons/explore";
import * as Popover from "@radix-ui/react-popover";
import {
  animated,
  easings,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import Image from "next/image";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

type WidgetLinkProps = {
  icon: string;
  alt: string;
  title: string;
  link: string;
  color?: string;
};

function WidgetLink({
  icon,
  alt,
  title,
  link,
  color = "#FDAA3E",
}: WidgetLinkProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="font-dm-sans flex items-center justify-between p-2 rounded-md text-base font-medium text-white cursor-pointer mt-3"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center gap-2">
        <Image
          src={icon}
          alt={alt}
          width={24}
          height={24}
          className="rounded object-cover"
        />

        <span>{title}</span>
      </div>

      <ArrowOutwardRounded />
    </a>
  );
}

type WidgetProps = {
  dictionary: Dictionary["widget"];
};

export function Widget({ dictionary }: WidgetProps) {
  const [open, setOpen] = useState(false);
  const [unmounted, setUnmounted] = useState(true);
  const [triggerRef, { width: triggerWidth }] = useMeasure();
  const [isBelowViewport, setIsBelowViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springProps = useSpring({
    opacity: isBelowViewport ? 1 : 0,
    config: { duration: 200 },
    onChange: ({ value: { opacity } }) => {
      setIsVisible(opacity !== 0);
    },
    onRest: (): null => {
      setIsVisible(isBelowViewport);

      return null;
    }
  });

  const transApi = useSpringRef();
  const transition = useTransition([open], {
    ref: transApi,
    from: { width: "0%", height: 0 },
    enter: { width: "100%", height: 104 },
    leave: { width: "0%", height: 0 },
    config: { duration: 500, easing: easings.easeInOutExpo },
    onDestroyed: (): void => {
      if (!open) {
        setUnmounted(true);
      }
    },
    onStart: (): void => {
      if (open) {
        setUnmounted(false);
      }
    },
  });

  useChain(open ? [transApi] : [transApi], [0]);

  useEffect(() => {
    const windowHeight = window.innerHeight;

    function handleScroll() {
      const { scrollY } = window;
      const isBelow = scrollY > windowHeight / 2;
      setIsBelowViewport(isBelow);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <animated.div style={{
        opacity: springProps.opacity,
        visibility: isVisible ? "visible" : "hidden",
      }}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className='flex items-center justify-center box-border
            gap-2 p-3 rounded-lg text-base font-medium cursor-pointer border backdrop-blur-xl
            fixed left-4 bottom-4 sm:left-8 sm:bottom-8 font-dm-sans
            bg-widget-bg text-widget-text border-widget-border data-[state="open"]:!opacity-0'
            ref={triggerRef}
            style={{
              opacity: unmounted ? 1 : 0,
            }}
          >
            <ExploreOutlined />
            <span className="whitespace-nowrap hidden sm:inline">{dictionary.title}</span>
          </button>
        </Popover.Trigger>
        {transition((styles, item) => {
          return (
            item && (
              <Popover.Content
                align="start"
                side="top"
                sideOffset={-50}
                className="backdrop-blur-xl font-dm-sans p-3 rounded-lg font-medium text-base border bg-widget-bg text-widget-text border-widget-border overflow-hidden"
                style={{ minWidth: triggerWidth }}
                forceMount
                asChild
              >
                <animated.div style={{ width: styles.width }}>
                  <Popover.Close asChild>
                    <button type="button" className="flex items-center justify-center gap-2 bg-transparent cursor-pointer text-widget-text">
                      <ExploreOutlined />
                      <span className="whitespace-nowrap">{dictionary.title}</span>
                    </button>
                  </Popover.Close>
                  <animated.div style={{ height: styles.height }}>
                    <div className="flex flex-col overflow-hidden">
                      <WidgetLink
                        icon="/qsmp-shop.svg"
                        alt="QSMP Shop"
                        title="qsmp.shop"
                        link="https://qsmp.shop/"
                        color="#FDAA3E"
                      />
                      <WidgetLink
                        icon="/tv.svg"
                        alt="QSMP TV"
                        title="qsmp.tv"
                        link="https://qsmp.tv/"
                        color="#000120"
                      />
                    </div>
                  </animated.div>
                </animated.div>
              </Popover.Content>
            )
          );
        })}
      </animated.div>
    </Popover.Root>
  );
}

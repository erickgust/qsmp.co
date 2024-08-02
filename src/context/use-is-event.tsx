"use client";

import { createContext, useCallback, useContext, useState } from "react";

type EventProviderProps = {
  children: React.ReactNode;
};

type EventContextType = {
  isEvent: boolean;
  handleIsEvent: (value: boolean) => void;
};

const EventContext = createContext<EventContextType | null>(null);

export function EventProvider({
  children,
}: EventProviderProps) {
  const [isEvent, setIsEvent] = useState(false);

  const handleIsEvent = useCallback((value: boolean) => {
    setIsEvent(value);
  }, []);

  return (
    <EventContext.Provider
      value={{
        isEvent,
        handleIsEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export const useEvent = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "You must wrap your app with <EventProvider /> component"
    );
  }

  return context;
};

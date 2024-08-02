'use client';

import { useEffect, useState } from 'react';
import { Display } from './display';

import { getCountdown } from '@/utils/getCountdown';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function Timer() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('Oct 16, 2023 00:00:00');

    const interval = setInterval(() => {
      const countdown = getCountdown(targetDate);

      if (countdown.diff < 0) {
        clearInterval(interval);
        return;
      }

      setCountdown(countdown);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center'>
      <Display label='Days' value={countdown.days} />
      <Display label='Hours' value={countdown.hours} />
      <Display label='Minutes' value={countdown.minutes} />
      <Display label='Seconds' value={countdown.seconds} isLast />
    </div>
  );
}

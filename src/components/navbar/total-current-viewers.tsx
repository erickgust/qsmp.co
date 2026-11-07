import { useFormatter, useTranslations } from 'next-intl'
import { BroadcastIcon } from '@/assets/icons/broadcast'

type TotalViewersProps = {
  totalViewers: number
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export function TotalCurrentViewers({ totalViewers }: TotalViewersProps) {
  const t = useTranslations('nav')

  const totalViewersFormatted = useFormatter().number(totalViewers)
  const chars = [...totalViewersFormatted]

  return (
    <p className='text-xs flex gap-2 text-[#1F1E33] uppercase items-center'>
      <BroadcastIcon className='-mt-1' />

      <span className='sr-only'>{totalViewersFormatted}</span>
      <span aria-hidden className='flex whitespace-nowrap'>
        {chars.map((char, i) => {
          const key = chars.length - i
          if (!/\d/.test(char)) return <span key={key}>{char}</span>

          return (
            <span key={key} className='relative h-4 overflow-hidden'>
              <span className='invisible'>{char}</span>
              <span
                className='odometer-digit absolute inset-x-0 top-0 flex flex-col items-center'
                style={{
                  transform: `translateY(-${Number(char) * 10}%)`,
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {DIGITS.map((d) => (
                  <span key={d} className='h-4 leading-4'>
                    {d}
                  </span>
                ))}
              </span>
            </span>
          )
        })}
      </span>
      <span className='whitespace-nowrap'>{t('counter')}</span>
    </p>
  )
}

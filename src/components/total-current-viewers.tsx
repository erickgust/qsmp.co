import { useFormatter, useTranslations } from 'next-intl'
import { BroadcastIcon } from '@/assets/icons/broadcast'

type TotalViewersProps = {
  totalViewers: number
}

export function TotalCurrentViewers({ totalViewers }: TotalViewersProps) {
  const t = useTranslations('nav')

  const totalViewersFormatted = useFormatter().number(totalViewers)

  return (
    <p className='text-xs flex gap-2 text-[#1F1E33] uppercase items-center'>
      <BroadcastIcon className='-mt-1' />

      <span className='whitespace-nowrap'>{totalViewersFormatted}</span>
      <span className='whitespace-nowrap'>{t('counter')}</span>
    </p>
  )
}

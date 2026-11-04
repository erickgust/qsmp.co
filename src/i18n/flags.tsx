import type { SVGProps } from 'react'
import type { Locale } from 'next-intl'

import { GermanyFlag } from '@/assets/icons/flags/de'
import { UnitedKingdomFlag } from '@/assets/icons/flags/en'
import { SpainFlag } from '@/assets/icons/flags/es'
import { FranceFlag } from '@/assets/icons/flags/fr'
import { KoreanFlag } from '@/assets/icons/flags/kr'
import { BrazilFlag } from '@/assets/icons/flags/pt-br'

export const flags: Record<
  Locale,
  (props: SVGProps<SVGSVGElement>) => React.JSX.Element
> = {
  'pt-br': BrazilFlag,
  es: SpainFlag,
  en: UnitedKingdomFlag,
  de: GermanyFlag,
  fr: FranceFlag,
  ko: KoreanFlag,
}

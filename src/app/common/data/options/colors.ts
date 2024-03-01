import { ColorSet, ColorSetName } from './color-set';

export const COLORS = {
  PINK_CREME: new ColorSet(
    ColorSetName.PINK_CREME,
    '#ff8ba7',
    '#ce5a78',
    '#33272a',
    '#49373c',
    '#faeee7'
  ),
  GREENISH: new ColorSet(
    ColorSetName.GREENISH,
    '#057e79',
    '#004643',
    '#790505',
    '#d91d1d',
    '#abd1c6'
  )
} as const;

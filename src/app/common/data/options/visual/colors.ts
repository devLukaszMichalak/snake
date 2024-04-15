import { ColorSet, ColorSetName } from './color-set';

export const COLORS = {
  findByName: (name: ColorSetName | null | undefined): ColorSet => {
    
    switch (name) {
      case ColorSetName.PINK_CREME:
        return COLORS.PINK_CREME;
      case ColorSetName.GREENISH:
        return COLORS.GREENISH;
      case ColorSetName.SUNSET_ORANGE:
        return COLORS.SUNSET_ORANGE;
      case ColorSetName.PURPLE_HAZE:
        return COLORS.PURPLE_HAZE;
      default:
        return COLORS.PINK_CREME;
    }
  },
  
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
  ),
  SUNSET_ORANGE: new ColorSet(
    ColorSetName.SUNSET_ORANGE,
    '#ff5733',
    '#ff895e',
    '#5b2300',
    '#8e2f00',
    '#ffdac1'
  ),
  PURPLE_HAZE: new ColorSet(
    ColorSetName.PURPLE_HAZE,
    '#8368d9',
    '#b199e6',
    '#332a3c',
    '#4a4173',
    '#f4ebfc'
  )
} as const;

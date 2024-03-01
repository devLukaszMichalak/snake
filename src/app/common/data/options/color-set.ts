export class ColorSet {
  
  constructor(
    public name: ColorSetName,
    public easy: `#${string}`,
    public easyDarker: `#${string}`,
    public hard: `#${string}`,
    public hardLighter: `#${string}`,
    public cosy: `#${string}`
  ) {
  }
}

export enum ColorSetName {
  PINK_CREME = 'pink-creme',
  GREENISH = 'green'
}

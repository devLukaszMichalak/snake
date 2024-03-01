import { Difficulty } from './difficulty';

export type GameplayOptions = {
  difficulty: Difficulty,
  canPassThroughWalls: 'true' | 'false'
}

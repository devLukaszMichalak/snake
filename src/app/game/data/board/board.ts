import { Occupant } from './occupant';
import { Row } from './row';
import { Cell } from './cell';
import { Position } from './position';
import { OptionsService } from '../../../common/data/options/options.service';

export class Board {
  
  private static readonly BOARD_SIZE = 10;
  
  private board = new Map<Row, Cell[]>();
  private snakeBody = [new Position(0, 0)];
  
  constructor() {
    this.setUpBoard();
    this.setSnake();
    this.setRandomApple();
  }
  
  get rows(): Row[] {
    return Array.from(this.board.keys());
  }
  
  cells(row: Row): Cell[] {
    return Array.from(this.board.get(row)!.values());
  }
  
  isWin(): boolean {
    return !Array.from(this.board.values())
      .flat()
      .map(cell => cell.occupant)
      .find(o => o === Occupant.VOID);
  }
  
  setRandomApple() {
    const row = this.getRandom();
    const column = this.getRandom();
    const appleCellPretender = this.board.get(row)![column];
    
    if (appleCellPretender.occupant === Occupant.VOID) {
      appleCellPretender.occupant = Occupant.APPLE;
    } else {
      this.setRandomApple();
    }
  }
  
  moveLeft() {
    const head = this.getHead();
    const newHead = new Position(head.row, head.column - 1);
    
    if (newHead.column === -1) {
      
      if(!OptionsService.CAN_PASS_THROUGH_WALLS) {
        throw new Error();
      }
      
      newHead.column = Board.BOARD_SIZE - 1;
    }
    
    this.move(head, newHead);
  }
  
  moveRight() {
    const head = this.getHead();
    const newHead = new Position(head.row, head.column + 1);
    
    if (newHead.column === Board.BOARD_SIZE) {
      
      if(!OptionsService.CAN_PASS_THROUGH_WALLS) {
        throw new Error();
      }
      
      newHead.column = 0;
    }
    
    this.move(head, newHead);
  }
  
  moveUp() {
    const head = this.getHead();
    const newHead = new Position(head.row - 1, head.column);
    
    if (newHead.row === -1) {
      
      if(!OptionsService.CAN_PASS_THROUGH_WALLS) {
        throw new Error();
      }
      
      newHead.row = Board.BOARD_SIZE - 1;
    }
    
    this.move(head, newHead);
  }
  
  moveDown() {
    const head = this.getHead();
    const newHead = new Position(head.row + 1, head.column);
    
    if (newHead.row === Board.BOARD_SIZE) {
      
      if(!OptionsService.CAN_PASS_THROUGH_WALLS) {
        throw new Error();
      }
      
      newHead.row = 0;
    }
    
    this.move(head, newHead);
  }
  
  private move(oldHead: Position, newHead: Position) {
    const tail = this.snakeBody[0];
    if (this.snakeBody.length === 2 && tail.row === newHead.row && tail.column === newHead.column) {
      throw new Error();
    }
    
    const cellOccupant = this.getCellOccupant(newHead);
    if (tail.row === newHead.row && tail.column === newHead.column) {
      this.snakeBody.shift();
      this.snakeBody.push(newHead);
      this.setCellOccupant(newHead.row, newHead.column, Occupant.SNAKE_HEAD);
      this.setCellOccupant(oldHead.row, oldHead.column, Occupant.SNAKE_BODY);
      return;
    }
    
    switch (cellOccupant) {
      case Occupant.APPLE:
        this.snakeBody.push(newHead);
        this.setCellOccupant(newHead.row, newHead.column, Occupant.SNAKE_HEAD);
        this.setCellOccupant(oldHead.row, oldHead.column, Occupant.SNAKE_BODY);
        
        this.setRandomApple();
        break;
      
      case Occupant.SNAKE_BODY:
        throw new Error();
      
      case Occupant.VOID:
        this.snakeBody.push(newHead);
        this.setCellOccupant(newHead.row, newHead.column, Occupant.SNAKE_HEAD);
        this.setCellOccupant(oldHead.row, oldHead.column, Occupant.SNAKE_BODY);
        
        const tail = this.snakeBody.shift()!;
        this.setCellOccupant(tail.row, tail.column, Occupant.VOID);
        break;
    }
  }
  
  private getHead() {
    return this.snakeBody[this.snakeBody.length - 1];
  }
  
  private setUpBoard = (): void => {
    for (let i = 0; i < Board.BOARD_SIZE; i++) {
      this.board.set(i, this.initializeRow(Occupant.VOID, Board.BOARD_SIZE));
    }
  };
  
  private setSnake() {
    const row = this.getRandom();
    const column = this.getRandom();
    this.setCellOccupant(row, column, Occupant.SNAKE_HEAD);
    this.snakeBody = [new Position(row, column)];
  }
  
  private setCellOccupant(row: number, column: number, occupant: Occupant) {
    this.board.get(row)![column] = {occupant: occupant};
  }
  
  private getCellOccupant(cell: Position): Occupant {
    return this.board.get(cell.row)![cell.column].occupant;
  }
  
  private getRandom() {
    return Math.floor(Math.random() * Board.BOARD_SIZE);
  }
  
  private initializeRow = (occupantType: Occupant, size: number) => {
    const row: Cell[] = [];
    for (let i = 0; i < size; i++) {
      row.push({occupant: occupantType});
    }
    return row;
  };
}

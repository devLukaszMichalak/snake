import { Occupant } from './occupant';
import { Row } from './row';
import { Cell } from './cell';
import { Position } from './position';

export class Board {
  
  private static readonly BOARD_SIZE = 10;
  
  private board = new Map<Row, Cell[]>()
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
    let appleCellPretender = this.board.get(row)![column];
    
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
      newHead.column = Board.BOARD_SIZE - 1;
    }
    
    this.move(newHead);
  }
  
  moveRight() {
    const head = this.getHead();
    const newHead = new Position(head.row, head.column + 1);
    
    if (newHead.column === Board.BOARD_SIZE) {
      newHead.column = 0;
    }
    
    this.move(newHead);
  }
  
  moveUp() {
    const head = this.getHead();
    const newHead = new Position(head.row - 1, head.column);
    
    if (newHead.row === -1) {
      newHead.row = Board.BOARD_SIZE - 1;
    }
    
    this.move(newHead);
  }
  
  moveDown() {
    const head = this.getHead();
    const newHead = new Position(head.row + 1, head.column);
    
    if (newHead.row === Board.BOARD_SIZE) {
      newHead.row = 0;
    }
    
    this.move(newHead);
  }
  
  private move(newHead: Position) {
    
    let cellOccupant = this.getCellOccupant(newHead);
    let tail = this.snakeBody[0];
    if (tail.row === newHead.row && tail.column === newHead.column) {
      this.snakeBody.push(newHead);
      this.snakeBody.shift();
      return;
    }
    
    switch (cellOccupant) {
      case Occupant.APPLE:
        this.snakeBody.push(newHead);
        this.setCellOccupant(newHead.row, newHead.column, Occupant.SNAKE);
        this.setRandomApple();
        break;
      
      case Occupant.SNAKE:
        throw new Error();
      
      case Occupant.VOID:
        this.snakeBody.push(newHead);
        this.setCellOccupant(newHead.row, newHead.column, Occupant.SNAKE);
        
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
    const row = 1;
    const column = 1;
    this.setCellOccupant(row, column, Occupant.SNAKE);
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
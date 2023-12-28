import { Row } from './row';
import { Column } from './column';

export class Position {
  
  private readonly position: [Row, Column];
  
  constructor(row: Row, column: Column) {
    this.position = [row, column];
  }
  
  get row() {
    return this.position[0];
  }
  
  get column() {
    return this.position[1];
  }
  
  set row(row: Row) {
    this.position[0] = row;
  }
  
  set column(column: Column) {
    this.position[1] = column;
  }
  
}
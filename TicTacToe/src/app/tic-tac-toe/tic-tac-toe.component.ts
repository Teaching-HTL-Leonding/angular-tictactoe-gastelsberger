import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {
  SIZE: number = 3;
  counter: number = 0;
  cells: string[][] = [];
  message = '';
  gridTemplateColumns = '';

  constructor() {
    this.initBoard();
    this.gridTemplateColumns = `repeat(${this.SIZE}, auto)`;
    this.loadMessage();
  }

  initBoard(): void {
    for (let y = 0; y < this.SIZE; y++) {
      const row = [];
      for (let x = 0; x < this.SIZE; x++) {
        row.push('');
      }
      this.cells.push(row);
    }
  }

  handleCellClick(x: number, y: number): void {
    if (this.cells[y][x] === 'O' || this.cells[y][x] === 'X') {
      return;
    }

    this.cells[y][x] = this.getSymbol();
    this.counter++;

    if (this.checkWinner()) {
      this.message = `${this.cells[y][x]} wins!`;
    } else if (this.checkDraw()) {
      this.message = "Draw";
    } else {
      this.message = "No winner yet";
    }

    this.saveMessage();
  }

  getSymbol(): string {
    return (this.counter % 2 === 0) ? 'X' : 'O';
  }

  checkWinner(): boolean {
    for (let y = 0; y < this.SIZE; y++) {
      if (this.cells[y][0] && this.cells[y][0] === this.cells[y][1] && this.cells[y][1] === this.cells[y][2]) {
        return true;
      }
    }

    for (let x = 0; x < this.SIZE; x++) {
      if (this.cells[0][x] && this.cells[0][x] === this.cells[1][x] && this.cells[1][x] === this.cells[2][x]) {
        return true;
      }
    }

    if (this.cells[0][0] && this.cells[0][0] === this.cells[1][1] && this.cells[1][1] === this.cells[2][2]) {
      return true;
    }
    if (this.cells[0][2] && this.cells[0][2] === this.cells[1][1] && this.cells[1][1] === this.cells[2][0]) {
      return true;
    }

    return false;
  }

  checkDraw(): boolean {
    for (let y = 0; y < this.SIZE; y++) {
      for (let x = 0; x < this.SIZE; x++) {
        if (this.cells[y][x] === '') {
          return false;
        }
      }
    }
    return true;
  }

  saveMessage(): void {
    localStorage.setItem('ticTacToeMessage', this.message);
  }

  loadMessage(): void {
    const savedMessage = localStorage.getItem('ticTacToeMessage');
    if (savedMessage) {
      this.message = savedMessage;
    }
  }

  resetGame(): void {
    localStorage.removeItem('ticTacToeMessage');
    window.location.reload();
  }
}

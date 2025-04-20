export class Position {
  constructor({x, y}) {
    this.x = x;
    this.y = y;
  }

  move(dx, dy) {
    this.x = this.x + dx;
    this.y = this.y + dy;
  }
}

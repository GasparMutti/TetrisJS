export class ScoreService {
  constructor(score = 0) {
    this.score = score;
  }

  getScore() {
    return this.score;
  }

  addScore(points) {
    this.score += points;
  }

  calculateScore(rowsDeleted) {
    const pointsPerRow = {
      1: 100,
      2: 300,
      3: 500,
      4: 800,
    };
    return pointsPerRow[rowsDeleted] || 0;
  }

  resetScore() {
    this.score = 0;
  }
}

import {EVENTS} from "../domain/events/events";

export class CanvasRenderer {
  constructor({columns, rows, canvas, styles, eventBus}) {
    this.setColumns(columns);
    this.setRows(rows);
    this.setCanvas(canvas);
    this.setContext(canvas);
    this.setBlockSize(this.calculateBlockSize());
    this.setCanvasSize({
      width: this.getBlockSize() * this.columns,
      height: this.getBlockSize() * this.rows,
    });
    this.setContextScale(this.getBlockSize());
    this.setCanvasResizeHandler(this.canvasResizeHandler);
    this.setStyles(styles);
    this.setEventBus(eventBus);
  }

  getColumns() {
    return this.columns;
  }

  setColumns(columns) {
    this.columns = columns;
  }

  getRows() {
    return this.rows;
  }

  setRows(rows) {
    this.rows = rows;
  }

  getCanvas() {
    return this.canvasElement;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  getContext() {
    return this.context;
  }

  setContext(canvas) {
    this.context = canvas.getContext("2d");
  }

  getBlockSize() {
    return this.blockSize;
  }

  setBlockSize(blockSize) {
    this.blockSize = blockSize;
  }

  calculateBlockSize() {
    const {clientWidth: containerWidth, clientHeight: containerHeight} =
      this.canvas.parentElement;
    const maxBlockSizeWidth = containerWidth / this.columns;
    const maxBlockSizeHeight = containerHeight / this.rows;
    const blockSize = Math.floor(
      Math.min(maxBlockSizeHeight, maxBlockSizeWidth)
    );
    return blockSize;
  }

  setContextScale(blockSize) {
    context.scale(blockSize, blockSize);
  }

  setCanvasSize({width, height}) {
    this.setCanvasWidth(width);
    this.setCanvasHeight(height);
  }

  setCanvasWidth(width) {
    this.canvasWidth = width;
    this.canvas.setAttribute("width", width);
  }

  getCanvasWidth() {
    return this.canvasWidth;
  }

  setCanvasHeight(height) {
    this.canvasHeight = height;
    this.canvas.setAttribute("height", height);
  }

  getCanvasHeight() {
    return this.canvasHeight;
  }

  setCanvasResizeHandler(canvasResizeHandler) {
    window.addEventListener("resize", canvasResizeHandler.bind(this));
  }

  canvasResizeHandler() {
    const blockSize = this.calculateBlockSize();
    const width = blockSize * this.columns;
    const height = blockSize * this.rows;

    this.setBlockSize(blockSize);
    this.setCanvasSize({width, height});
    this.setContextScale(blockSize);
  }

  getStyles() {
    return this.styles;
  }

  setStyles(styles) {
    this.styles = styles;
  }

  drawBlock({position, color}) {
    this.context.fillStyle = color;
    this.context.fillRect(position.x, position.y, 1, 1);
  }

  drawBorder({position, color}) {
    this.context.strokeStyle = color;
    this.context.lineWidth = this.styles.getBorderWidth() / this.getBlockSize();
    this.context.strokeRect(position.x, position.y, 1, 1);
  }

  drawBoard(board) {
    let indexRow = 0;
    for (const row of board.matrix) {
      let indexBlock = 0;
      for (const block of row) {
        const color = this.styles.getColorById(block);
        const position = {x: indexBlock, y: indexRow};
        this.drawBlock({
          position,
          color,
        });
        indexBlock++;
      }
      indexRow++;
    }
  }

  drawPiece(piece) {
    let indexRow = 0;
    for (const row of piece.matrix) {
      let indexBlock = 0;
      for (const block of row) {
        if (block === 0) {
          indexBlock++;
          continue;
        }
        const position = {
          x: indexBlock + piece.position.x,
          y: indexRow + piece.position.y,
        };
        const color = this.styles.getColorById(block);
        this.drawBlock({
          position,
          color,
        });
        indexBlock++;
      }
      indexRow++;
    }
  }

  draw({board, piece}) {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawBoard(board);
    this.drawPiece(piece);
  }

  deleteCompletedRows(indexList) {
    for (const indexRow of indexList) {
      this.context.fillRect(0, indexRow, 10, 1);
    }
    this.eventBus.emit(EVENTS.BOARD_DELETED_ROWS, indexList);
  }
}

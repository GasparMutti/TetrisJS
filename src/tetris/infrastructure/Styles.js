export class Styles {
  constructor({borderWidth, borderColor, colors}) {
    this.setBorderWidth(borderWidth);
    this.setBorderColor(borderColor);
    this.setColors(colors);
  }

  getBorderWidth() {
    return this.borderWidth;
  }

  setBorderWidth(borderWidth) {
    this.borderWidth = borderWidth;
  }

  getBorderColor() {
    return this.borderColor;
  }

  setBorderColor(borderColor) {
    this.borderColor = borderColor;
  }

  getColors() {
    return this.colors;
  }

  getColorById(id) {
    return this.colors?.[id];
  }

  setColors(colors) {
    this.colors = colors;
  }
}

export class Dimensions {
  private readonly _height: number;
  private readonly _length: number;
  private readonly _width: number;

  constructor(height: number, length: number, width: number) {
    if (height <= 0 || length <= 0 || width <= 0) {
      throw new Error("As dimensões devem ser valores positivos");
    }
    this._height = height;
    this._length = length;
    this._width = width;
  }

  get height(): number {
    return this._height;
  }

  get length(): number {
    return this._length;
  }

  get width(): number {
    return this._width;
  }
}

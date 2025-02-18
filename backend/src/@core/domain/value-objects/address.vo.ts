export class Address {
  private readonly _street: string;
  private readonly _number: number;
  private readonly _city: string;
  private readonly _state: string;
  private readonly _zipCode: string;
  private readonly _country: string;

  constructor(
    number: number,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
  ) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this._country = country;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get country(): string {
    return this._country;
  }

  get fullAddress(): string {
    return `R. ${this.street}, ${this.number},${this.city}, ${this.state}, ${this.zipCode}, ${this.country}`;
  }
}

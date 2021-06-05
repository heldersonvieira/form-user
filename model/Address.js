export class Address {

    constructor(cep, street, complement, district, city, state) {

        this._cep = cep;
        this._street = street;
        this._complement = complement;
        this._district = district;
        this._city = city;
        this._state = state;
    }

    get address() {
        return {
            cep: this._cep,
            street: this._street,
            complement: this._complement,
            district: this._district,
            city: this._city,
            state: this._state
        }
    }
}
export class Person {

    constructor(name, phone, address) {

        this._name = name;
        this._phone = phone;
        this._address = address;
    }

    get nome() {
        return this._noame;
    }

    get phone() {
        return this._phone;
    }
}
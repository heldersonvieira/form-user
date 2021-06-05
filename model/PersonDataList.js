export class PersonDataList {

    constructor(trap) {

        this._peopleList = [];
        this._trap = trap;
    }

    get list() {

        return [].concat(this._peopleList);
    }

    add(person) {

        this._peopleList.push(person);
    }

    delete() {

        this._peopleList = [];
        
    }
}

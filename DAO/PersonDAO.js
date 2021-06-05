export class PersonDAO {

    constructor(connection) {

        this._connection = connection;
        this._store = 'people';
    }

    add(person) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(person)

            request.onsuccess = event => {
                resolve();
            }

            request.onerror = event => {
                reject('Não foi possível adicionar os dados na tabela');
            }

        })
    }

    deleteAll() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
    
            request.onsuccess = event => {
    
                resolve('Deleted');

            }
    
            request.onerror = event => {
    
                reject('Delete ERROR');
            }
        })
    }

    listAll() {

        return new Promise((resolve, reject) => {

            let people = [];

            let store = this._connection
                .transaction(this._store)
                .objectStore(this._store)
            
            let cursorRequest = store.openCursor();

            cursorRequest.onsuccess = event => {
                let cursor = event.target.result;

                if(cursor) {

                    people.push(cursor.value);
    
                    cursor.continue();
                } else {
                    resolve(people);
                }
            }


            cursorRequest.onerror = event => {
                reject('Não foi possível listar os dados.')
            }

        })
    }
}
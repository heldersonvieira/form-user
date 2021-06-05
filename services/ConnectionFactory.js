const dbName = 'register';
const store = ['people'];
const version = 1;

var connection = null;

export class ConnectionFactory {

    constructor() {
         
        throw new Error('Não é possível criar uma instância de ConnectionFactory');
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let request = window.indexedDB.open(dbName, version);


            request.onupgradeneeded = event => {

                ConnectionFactory._createStore(event.target.result)
            }

            request.onsuccess = event => {

                connection = event.target.result
                // console.log(event.type);
                
                resolve(connection);
            }

            request.onerror = event => {

                console.log(event.target.erro.name);
                reject(event.target.erro.name);
            }
        })
    }

    static _createStore(connection) {

        connection.createObjectStore(store, {autoIncrement: true});
    }
}

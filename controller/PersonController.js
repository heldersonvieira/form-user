import { PersonView } from '../view/PersonView.js';
import { Address } from '../model/Address.js';
import { Person } from '../model/Person.js';
import { HttpService } from '../services/HttpService.js';
import { PersonDataList } from '../model/PersonDataList.js';
import { ConnectionFactory } from '../services/ConnectionFactory.js';
import { PersonDAO } from '../DAO/PersonDAO.js';
import { Bind } from '../helper/Bind.js';
import { Validate } from '../helper/Validate.js';

export class PersonController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._name = $('[data-name]');
        this._phone = $('[data-phone]');
        this._cep = $('[data-cep]');

        this._personView = new PersonView($('.data__table'));
        this._list = new Bind(
            new PersonDataList(),
            this._personView,
            'add', 'delete'
        );
        this._address = new Address();
        this.reloaded = false;

        this._init();
    }

    _init() {
        
        if (!this.reloaded) {
            this.reloaded = true;

            ConnectionFactory.getConnection()
            .then(connection => {

                new PersonDAO(connection)
                .listAll()
                .then(people => {
                    people.forEach(person => {
                        this._list.add(person)
                    })
                })
            })
        }
    }
    
    _addPerson(event) {
        event.preventDefault();
    
        HttpService
            .searchCEP(Validate.cep(this._cep))
            .then(address => {
                let person = this._createPerson(address);
                
                this._personView.completeAddress(new Address(
                    address.cep,
                    address.logradouro,
                    address.complemento,
                    address.bairro,
                    address.localidade,
                    address.uf
                ));

                ConnectionFactory.getConnection()
                    .then(connection => {

                        new PersonDAO(connection)
                            .add(person)
                            .then(() => {
                                this._list.add(person);
                                this._clearForm();
                            })
                    })
            })
            .catch(() => {
                throw new Error('Não foi possivel adicionar os dados.');
            })      
    }

    _createPerson(address) {
        return new Person(
            this._name.value.toUpperCase(),
            Validate.phone(this._phone),
            new Address(
                address.cep,
                address.logradouro,
                address.complemento,
                address.bairro,
                address.localidade,
                address.uf
            )
        )
    }

    _clearForm() {
        document.querySelector('form').reset();
        this._name.focus();
    }

    _deleteAll(event) {
        event.preventDefault();

        ConnectionFactory.getConnection()
        .then(connection => {
            new PersonDAO(connection)
                .deleteAll()
                .then(() => {
                    this._list.delete();
                    this._personView.clearDom();
                })
        })
        .catch(erro => {
            throw new Error(erro);
        })
    }
}


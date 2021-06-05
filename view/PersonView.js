export class PersonView {

    constructor(element) {

        this._element = element;

    }

    update(model) {
        this._element.innerHTML = this._template(model);
    }

    _template(model) {

        return `
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Rua</th>
                        <th>Bairro</th>
                    </tr>
                </thead>

                <tbody>
                ${
                    model._peopleList.map(element => {
                        return `
                        <tr>
                            <td>${element._name}</td>
                            <td>${element._phone}</td>
                            <td>${element._address._street}</td>
                            <td>${element._address._district}</td>
                        </tr>
                        `
                    }).join('')
                }
                </tbody>
            </table>
        `
    }

    completeAddress(model) {
        
        let $ = document.querySelector.bind(document);

        $('[data-cep]').value = model._cep;
        $('[data-street]').value = model._street;
        $('[data-complement]').value = model._complement;
        $('[data-district]').value = model._district;
        $('[data-city]').value = model._city;
        $('[data-state]').value = model._state;
    }

    clearDom() {
        this._element.innerHTML = '';
    }
}
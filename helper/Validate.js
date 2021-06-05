const errosTypes = [
    'valueMissing', //  É um Boolean informando que o elemento tem o atributo required, mas não tem value.
    'typeMismatch', //  É um Boolean informando se o valor não corresponde ao tipo de entrada definida. (Um exemplo é quando type é email ou url).
    'patternMismatch',  //  É um Boolean informando se o valor não combina com o padrão (pattern) especificado.
    'customErrordd' //  É um Boolean informando se o elemento possui uma mensagem de validação definida por setCustomValidity() para um valor não vázio.
]

const message  = {
    name: {
        valueMissing: 'Ops! O campo nome não pode ser vazio.',
    },
    phone: {
        valueMissing: 'Digite um telefone',
        typeMismatch: 'O telefone precisa ser válido, ein!'
    },
    cep: {
        valueMissing: 'Olha o CEP aqui! Tá vazio.',
        patternMismatch: 'Digite um formato válido.',
        customError: 'Vish! Apenas números.'
    },
    street: {
        valueMissing: 'Campo rua não pode ser vazio.'
    },
    district: {
        valueMissing: 'Digite um bairro.'
    },
    city: {
        valueMissing: 'Cidade não pode ser vazia.'
    },
    state: {
        valueMissing: 'Estado não pode ser vazio.'
    }
}

const validator = {
    phone: input => Validate.phone(input),
    cep: input => Validate.cep(input)
}

export class Validate {

    static input(input) {
        let inputType = input.dataset.type;
        
        if (validator[inputType]) {
            validator[inputType](input);
            console.log(validator[inputType](input));   // entre colchetes porque estou passando o valor da variavel
        }

        if (input.validity.valid) {
            input.parentElement
                .querySelector('.msg-error').classList.remove('error');
            
            console.log(input.parentElement.querySelector('.msg-error'))
        } 
        
        if (!input.validity.valid) {
            input.parentElement
                .querySelector('.msg-error').classList.add('error');
            
            input.parentElement
                .querySelector('.msg-error')
                .innerHTML = Validate._displayMessage(inputType, input);
            console.log(input.validity.valueMissing);
            console.log(input.parentElement.querySelector('.msg-error'))
        }
    }

    static _displayMessage(inputType, input) {
        let msg = '';

        errosTypes.forEach(errorName => {

            if (input.validity[errorName])
                msg = message[inputType][errorName];
                console.log(msg);
        })

        return msg;
    }

    static phone(input) {
        let phone = input.value.replace(/\D/g, '').trim();

        return phone;
    }


    static cep(input) {
        let cep = input.value.replace(/\D/g, '').trim();

        return cep;
    }
}

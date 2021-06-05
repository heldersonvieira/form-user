

export class HttpService {

    static get(url) {

        return fetch(url)
        .then(response => {
            return response.json();
        })
        .catch(() => {
            throw new Error('Não foi possível buscar o CEP.')
        })
    }

    static searchCEP(cep) {

        return HttpService.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(address => {
                return address;
            })
            .catch(() => {
                throw new Error('Não foi possível capturar o cep');
            })
    }
}


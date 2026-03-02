function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove tudo que não for número

    if (cep.length !== 8) {
        alert('CEP inválido! O CEP deve ter 8 dígitos.');
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Limpar os campos antes de buscar o novo endereço
    document.getElementById('logradouro').textContent = '';
    document.getElementById('bairro').textContent = '';
    document.getElementById('cidade').textContent = '';
    document.getElementById('estado').textContent = '';
    document.getElementById('cepResultado').textContent = '';
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('erro').style.display = 'none'; // Esconde a mensagem de erro

    // Fetch request para a API ViaCEP
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                // Exibe a mensagem de erro caso o CEP não seja encontrado
                document.getElementById('erro').style.display = 'block';
                return;
            }

            // Preencher os campos com os dados da resposta
            document.getElementById('logradouro').textContent = data.logradouro;
            document.getElementById('bairro').textContent = data.bairro;
            document.getElementById('cidade').textContent = data.localidade;
            document.getElementById('estado').textContent = data.uf;
            document.getElementById('cepResultado').textContent = data.cep;

            // Mostrar a div de resultado
            document.getElementById('resultado').style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao buscar o endereço:', error);
            alert('Erro ao buscar o endereço. Tente novamente.');
        });
}
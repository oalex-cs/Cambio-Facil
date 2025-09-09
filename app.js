// Importando função do módulo service
import calcularConversao from "./services.js";

// Manipulando elementos em HTML (DOM)
const seletoresMoedas = document.querySelectorAll('.seletor-moeda')
const seletorServico = document.querySelector("#select-servico")
const inputValor = document.querySelector("#valor");
const btnConversor = document.querySelector("#btn-valor");
const seletorMoeda1 = document.querySelector("#moeda1");
const seletorMoeda2 = document.querySelector("#moeda2");
const exibirValor = document.querySelector("#input-exibir");
const mensagemCarregamento = document.querySelector(".carregando")



// Função assíncrona para fazer requisição e armazenar dados da API
async function buscarTaxas() {
    const resposta = await fetch(`https://v6.exchangerate-api.com/v6/3ded9cc0981187d88b9fbc61/latest/USD`) //Solicitação a API
    const dados = await resposta.json(); // Processamento da resposta e conversão para JSON

    return dados; // Retornando os dados
}

// Engrenagem principal que faz toda aplicação funcionar
async function main() {
    // mensagemCarregamento.style.display = 'flex'; // Tentativa de fazer um controle de estado, ainda falha

    const dadosAPI = await buscarTaxas();

    // mensagemCarregamento.style.display = 'none';

    preencherSeletores(dadosAPI);

    btnConversor.addEventListener("click", () => {
        const valorMoeda = parseFloat(inputValor.value);
        const moedaOrigem = seletorMoeda1.value;
        const moedaDestino = seletorMoeda2.value;
        const servico = seletorServico.value

        const valorFinal = calcularConversao(dadosAPI, valorMoeda, servico, moedaOrigem, moedaDestino);

        exibirValor.value = valorFinal.toFixed(2);

    })

}

// Função para preencher os seletores HTML com os dados de câmbios puxados da API
function preencherSeletores(dados) {
    const moedas = Object.keys(dados.conversion_rates);

    const moedasHTML = moedas.map(moeda => {
        return `<option value="${moeda}">${moeda}</option>`;
    }).join('');

    seletoresMoedas.forEach(seletor => {
        seletor.innerHTML = '';
        seletor.innerHTML = moedasHTML;
    });
};

// chamada final
main();
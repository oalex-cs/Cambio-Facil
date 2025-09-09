// Módulo com toda lógica de cálculo de taxas dentro de aplicativos de câmbio
const taxasDeServico = {
    "paypal": {
        taxaServico: 0.035,
        imposto: 0.0638
    },

    "wise": {
        taxaServico: 0.020,
        imposto: 0.0638
    }
}

// Função principal que calcula valores com taxas e impostos embutidos na transação
export default function calcularConversao(dadosApi, valor, servico, moedaOrigem, moedaDestino) {
    const taxaDeServico = taxasDeServico[servico].taxaServico;
    const taxaImposto = taxasDeServico[servico].imposto;

    const valorLiquido = valor - (valor * taxaDeServico);
    const valorImposto = valorLiquido - (valorLiquido * taxaImposto);

    const taxaOrigem = dadosApi.conversion_rates[moedaOrigem];
    const taxaDestino = dadosApi.conversion_rates[moedaDestino];

    const valorConvertido = (valorImposto / taxaOrigem) * taxaDestino;

    return valorConvertido;
}
// função de usuário executada assim que a página termina de carregar
function recebeVeiculos()
{
    // acessar o tbody da tabela, que é o elemento contêiner
    // onde o AJAX vai inserir as linhas com os dados dos veículos
    let corpoTabela = document.getElementById("corpo-tabela");

    // passo 1: criar o objeto AJAX
    let ajax = new XMLHttpRequest();

    // passo 2: associar o objeto AJAX ao arquivo PHP do servidor.
    // usamos GET porque o AJAX não leva nenhum dado, só traz os veículos;
    // o terceiro parâmetro (true) deixa a comunicação assíncrona
    ajax.open("GET", "busca-veiculos.php", true);

    // passo 3: enviar a requisição ao servidor sem nenhum dado
    ajax.send(null);

    // passo 4: quando o AJAX voltar do servidor, verificar se deu tudo certo
    // (status 200) e colocar o que o PHP devolveu (echo) dentro do tbody
    ajax.onload = function()
    {
        if (ajax.status == 200)
        {
            corpoTabela.innerHTML = ajax.responseText;
        }
        else
        {
            corpoTabela.innerHTML =
                "<tr><td colspan='3'>Erro ao buscar os veículos no servidor.</td></tr>";
        }
    };
}

// associar o evento load da janela à função recebeVeiculos
window.addEventListener("load", recebeVeiculos);
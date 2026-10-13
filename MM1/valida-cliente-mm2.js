const nome = document.getElementById("nome");
const espacoMensagem = document.getElementById("mensagem-ola");

function telaBoasVindas(){
    let nomePessoa = nome.value.trim();

    if (nomePessoa.length > 0) {
        espacoMensagem.innerHTML = "Ola, " + nomePessoa + ", seja bem-vindo(a) ao sistema de lavação de veículos.";

    } else{
        espacoMensagem.innerHTML = "";
    }
}
nome.addEventListener("blur", telaBoasVindas);
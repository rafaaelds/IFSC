<?php
// include já estava pronta da mão na massa do semestre passado. Ela conecta ao MySQL,
// cria o banco/tabelas se ainda não existirem e seleciona o lavacao_bd
include 'banco.php';

$sql = "SELECT * FROM veiculos ORDER BY id";
$resultado = $db->query($sql);

if ($resultado && $resultado->num_rows > 0) {
    // para cada veículo, o PHP monta uma linha da tabela;
    // tudo o que é dado em echo volta para o AJAX em ajax.responseText
    while ($veiculo = $resultado->fetch_assoc()) {
        $placa  = htmlspecialchars($veiculo['placa']);
        $marca  = htmlspecialchars($veiculo['marca']);
        $modelo = htmlspecialchars($veiculo['modelo']);

        echo "<tr>";
        echo "<td>$placa</td>";
        echo "<td>$marca</td>";
        echo "<td>$modelo</td>";
        echo "</tr>";
    }
} else 
    { echo "<tr><td colspan='3'>Nenhum veículo cadastrado até o momento.</td></tr>";
    }

$db->close();
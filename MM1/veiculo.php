<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Processamento - Veículo</title>
    <link rel="stylesheet" href="estilo.css">
</head>

<body>
    <div class="container">
        <?php
        include 'banco.php';

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $marca  = $db->real_escape_string(trim($_POST['marca']));
            $modelo = $db->real_escape_string(trim($_POST['modelo']));
            $placa  = $db->real_escape_string(trim($_POST['placa']));

            $sql = "INSERT INTO veiculos (marca, modelo, placa)
                    VALUES ('$marca', '$modelo', '$placa')";

            if ($db->query($sql) === TRUE) {
                echo "<h2>Veículo cadastrado com sucesso!</h2>";
            } else {
                echo "<h2>Erro ao cadastrar veículo: " . $db->error . "</h2>";
            }

            $db->close();
        }

        ?>
        <br>
        <a href="formulario_veiculo.html">Voltar ao Cadastro de Veículos</a>
        &nbsp;|&nbsp;
        <a href="formulario_cliente.html">Ir para Cadastro de Clientes</a>
        &nbsp;|&nbsp;
        <a href="home.html">Início</a>
    </div>
</body>
</html>
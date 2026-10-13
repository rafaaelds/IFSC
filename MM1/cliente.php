<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Processamento - Cliente</title>
    <link rel="stylesheet" href="estilo.css">
</head>

<body>

    <div class="container">
        <?php
        include 'banco.php';

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $nome     = $db->real_escape_string(trim($_POST['nome']));
            $usuario  = $db->real_escape_string(trim($_POST['usuario']));
            $senha    = password_hash(trim($_POST['senha']), PASSWORD_DEFAULT);
            $email    = $db->real_escape_string(trim($_POST['email']));
            $celular  = $db->real_escape_string(trim($_POST['telefone']));
            $endereco = $db->real_escape_string(trim($_POST['endereco']));

            $sql = "INSERT INTO clientes (nome, endereco, email, usuario, senha, celular)
                    VALUES ('$nome', '$endereco', '$email', '$usuario', '$senha', '$celular')";

            if ($db->query($sql) === TRUE) {
                echo "<h2>Cliente cadastrado com sucesso!</h2>";
            } else {
                echo "<h2>Erro ao cadastrar cliente: " . $db->error . "</h2>";
            }

            $db->close();
        }

        ?>
        <br>
        <a href="formulario_cliente.html">Voltar ao Cadastro de Clientes</a>
        &nbsp;|&nbsp;
        <a href="formulario_veiculo.html">Ir para Cadastro de Veículo</a>
        &nbsp;|&nbsp;
        <a href="home.html">Início</a>
    </div>

</body>
</html>
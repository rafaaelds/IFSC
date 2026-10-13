$servidor = "localhost";
$usuario  = "root";
$senha    = "";
$db = new mysqli($servidor, $usuario, $senha);

if ($db->connect_error) {
    die("Falha de conexão: " . $db->connect_error);
}

$db->set_charset("utf8mb4");
$db->query("CREATE DATABASE IF NOT EXISTS lavacao_bd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$db->select_db("lavacao_bd");
$db->query("
    CREATE TABLE IF NOT EXISTS clientes (
        id       INT AUTO_INCREMENT PRIMARY KEY,
        nome     VARCHAR(100) NOT NULL,
        endereco VARCHAR(200) NOT NULL,
        email    VARCHAR(100) NOT NULL,
        usuario  VARCHAR(50)  NOT NULL UNIQUE,
        senha    VARCHAR(255) NOT NULL,
        celular  VARCHAR(20)  NOT NULL
    )
");
$db->query("
    CREATE TABLE IF NOT EXISTS veiculos (
        id     INT AUTO_INCREMENT PRIMARY KEY,
        marca  VARCHAR(50) NOT NULL,
        modelo VARCHAR(50) NOT NULL,
        placa  VARCHAR(10) NOT NULL UNIQUE
    )
");
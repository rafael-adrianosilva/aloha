    <?php
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $database = 'crossverse_db';
    $port = 3312;

    $conn = mysqli_connect($host, $user, $password, $database, $port);
    // $conn = mysqli_connect($host, $user, $password, $database);

    $nome = $_POST['nome'];
    $convAluno = $_POST['conv/aluno'];
    $turma = $_POST['turma'];
    $telefone = $_POST['telefone'];

    if ($turma == null) {
        $turma = "Não Registrado";
    }
    if ($telefone == null) {
        $telefone = "Não Registrado";
    }

    $inserindo = "INSERT INTO jogador_aluno(
            jogador_nome,
            jogador_tipo,
            jogador_turma,
            jogador_telefone
        )VALUES(
            '$nome',
            '$convAluno',
            '$turma',
            '$telefone'
        );";

    mysqli_query($conn, $inserindo);

    mysqli_close($conn);
    header('Location: ../paginaJogo/cadastro.html');
    ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crossverse XYZ</title>
    <link rel="stylesheet" href="_css/style.css">
    <link rel="shortcut icon" href="paginaJogo/imgs/logov3.png" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</head>

<body>
    <div class="name-screen">
        <!-- <select name="playerNameInput" id="playerNameInput" style="padding: 10px;"> -->
            <?php
            $host = 'localhost';
            $user = 'root';
            $password = '';
            $database = 'crossverse_db';
            $port = 3312;
            
            $conn = mysqli_connect($host, $user, $password, $database, $port);
            // $conn = mysqli_connect($host, $user, $password, $database);
            
            $mostrar = "SELECT * FROM jogador_aluno";
            
            $executando = mysqli_query($conn, $mostrar);
            
            if (mysqli_num_rows($executando) > 0) {
                echo "<h2>Selecione o Jogador</h2>";
                echo "<select name='playerNameInput' id='playerNameInput' style='padding: 10px;'>";
                while ($linha = mysqli_fetch_array($executando)) {
                    echo "<option value='" . $linha['idplayer'] . "'>" . $linha['jogador_nome'] . "</option>";
                }
                echo "</select>";
            } else {
                echo "<h2>Digite seu Nome</h2>";
                echo "<input type='text' id='playerNameInput' placeholder='Seu nome aqui...' maxlength='20'>";
            }

            ?>
        <!-- </select> -->
        <!-- <input type="text" id="playerNameInput" placeholder="Seu nome aqui..." maxlength="20"> -->
        <button onclick="salvarNomeEContinuar()">Entrar</button>
    </div>
    <audio autoplay loop repeat id="troca" src="_media/sounds/mario.mp3" type="audio/mp3"></audio>

    <div class="game-board">
        <img src="_media/pucci.gif" class="made-in-heaven">

        <div class="tela_inicio">
            <img src="_imagens/logoSenai.png" alt="logoSenai" width="350px" class="logo-senai"><br>

            <div class="menu-buttons">
                <button onclick="iniciarGame()" class="start-button">Start Game</button>
                <button onclick="personagens()" class="start-button">Personagens</button>
                <button onclick="creditos()" class="start-button">Créditos</button>
                <button onclick="window.location.href='paginaJogo/index.html'" class="start-button">Página oficial do Jogo</button>
            </div>

            <div class="chao">
                <img src="_imagens/cenario.PNG">
            </div>
        </div>
        <div class="div-continuar">
            <p>Continuar?</p>
            <button onclick="tiraVida()">Sim</button>
            <button onclick="window.location.reload()">Não</button>
        </div>
        <div class="info-board">
            <div class="scores">
                <p id="pontos" style="color: black;">01</p>
                <p id="pontoTexto" style="visibility: hidden;">+25</p>
            </div>
            <div class="lifes">
            </div>
        </div>
        <div class="rank" style="width: 100%; position: fixed; color: white; z-index: 3; display: flex; justify-content:flex-end;">
            <table style="width: 150px; height: 150px; text-align:center; padding: 10px;">
                <thead style="color: black;">
                    <tr>
                        <th style="width: 15%;">Posição</th>
                        <th>Jogador</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Inclui o arquivo de conexão
                    require '_php/conectar.php';

                    // Busca o Top 10 do ranking
                    $sql = "SELECT name, score FROM Rank ORDER BY score DESC LIMIT 3";
    
                    $result = mysqli_query($conn, $sql);

                    if (mysqli_num_rows($result) > 0) {
                        $posicao = 1;
                        $medalhas = ['🥇', '🥈', '🥉']; // Medalhas para o Top 3

                        while ($row = mysqli_fetch_assoc($result)) {
                            // Define a medalha ou a posição normal
                            $display_posicao = ($posicao <= 3) ? '<span class="medal">' . $medalhas[$posicao - 1] . '</span>' : $posicao . 'º';

                            echo "<tr>";
                            echo "<td>" . $display_posicao . "</td>";
                            echo "<td>" . htmlspecialchars($row['name']) . "</td>";
                            echo "<td>" . number_format($row['score'], 0, ',', '.') . "</td>"; // Formata os pontos
                            echo "</tr>";
                            $posicao++;
                        }
                    } else {
                        // Mensagem para quando a tabela está vazia
                        echo '<tr><td colspan="3">Nenhum recorde encontrado. Jogue para ser o primeiro!</td></tr>';
                    }

                    // Fecha a conexão
                    mysqli_close($conn);
                    ?>
                </tbody>
            </table>
        </div>

        <img src="_imagens/clouds.png" class="clouds">

        <img src="_media/dragonair.gif" class="dragonair">
        <img src="_media/dragon.gif" class="dragon">
        <img src="_media/goku.gif" class="goku">
        <img src="_media/pretin.gif" class="pretin">
        <img src="_media/luta_epica.gif" class="goku_golpes">

        <img src="_media/gifs-principais/mario.gif" class="mario">
        <img src="_imagens/pipe.png" class="pipe">
        <img src="_imagens/coin.png" class="coin">
        <div class="sky-stars">
            <img src="_imagens/stars2.png" class="stars">
            <img src="_imagens/stars2.png" class="stars">
            <img src="_imagens/stars2.png" class="stars">
        </div>

        <div class="personagens-selec">
            <h2 class="section-title">Escolha seu Personagem</h2>
            <div class="character-grid">
                <img src="_media/gifs-startscreen/marioDancando.gif" class="marioDance" data-character="mario">
                <img src="_media/gifs-startscreen/kirby-nintendo.gif" class="kirby" data-character="kirby">
                <img src="_media/gifs-startscreen/link_Dance.gif" class="link" data-character="link">
                <img src="_media/gifs-startscreen/pikachu_parado.gif" class="pikachu" data-character="pikachu">
                <img src="_media/gifs-startscreen/batman_Dance.gif" class="batman" data-character="batman">
                <img src="_media/gifs-startscreen/luffy-inicio.gif" class="luffy" data-character="luffy">
                <img src="_media/gifs-startscreen/sonic_dance.gif" class="sonic" data-character="sonic">
                <img src="_media/gifs-principais/robertogirando.gif" class="roberto" data-character="roberto" style="transform: scaleX(-1);">

                <img src="_media/gifs-principais/mario-walking.gif" class="personagem-secreto"
                    data-character="marioSecreto" id="marioSecreto-char">
                <img src="_media/gifs-principais/super-sonic.gif" class="personagem-secreto"
                    data-character="sonicSecreto" id="sonicSecreto-char">
                <img src="_media/gifs-principais/super-mario-kart-mario.gif" class="personagem-secreto"
                    data-character="marioKart" id="marioKart-char">
                <img src="_media/gifs-principais/shadow-the-hedgehog.gif" class="personagem-secreto"
                    data-character="shadowSecreto" id="shadowSecreto-char" style="transform: scaleX(-1);">

                <img src="_media/wario.gif" class="personagem-secreto" data-character="wario" id="wario-char"
                    style="transform: scaleX(-1);">
                <!-- <img src="_media/gifs-principais/robertogirando.gif" class="personagem-secreto" data-character="roberto" id="roberto-char"> -->
                <img src="_imagens/sprites/matheus/matheus-running.gif" class="personagem-secreto" data-character="matheus" id="matheus-char">
            </div>
            <button class="olhar" onclick="olhar()">Olhar fundo</button>
        </div>
        <button class="pareiOlho" onclick="personagens()">Voltar a selecionar personagens</button>
        <img class="space" src="_media/gifs-principais/space.gif" alt="">

        <div class="creditos-area">
            <h2 class="section-title">Créditos</h2>
            <div class="credits-grid">
                <img src="_imagens/creditos/pentagon.jpg" width="20%">
                <img src="_imagens/creditos/passione.jpg" width="20%">
                <img src="_imagens/creditos/hexadev.jpg" width="25%">
                <img src="_imagens/creditos/g2.jpg" width="20%">
            </div>
        </div>

        <div class="btn-voltar">
            <button class="recarga" onclick="retornar()">Voltar para menu</button>
        </div>
    </div>

    <audio id="musicaSelecao" loop></audio>
    <audio id="musicaJogo" loop></audio>
    <audio id="moeda" src="_media/sounds/pegar-moeda.mp3"></audio>


</body>
<script src="_javascript/script.js" defer></script>

</html>

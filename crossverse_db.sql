CREATE DATABASE crossverse_db;
USE crossverse_db;

CREATE TABLE `rank` (
  `id` int(11) NOT NULL PRIMARY KEY auto_increment,
  `name` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `data_recorde` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `data_partida` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS jogador_aluno (
  `idplayer` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `jogador_nome` VARCHAR(45) NULL,
  `jogador_tipo` VARCHAR(45) NULL,
  `jogador_turma` VARCHAR(45) NULL,
  `jogadro_telefone` VARCHAR(45) NULL,
  `jogador_hora_registro` TIMESTAMP NULL
);

SELECT * FROM jogador_aluno;
SELECT * FROM `rank`;
SELECT * FROM scores;

DELETE FROM jogador_aluno;
DELETE FROM `rank`;
DELETE FROM scores;


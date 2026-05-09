<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'crossverse_db';
$port = 3312;

$conn = mysqli_connect($host, $user, $password, $database,$port);
// $conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Falha na conexão: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8");
?>
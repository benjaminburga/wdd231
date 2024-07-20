<?php
$servername = "localhost"; // Probablemente "localhost", a menos que Hostinger te haya dado un nombre de servidor diferente
$username = "u221334937_la_batuta"; // Tu nombre de usuario de la base de datos
$password = "Labatuta331767"; // Tu contraseña de la base de datos
$dbname = "Pdfs"; // El nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";
?>

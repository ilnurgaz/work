<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=my_database', 'username', 'password');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Ошибка подключения к базе данных: " . $e->getMessage();
    exit();
}

$userInput = $_POST['user_input'];

if ($userInput != "") {
    $sql = "SELECT * FROM users WHERE username = :username";

    $stmt = $pdo->prepare($sql);
    
    $stmt->bindParam(':username', $userInput, PDO::PARAM_STR);
    
    $stmt->execute();
    
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if ($result) {
        foreach ($result as $row) {
            echo "Username: " . $row['username'] . "<br>";
            echo "Email: " . $row['email'] . "<br>";
        }
    } else {
        echo "Пользователь не найден.";
    }
}
else {
    echo "Поле пустое";
}
?>
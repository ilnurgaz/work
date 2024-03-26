<?php
session_start(); 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mydb";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST['name'];
    $email = $_POST['email'];

    $sql = "SELECT * FROM user WHERE name = '$name'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['form_data'] = $_POST;
        header("Location: index.php?error=name_exists");
        exit();
    }
    else {
        $birthdate_timestamp = strtotime($_POST['date']);
        $age = floor((time() - $birthdate_timestamp) / 31556926); 
        if ($age > 18) {
            if ($_POST['gender'] == "m") {
                $gender = "Мужчина";
            }
            else {
                $gender = "Женщина";
            }
        }
        else {
            if ($_POST['gender'] == "m") {
                $gender = "Мальчик";
            }
            else {
                $gender = "Девочка";
            }
        }

        $sql = "INSERT INTO `user`(`name`, `login`, `password`, `email`, `phone`, `date`, `gender`, `image`) VALUES ('$_POST[name]','$_POST[login]','$_POST[password]','$_POST[email]','$_POST[phone]','$_POST[date]','$_POST[gender]','$_POST[image]')";

        if ($conn->query($sql) === TRUE) {
            header("Location: success.php");
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
                
            }
}

?>

<?php

$allowed_ips = array("127.0.0.1", "456.456.456.456");


$user_ip = $_SERVER['REMOTE_ADDR'];

echo $user_ip;

if (in_array($user_ip, $allowed_ips)) {
    header("Location: error.php");
    exit();
}

echo "Content";

?>
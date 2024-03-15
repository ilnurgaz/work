<?php
$filename = $_GET['filename']; 

if (preg_match('/^[a-zA-Z0-9_.]+$/', $filename)) {
    system('ls ' . $filename);
} else {
    echo "Недопустимое имя файла!";
}
?>

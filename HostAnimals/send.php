<?php

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$token = "5373250998:AAHl7kIAGhzBuJ3gFmVGc_isHUN0Ov7HooE";
$chat_id = "-1001540631283";
$arr = array(
  'Имя пользователя: ' => $name,
  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
/*
if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
*/
?>
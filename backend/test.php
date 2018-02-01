<?php
header("Content-Type: text/html; charset=UTF-8");
$salt = "IhEP0527";
$sysupassword="aust4380";
$sysupassword1="aust438010";
$a= generateHashWithSalt($sysupassword1);
function generateHashWithSalt($password) {
    //$intermediateSalt = md5(uniqid(rand(), true));
   // $salt = substr($intermediateSalt, 0, 6);
    $salt="IhEP0527";
    return hash("sha256", $password . $salt);
}
echo $a;
?>

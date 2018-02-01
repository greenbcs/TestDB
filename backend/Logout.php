<?php
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$ADC=@$_POST['ADC'];
$nameerror="QWVB";
$levelerror=99;
session_start();
$panasianame = $_SESSION["JUNONAME"];
$panasialevel = $_SESSION["JUNOLEVEL"];
if($ADC=="IHEPSYSUPANASIA"){
    $arr['list'][] = array(
        'NAME' => $nameerror,
        'LEVEL' => $levelerror,
    );
    $_SESSION["JUNONAME"]=$nameerror;
    $_SESSION["JUNOLEVEL"]=$levelerror;
}
else{
    $arr['list'][] = array(
        'NAME' => $panasianame,
        'LEVEL' => $panasialevel,
    );
}
echo json_encode($arr);
?>
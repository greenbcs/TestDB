<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$APC=@$_POST['APC'];
//$APC="BeiJingandGuangZhou";
$nameerror="QWVB";
$levelerror=99;
if($APC=="BeiJingandGuangZhou") {
    session_start();
    $panasianame = $_SESSION["JUNONAME"];
    $panasiapassword = $_SESSION["JUNOPASSWORD"];
    $panasialevel = $_SESSION["JUNOLEVEL"];
    $sqlpanasia = "select Level from pmtusers where Username='$panasianame' and Passwords='$panasiapassword'";
    $result = mysqli_query($conn, $sqlpanasia);
    $L=$levelerror;
    while ($row = mysqli_fetch_assoc($result)) {
        $L = $row['Level'];
    }
   if ($L == $panasialevel) {
    $arr['list'][] = array(
        'NAME' => $panasianame,
        'LEVEL' => $panasialevel,
    );
} else {
    $arr['list'][] = array(
        'NAME' => $nameerror,
        'LEVEL' => $levelerror,
    );
}
}
else {
    $arr['list'][] = array(
        'NAME' => $nameerror,
        'LEVEL' => $levelerror,
    );
}
echo json_encode($arr);
?>


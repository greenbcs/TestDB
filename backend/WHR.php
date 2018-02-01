<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");

$conn=mysqli_connect($server,$ur,$psw,$datab);
$sql1 = mysqli_query($conn,"select * from receive_check") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if($row1==0){
    $result=mysqli_query($conn,"select WHR from receive_check where NO ='$row1'");
}else{
    $result=mysqli_query($conn,"select WHR from receive_check where NO=(select max(NO) from receive_check)");
}
//$SN = @$_GET['SN'];
//echo $SN;
//$SN="EA0001";

while($row = mysqli_fetch_assoc($result) ) {
    $StoPo=$row['WHR'];
    echo $StoPo;
    //echo json_encode($StoPo);
}
//echo json_encode($StoPo);
//echo '<script type="text/javascript"> var v= SP;</script>';
?>
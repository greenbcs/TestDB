<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
//$SN = @$_POST['sn'];
$SN = @$_GET['SN'];
//echo $SN;
//$SN="EA0001";
$result=mysqli_query($conn,"select SP from pmts_storage where SN ='$SN'");
while($row = mysqli_fetch_assoc($result) ) {
   $StoPo=$row['SP'];
    echo $StoPo;
    //echo json_encode($StoPo);
}
//echo json_encode($StoPo);
//echo '<script type="text/javascript"> var v= SP;</script>';
?>
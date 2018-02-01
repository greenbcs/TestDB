<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");

$conn=mysqli_connect($server,$ur,$psw,$datab);
$SN = @$_POST['SN'];
//$SN ='PA1704-37';
//echo $SN;
//$SN="EA0001";
$result1=mysqli_query($conn,"select NO from receive_check where SN ='$SN'");
//$result2=mysqli_query($conn,"select NO from hamamatsudbt where SN ='$SN'");
//$result3=mysqli_query($conn,"select NO from nnvtdbt where SN ='$SN'");
while($row1 = mysqli_fetch_assoc($result1) ) {
    $StoPo=$row1['NO'];
    echo $StoPo;
    //echo json_encode($StoPo);
}
//while($row2 = mysqli_fetch_assoc($result2) ) {
   // $StoPo['NO2']=$row2['NO'];
    //echo json_encode($StoPo);
//}
//while($row3 = mysqli_fetch_assoc($result3) ) {
  //  $StoPo['NO3']=$row3['NO'];
    //echo json_encode($StoPo);
//}
//echo json_encode($StoPo);
//echo '<script type="text/javascript"> var v= SP;</script>';
?>
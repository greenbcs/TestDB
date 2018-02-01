<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");

$conn=mysqli_connect($server,$ur,$psw,$datab);
$sql1 = mysqli_query($conn,"select * from pmtdb_notice_logs") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if($row1==0){
    $result=mysqli_query($conn,"select Notice from pmtdb_notice_logs where NO ='$row1'");
}else{
    $result=mysqli_query($conn,"select Notice from pmtdb_notice_logs where NO=(select max(NO) from pmtdb_notice_logs)");
}
//$SN = @$_GET['SN'];
//echo $SN;
//$SN="EA0001";

while($row = mysqli_fetch_assoc($result) ) {
    $StoPo=$row['Notice'];
    echo $StoPo;
    //echo json_encode($StoPo);
}
//echo json_encode($StoPo);
//echo '<script type="text/javascript"> var v= SP;</script>';
?>
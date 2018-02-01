<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");

$conn=mysqli_connect($server,$ur,$psw,$datab);
$sql1 = mysqli_query($conn,"select * from pmts_storage") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if($row1==0){
    $result=mysqli_query($conn,"select SR from pmts_storage where NO ='$row1'");
}else{
    $result=mysqli_query($conn,"select SR from pmts_storage where NO=(select max(NO) from pmts_storage)");
}
while($row = mysqli_fetch_assoc($result) ) {

    $S1=$row['SR'];
    echo  $S1;
}
//echo json_encode($arr);
//echo '<script type="text/javascript"> var v= SP;</script>';
?>
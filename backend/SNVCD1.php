<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$sql1 = mysqli_query($conn,"select * from surface_geometry") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if($row1==0){
    $result=mysqli_query($conn,"select DATE from surface_geometry where NO ='$row1'");
}else{
    $result=mysqli_query($conn,"select DATE from surface_geometry where NO=(select max(NO) from surface_geometry)");
}
while($row = mysqli_fetch_assoc($result) ) {
    $StoPo=$row['DATE'];
    echo $StoPo;
    //echo json_encode($StoPo);
}

?>
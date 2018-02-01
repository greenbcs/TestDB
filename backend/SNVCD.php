<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$SN=@$_POST['SN'];
echo $SN;
$result1=mysqli_query($conn,"select * from surface_geometry where SN ='$SN'");
while($row = mysqli_fetch_assoc($result1) ) {
    $StoPo = $row['DATE'];
    echo $StoPo;
}

?>
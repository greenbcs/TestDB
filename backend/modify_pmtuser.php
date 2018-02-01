<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
$NO = @$_POST['NO'];
$username = @$_POST['username'];
$email = @$_POST['email'];
$unit = @$_POST['unit'];
$level=@$_POST['role'];
$sql = "update pmtusers set Username='$username',Email='$email',Unit='$unit',Level='$level' where NO='$NO'";
//$query = "delete from pmtusers where Username='$SN'";
if (!mysqli_query($conn,$sql))
{
    die('Error: ' . mysqli_error($conn));
}
else{
    print "<script>alert('Modify Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
}
}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to try to modify pmt DBS user data.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');window.close();</script>";
}
?>

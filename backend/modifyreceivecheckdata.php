<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
$NO = @$_POST['NO'];
$SN = @$_POST['SN'];
$WHR = @$_POST['WHR'];
$RD=@$_POST['RD'];
$MF=@$_POST['MF'];
$Type=@$_POST['Type'];
$PD=@$_POST['PD'];
$BA=@$_POST['BA'];
$WHN=@$_POST['WHN'];
$sql = "update receive_check set SN='$SN',WHR='$WHR',RD='$RD',MF='$MF',Type='$Type',PD='$PD',BA='$BA',WHN='$WHN' where NO='$NO'";
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
    $IllegalEN="Illegal to try to modify receive_check data.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');window.close();</script>";
}
?>

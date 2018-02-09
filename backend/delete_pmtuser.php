<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
$username = $_GET['pmtuser'];
$query = "delete from pmtusers where Username='$username'";
if (!mysqli_query($conn,$query))
{
    die('Error: ' . mysqli_error($conn));
}
else{print "<script>alert('Delete Success!');location.href='".$_SERVER["HTTP_REFERER"]."#management' </script>";}

}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to try to delete pmt DBS user.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."#404'</script>";
}
?>
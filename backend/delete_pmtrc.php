<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
    $SN = $_GET['pmtsn'];
    $query = "delete from receive_check where SN='$SN'";
    if (!mysqli_query($conn, $query)) {
        die('Error: ' . mysqli_error($conn));
    } else {
        print "<script>alert('Delete Success!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
    }
}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to try to delete receive_check data.";
    recordoperation($IllegalEN);
        print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."'</script>";
    }
?>
<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
$SN = $_GET['pmtsn'];
$query1 = "delete from surface_geometry where SN='$SN'";
$query2 = "delete from surface_geometry_conclution where SN='$SN'";
if (!mysqli_query($conn,$query1))
{
    die('Error: ' . mysqli_error($conn));
}else if(!mysqli_query($conn,$query2)){
    die('Error: ' . mysqli_error($conn));
}
else{print "<script>alert('Delete Success!');location.href='".$_SERVER["HTTP_REFERER"]."#query-surface-geometry' </script>";}

}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to try to delete surface_geometry and surface_geometry_conclution data.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."#404'</script>";
}
?>
<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
$logogram = @$_POST['logogram'];
$english = @$_POST['english'];
$chinese = @$_POST['chinese'];
$paraphrase=@$_POST['paraphrase'];
$sql = "update data_dictionary set English='$english',Chinese='$chinese',Paraphrase='$paraphrase' where Logogram='$logogram'";
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
    $IllegalEN="Illegal to try to modify data_dictionary data.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');window.close();</script>";
}
?>

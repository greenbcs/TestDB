<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
$sql1 = mysqli_query($conn,"select * from data_dictionary") or die(mysqli_connect_error());

$Logogram = @$_POST['logogram'];
$English = @$_POST['english'];
$Chinese = @$_POST['chinese'];
$Paraphrase = @$_POST['paraphrase'];
$sql="insert into data_dictionary (Logogram,English,Chinese,Paraphrase) values ('$Logogram','$English','$Chinese','$Paraphrase')";

if (!mysqli_query($conn,$sql))
    {
        die('Error: ' . mysqli_error($conn));
    }
    else{
        print "<script>alert('Add Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
    }
}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to add word to data dictionary.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');window.close(); </script>";
}


?>
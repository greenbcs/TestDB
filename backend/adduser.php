<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
$sql1 = mysqli_query($conn,"select * from pmtusers") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if ($row1==0){
    $num=1;
}
else{
    $sql0 = mysqli_query($conn,"select * from pmtusers where NO=(select max(NO) from pmtusers) ");
    while($row=mysqli_fetch_assoc($sql0)){
        $num=$row['NO']+1;
        //echo $num;
    }
}
$username = @$_POST['username'];
$password = @$_POST['password'];
$level = @$_POST['role'];
$unit = @$_POST['unit'];
$email = @$_POST['email'];
date_default_timezone_set('Asia/Shanghai');
$showtime=date("Y-m-d H:i:s",time());
$IPaddress=getIPaddress();
if (strlen($password)>=6)
{
$passwd=generateHashWithSalt($password);
$sql="insert into pmtusers (NO,Username,Passwords,Level,Email,Unit,RegisterIP,RegisterTime) values ('$num','$username','$passwd','$level','$email','$unit','$IPaddress','$showtime')";
if (!mysqli_query($conn,$sql))
{
    die('Error: ' . mysqli_error($conn));
}
else{
    print "<script>alert('Add Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
}
} else{
    print "<script>alert('The length of passwords is lower than 6!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
}
}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to add users";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');window.close();</script>";
}

function getIPaddress()
{

    $IPaddress='';

    if (isset($_SERVER)){

        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){

            $IPaddress = $_SERVER["HTTP_X_FORWARDED_FOR"];

        } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {

            $IPaddress = $_SERVER["HTTP_CLIENT_IP"];

        } else {

            $IPaddress = $_SERVER["REMOTE_ADDR"];

        }

    } else {

        if (getenv("HTTP_X_FORWARDED_FOR")){

            $IPaddress = getenv("HTTP_X_FORWARDED_FOR");

        } else if (getenv("HTTP_CLIENT_IP")) {

            $IPaddress = getenv("HTTP_CLIENT_IP");

        } else {

            $IPaddress = getenv("REMOTE_ADDR");

        }

    }

    return $IPaddress;

}

function generateHashWithSalt($password) {
    //$intermediateSalt = md5(uniqid(rand(), true));
    // $salt = substr($intermediateSalt, 0, 6);
    $salt="IhEP0527";
    return hash("sha256", $password . $salt);
}
?>
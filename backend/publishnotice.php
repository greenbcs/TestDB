<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
$sql1 = mysqli_query($conn,"select * from pmtdb_notice_logs") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if ($row1==0){
    $num=1;
}
else{
    $sql0 = mysqli_query($conn,"select * from pmtdb_notice_logs where NO=(select max(NO) from pmtdb_notice_logs) ");
    while($row=mysqli_fetch_assoc($sql0)){
        $num=$row['NO']+1;
        //echo $num;
    }
}
$notice = @$_POST['publishnotice'];
date_default_timezone_set('Asia/Shanghai');
$showtime=date("Y-m-d H:i:s",time());
$IPaddress=getIPaddress();
$Username="Jun Wang";
$sql = "insert into pmtdb_notice_logs (NO,Username,PublishIP,PublishTime,Notice) values ('$num','$Username','$IPaddress','$showtime','$notice')";
//$query = "delete from pmtusers where Username='$SN'";
if (!mysqli_query($conn,$sql))
{
    die('Error: ' . mysqli_error($conn));
}
else{
    print "<script>alert('Publish Success!');location.href='".$_SERVER["HTTP_REFERER"]."#admin-sets' </script>";
}
}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to publish Notice.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."#404'</script>";
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

?>

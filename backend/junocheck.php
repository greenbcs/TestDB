<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$APC=@$_POST['APC'];
$url=@$_POST['link'];
//$url='http://'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
$sql1 = mysqli_query($conn, "select * from pmtdb_access_logs") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if ($row1 == 0) {
    $num = 1;
} else {
    $sql0 = mysqli_query($conn, "select * from pmtdb_access_logs where NO=(select max(NO) from pmtdb_access_logs) ");
    while ($row = mysqli_fetch_assoc($sql0)) {
        $num = $row['NO'] + 1;
        //echo $num;
    }
}
//$APC="BeiJingandGuangZhou";
$nameerror="QWVB";
$levelerror=99;
$panasiaip=getIPaddress();
date_default_timezone_set('Asia/Shanghai');
$show_time=date("Y-m-d H:i:s",time());

if($APC=="BeiJingandGuangZhou") {
    session_start();
    $panasianame = $_SESSION["JUNONAME"];
    $panasiapassword = $_SESSION["JUNOPASSWORD"];
    $panasialevel = $_SESSION["JUNOLEVEL"];
    $sqlpanasia = "select Level from pmtusers where Username='$panasianame' and Passwords='$panasiapassword'";
    $sqlaccesslogyes="insert into pmtdb_access_logs (NO,Username,Level,Operation_Time,Operation_IP,Access_URL) values ('$num','$panasianame','$panasialevel','$show_time','$panasiaip','$url')";
    $sqlaccesslogno="insert into pmtdb_access_logs (NO,Username,Level,Operation_Time,Operation_IP,Access_URL) values ('$num','Unknown','Unknown','$show_time','$panasiaip','$url')";
    $result = mysqli_query($conn, $sqlpanasia);
    $L=$levelerror;
    while ($row = mysqli_fetch_assoc($result)) {
        $L = $row['Level'];
    }
   if ($L == $panasialevel) {
    $arr['list'][] = array(
        'NAME' => $panasianame,
        'LEVEL' => $panasialevel,
    );
       if (!mysqli_query($conn,$sqlaccesslogyes))
       {
           die('Error: ' . mysqli_error($conn));
       }

} else {
    $arr['list'][] = array(
        'NAME' => $nameerror,
        'LEVEL' => $levelerror,
    );
       if (!mysqli_query($conn,$sqlaccesslogno))
       {
           die('Error: ' . mysqli_error($conn));
       }
   }
}
else {
    $arr['list'][] = array(
        'NAME' => $nameerror,
        'LEVEL' => $levelerror,
    );
    $sqlaccesslogno="insert into pmtdb_access_logs (NO,Username,Level,Operation_Time,Operation_IP,Access_URL) values ('$num','Unknown','Unknown','$show_time','$panasiaip','$url')";
    if (!mysqli_query($conn,$sqlaccesslogno))
    {
        die('Error: ' . mysqli_error($conn));
    }
}
echo json_encode($arr);



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


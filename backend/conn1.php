<?php

$server="119.23.229.99";
$ur="pmttest";
$psw="juno20170516";
$datab="junopmttest";
$conn=mysqli_connect($server,$ur,$psw,$datab);


//$conn=mysqli_connect($server,$ur,$psw,$datab);
if (mysqli_connect_errno($conn))
{
    echo "连接 MySQL 失败: " . mysqli_connect_error();
}
mysqli_close($conn);
//mysqli_select_db($conn,$datab);
//mysqli_query("SET NAMES gb2312");
//echo 'Hello World!'


?>
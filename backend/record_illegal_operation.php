<?php
function recordoperation($IllegalEN){
    $server1="119.23.229.99";
    $ur1="pmttest";
    $psw1="juno20170516";
    $datab1="junopmttest";
    $conn1=mysqli_connect($server1,$ur1,$psw1,$datab1);
session_start();
$junoL=$_SESSION["JUNOLEVEL"];
$junoName = $_SESSION["JUNONAME"];
$JUNOIP=$_SESSION["JUNOLOGINIP"];
$sysu108 = mysqli_query($conn1,"select * from pmtdb_illegal_operation_logs") or die(mysqli_connect_error());
$row108 = mysqli_num_rows($sysu108);
    echo $row108;
if ($row108==0){
    $num108=1;
}
else{
    $sysu109 = mysqli_query($conn1,"select * from pmtdb_illegal_operation_logs where NO=(select max(NO) from pmtdb_illegal_operation_logs) ");
    while($row=mysqli_fetch_assoc($sysu109)){
        $num108=$row['NO']+1;
        //echo $num;
    }
}
    date_default_timezone_set('Asia/Shanghai');
    $show_time=date("Y-m-d H:i:s",time());
    $illegaloperation="insert into pmtdb_illegal_operation_logs(NO,Username,Level,Operation_Time,LoginIP,Illegal_Operation_EN)values('$num108','$junoName','$junoL','$show_time','$JUNOIP','$IllegalEN')";
    if (!mysqli_query($conn1,$illegaloperation))
    {
        die('Error: ' . mysqli_error($conn1));
    }
}


<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
$sql1 = mysqli_query($conn,"select * from pmts_storage") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if($row1==0){
    $num=1;
}
else{
    $sql2 = mysqli_query($conn,"select * from pmts_storage where NO=(select max(NO) from pmts_storage) ");
    while($row=mysqli_fetch_assoc($sql2)){
        $num=$row['NO']+1;
        //echo $num;
    }

}
//echo $row1;
//echo $url;
$SN = @$_GET['SN'];
$SR =@$_GET['SR'];
$SW =@$_GET['SW'];
#$SD =@$_GET['SD'];
date_default_timezone_set('Asia/Shanghai');
$SD = date("Y-m-d H:i:s",time());
$SP =@$_GET['SP'];
$Status =@$_GET['Status'];
$Stage =@$_GET['Stage'];
$SNote =@$_GET['SNote'];
//echo $WHN;
$sql0="select * from receive_check where SN ='$SN'";
$result=mysqli_query($conn,$sql0);

//$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

if (!mysqli_num_rows($result))
{
    //echo "<script>alert('We did not receive this PMT!');history.back()</script>";
    echo "<script>alert('We did not receive this PMT!');location.href='".$_SERVER["HTTP_REFERER"]."#query-storage' </script>";;
}
else
{
    $sql6="insert into pmts_storage_logs (NO,SN,SR,SW,SD,SP,Location,Stage,SNote) values ('$num','$SN','$SR','$SW','$SD','$SP','$Status','$Stage','$SNote')";
    $sql="insert into pmts_storage (NO,SN,SR,SW,SD,SP,Location,Stage,SNote) values ('$num','$SN','$SR','$SW','$SD','$SP','$Status','$Stage','$SNote') ON DUPLICATE KEY UPDATE SN='$SN',SW='$SW',SR='$SR',SD='$SD',SP='$SP',Location='$Status',Stage='$Stage',SNote='$SNote'";
   if (!mysqli_query($conn,$sql))
    {
       die('Error: ' . mysqli_error($conn));
     }
    else{print "<script>location.href='".$_SERVER["HTTP_REFERER"]."#PMTs-storage' </script>";}
    if (!mysqli_query($conn,$sql6))
    {
        die('Error: ' . mysqli_error($conn));
    }
}
}
else{
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."#404'</script>";
}
//$sql="insert into pmts_storage (NO,SN,SR,SD,SP,SNote) values ('$row1','$SN','$SR','$SD','$SP','$SNote')";
//if (!mysqli_query($conn,$sql))
//{
 //   $mes=die('Error: ' . mysqli_error($conn));
//}
//else{print "<script>alert('Add Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";}
?>


<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="2"|$junoL23=="3") {

   $sql1 = mysqli_query($conn, "select * from receive_check") or die(mysqli_connect_error());
   $row1 = mysqli_num_rows($sql1);
   if ($row1 == 0) {
      $num = 1;
   } else {
      $sql0 = mysqli_query($conn, "select * from receive_check where NO=(select max(NO) from receive_check) ");
      while ($row = mysqli_fetch_assoc($sql0)) {
         $num = $row['NO'] + 1;
         //echo $num;
      }
   }
   $SN = @$_GET['SN'];
   $WHR = @$_GET['WHR'];
#   $RD = @$_GET['RD'];
   date_default_timezone_set('Asia/Shanghai');
   $RD = date("Y-m-d H:i:s",time());
   $MF = @$_GET['MF'];
   $Type = @$_GET['Type'];
   $PD = @$_GET['PD'];
   $BA = @$_GET['BA'];
   $WHN = @$_GET['WHN'];

//echo $WHN;
   $sql = "insert into receive_check (NO,SN,WHR,RD,MF,Type,PD,BA,WHN) values ('$num','$SN','$WHR','$RD','$MF','$Type','$PD','$BA','$WHN')";
   if (!mysqli_query($conn, $sql)) {
      die('Error: ' . mysqli_error($conn));
   } else {
      if (strpos($SN,'EA')>=0)
      {
         $checkpmtindatabase=mysqli_query($conn,"select * from hamamatsudbt where SN='$SN'");
      }else{
         $checkpmtindatabase=mysqli_query($conn,"select * from nnvtdbt where SN='$SN'");
      }


      while ($row1 = mysqli_fetch_array($checkpmtindatabase)) {
         $NO1=$row1['NO'];
      }

       if($NO1==""){
           print "<script>alert('Notice: This PMT not exist in Original data table,PLease record it!(厂家原始数据中没有这支PMT，请记录下来！) ');</script>";
       }

      print "<script>;location.href='" . $_SERVER["HTTP_REFERER"] . "#receive-check' </script>";
   }
}else{
   include("record_illegal_operation.php");
   $IllegalEN="Illegal to try add data to receive_check.";
   recordoperation($IllegalEN);
   print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='" . $_SERVER["HTTP_REFERER"] . "#404' </script>";
}
//echo $row1;
//echo $url;

?>

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
   $RD = @$_GET['RD'];
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
      $checkpmtindatabase1=mysqli_query($conn,"select * from hamamatsudbt where SN='$SN'");
      $checkpmtindatabase2=mysqli_query($conn,"select * from nnvtdbt where SN='$SN'");
      while ($row1 = mysqli_fetch_array($checkpmtindatabase1)) {
         $NO1=$row1['NO'];
      }
      while ($row2= mysqli_fetch_array($checkpmtindatabase2)) {
         $NO1=$row2['NO'];
      }
       if($NO1==""&$NO2==""){
           print "<script>alert('Notice: This PMT not exist in Original data table,PLease record it!(厂家原始数据中没有这支PMT，请记录下来！) ');</script>";
       }

      print "<script>alert('Add Success!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
   }
}else{
   include("record_illegal_operation.php");
   $IllegalEN="Illegal to try add data to receive_check.";
   recordoperation($IllegalEN);
   print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}
//echo $row1;
//echo $url;

?>
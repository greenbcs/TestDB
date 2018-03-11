<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
	$sql = mysqli_query($conn,"select * from pmts_storage") or die(mysqli_connect_error());
	$row1 = mysqli_num_rows($sql);
	if($row1==0){
		$num=1;
	}
	else{
		$sql1 = mysqli_query($conn,"select * from pmts_storage where NO=(select max(NO) from pmts_storage) ");
		while($row=mysqli_fetch_assoc($sql1)){
			$num1=$row['NO']+1;
		}
		$sql2 = mysqli_query($conn,"select * from pmts_storage_logs where NO=(select max(NO) from pmts_storage_logs) ");
		while($row=mysqli_fetch_assoc($sql2)){
		    $num2=$row['NO']+1;
		}
	}
	$SR =$_POST['SR'];
	$SW =$_POST['SW'];
	$SP =$_POST['SP'];
	$Status =$_POST['Status'];
	$Stage =$_POST['Stage'];
	$SNote =$_POST['SNote'];
	date_default_timezone_set('Asia/Shanghai');
	$SD = date("Y-m-d H:i:s",time());
	$SNs = explode(",", $_POST['SNs']);
	$number=count($SNs);
	for ($i=0;$i<$number;$i++)
	{
		$SN = $SNs[$i];
		$sql3 = "select * from receive_check where SN = '$SN'";
		$result = mysqli_query($conn,$sql3);
		$row2 =  mysqli_num_rows($result);
		if ($row2 == 0)
		{
			echo "<script>alert('We did not receive this PMT!');location.href='".$_SERVER["HTTP_REFERER"]."#query-storage' </script>";;
			//echo $SN,"is not in store.\n";
		}
		else
		{
			$sql4="select BN from receive_check where SN = '$SN'";
			$result = mysqli_query($conn,$sql4);
			while($row=mysqli_fetch_assoc($result)){
				$BN=$row['BN'];
			};
			$sql5="insert into pmts_storage_logs (NO,SN,SR,SW,BN,SP,Location,Stage,SNote,SD) values ('$num2','$SN','$SR','$SW','$BN','$SP','$Status','$Stage','$SNote','$SD')";
			//echo $sql5,"<br>";
			$sql6="insert into pmts_storage (NO,SN,SR,SW,BN,SP,Location,Stage,SNote,SD) values ('$num1','$SN','$SR','$SW','$BN','$SP','$Status','$Stage','$SNote','$SD') ON DUPLICATE KEY UPDATE SN='$SN',SR='$SR',SW='$SW',BN='$BN',SP='$SP',Location='$Status',Stage='$Stage',SNote='$SNote',SD='$SD'";
			//echo $sql6;
			if (!mysqli_query($conn,$sql5))
			{
				die('Error: ' . mysqli_error($conn));
			}
			else
			{
				print "<script>location.href='".$_SERVER["HTTP_REFERER"]."#PMTs-storage' </script>";
				//echo "Success to insert ",$SN,"!\n";
			};
			if (!mysqli_query($conn,$sql6))
			{
				die('Error: ' . mysqli_error($conn));
			};
		};
		$num1 = $num1 + 1;
		$num2 = $num2 + 1;
	};
}
else{
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."#404'</script>";
};
mysqli_close($conn);
?>


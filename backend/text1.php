<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$a = array('1.01','1.05','1.18','1.20');
$c = '1';
$d='1.2';
$t = array_filter($a, function($a) use($c,$d) { return $c < $a&$a<=$d; });
sort($t);
for($index=0;$index<count($t);$index++){
    echo $t[$index];echo "</br>";
}

$QWE="nimade".",".intval(4);
echo $QWE;
echo "<script>alert('$QWE') </script>";
/*如手册上的举例*/
$email = 'user@example.com';
$domain = substr($email, 0,2);
echo $domain; // prints @example.com

for($index=0;$index<24;$index=$index+4){
    echo $index;echo "</br>";
}

$a=array("red","green","blue","yellow","brown");
print_r(array_slice($a,2));

$A=str_replace('-','/','2018/8/10');
echo $A;echo "</br>";



$conn=mysqli_connect($server,$ur,$psw,$datab);
//图1总的
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




?>



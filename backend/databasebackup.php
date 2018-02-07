<?php
header ( "content-Type: text/html; charset=utf-8" );
//备份数据库
require("conn.php");
$host=$server;
$user=$ur;//数据库账号
$password=$psw;//数据库密码
$dbname=$datab;//数据库名称
$conn=mysqli_connect($server,$ur,$psw,$datab);
//这里的账号、密码、名称都是从页面传过来的
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
if(!mysqli_connect($host,$user,$password)) //连接mysql数据库
{
    //echo '数据库连接失败，请核对后再试';
    echo "<script>alert('Connect Failed!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
    exit;
}
if(!mysqli_select_db($conn,$dbname)) //是否存在该数据库
{
    //echo '不存在数据库:'.$dbname.',请核对后再试';
    echo "<script>alert('There are not this database!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
    exit;
}
mysqli_query($conn,"set names 'utf8'");
$mysql= "set charset utf8;\r\n";
$q1=mysqli_query($conn,"show tables");
while($t=mysqli_fetch_array($q1)){
    $table=$t[0];
    $q2=mysqli_query($conn,"show create table `$table`");
    $sql=mysqli_fetch_array($q2);
    $mysql.=$sql['Create Table'].";\r\n";
    $q3=mysqli_query($conn,"select * from `$table`");
    while($data=mysqli_fetch_assoc($q3)){
        $keys=array_keys($data);
        $keys=array_map('addslashes',$keys);
        $keys=join('`,`',$keys);
        $keys="`".$keys."`";
        $vals=array_values($data);
        $vals=array_map('addslashes',$vals);
        $vals=join("','",$vals);
        $vals="'".$vals."'";
        $mysql.="insert into `$table`($keys) values($vals);\r\n";
    }
}
//$filename="data/".$dbname.date('Ymjgi').".sql"; //存放路径，默认存放到项目最外层
$filename="data/".$dbname.date('YmjHis').".sql"; //存放路径，默认存放到项目最外层
//header("Content-Disposition: attachment; filename=$DB_TBLName".$savename.".$file_ending");
$fp = fopen($filename,'w');
fputs($fp,$mysql);
fclose($fp);
//echo "数据备份成功";
echo "<script>alert('Backup Database!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to backup database";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."'</script>";
}
?>

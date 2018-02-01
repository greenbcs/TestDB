<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");

$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
if(!$conn) die(mysqli_connect_error());
//mysqli_select_db($conn,$dbname) or die("数据库连接失败！");
$result = mysqli_query($conn,"SHOW TABLES");
$total = mysqli_num_rows($result);//总记录数
$pageSize = 1000; //每页显示数
$totalPage = ceil($total/$pageSize); //总页数
$startPage = $page*$pageSize;
$arr['total'] = $total;
$arr['pageSize'] = $pageSize;
$arr['totalPage'] = $totalPage;
while($row = mysqli_fetch_array($result))
{
    $arr['list'][] = array(
        'tablename' => $row['0'],);
}
echo json_encode($arr);
?>
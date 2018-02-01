<?php

header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
$page =intval($_POST['pageNum']);
$statu=$_POST['OD'];
$FG=intval($_POST['FG']);
if($FG==1){
    $result = mysqli_query($conn, "select * from pmtdb_illegal_operation_logs") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select * from  pmtdb_illegal_operation_logs order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from pmtdb_illegal_operation_logs") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select * from pmtdb_illegal_operation_logs order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from pmtdb_illegal_operation_logs  where DATE_FORMAT(Operation_Time,'%Y-%m-%d')='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select * from  pmtdb_illegal_operation_logs where DATE_FORMAT(Operation_Time,'%Y-%m-%d')='$statu' order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'Username' => $row['Username'],
        'Level' => $row['Level'],
        'Operation_Time' => $row['Operation_Time'],
        'LoginIP' => $row['LoginIP'],
        'Illegal_Operation_EN' => $row['Illegal_Operation_EN'],

    );
}
echo json_encode($arr);}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to overview Illegal Operation Logs.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."'</script>";
}
?>
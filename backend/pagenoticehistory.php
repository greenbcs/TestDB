<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$FG=intval($_POST['FG']);
session_start();
$junoL3=$_SESSION["JUNOLEVEL"];
if($junoL3=="3") {
if($FG==1){
    $result = mysqli_query($conn, "select * from pmtdb_notice_logs") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 10; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,Username,PublishIP,PublishTime,Notice from pmtdb_notice_logs order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from pmtdb_notice_logs") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 10; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,Username,PublishIP,PublishTime,Notice from pmtdb_notice_logs order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'Username' => $row['Username'],
        'PublishIP' => $row['PublishIP'],
        'PublishTime' => $row['PublishTime'],
        'Notice' => $row['Notice'],

    );
}
echo json_encode($arr);}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to overview Notice history.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."'</script>";
}
?>
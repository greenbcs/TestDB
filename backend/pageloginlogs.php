<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$statu=$_POST['UN'];
$FG=intval($_POST['FG']);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
if($FG==1){
    $result = mysqli_query($conn, "select * from pmtusers_login_logs") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 40; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,Username,Email,Institution,LoginIP,LoginTime,Status from pmtusers_login_logs order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from pmtusers_login_logs") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 40; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,Username,Email,Institution,LoginIP,LoginTime,Status from pmtusers_login_logs order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from pmtusers_login_logs  where Username='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 40; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,Username,Email,Institution,LoginIP,LoginTime,Status from pmtusers_login_logs where Username='$statu' order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'Username' => $row['Username'],
        'Email' => $row['Email'],
        'Institution' => $row['Institution'],
        'LoginIP' => $row['LoginIP'],
        'LoginTime' => $row['LoginTime'],
        'Status' => $row['Status'],

    );
}
echo json_encode($arr);

}
else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to overview Login logs.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='".$_SERVER["HTTP_REFERER"]."'</script>";
}
?>
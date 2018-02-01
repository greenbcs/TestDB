<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$statu=$_POST['SN'];
$FG=intval($_POST['FG']);
if($FG==1){
    $result = mysqli_query($conn, "select * from receive_check") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,WHR,RD,MF,Type,PD,BA,WHN from receive_check order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from receive_check") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,WHR,RD,MF,Type,PD,BA,WHN from receive_check order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from receive_check  where SN='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,WHR,RD,MF,Type,PD,BA,WHN from receive_check where SN='$statu' order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'SN' => $row['SN'],
        'WHR' => $row['WHR'],
        'RD' => $row['RD'],
        'MF' => $row['MF'],
        'Type' => $row['Type'],
        'PD' => $row['PD'],
        'BA' => $row['BA'],
        'WHN' => $row['WHN'],

    );
}
echo json_encode($arr);
?>
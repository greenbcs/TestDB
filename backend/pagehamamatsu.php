<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$statu=$_POST['SN'];
$FG=intval($_POST['FG']);
if($FG==1){
    $result = mysqli_query($conn, "select * from hamamatsudbt") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,SK,SP,IDB,SKB,Ebb,DC,Tr,Tf,PP,AP,QE,DE,BN,TransportDate from hamamatsudbt order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from hamamatsudbt") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,SK,SP,IDB,SKB,Ebb,DC,Tr,Tf,PP,AP,QE,DE,BN,TransportDate from hamamatsudbt order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from hamamatsudbt  where SN='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,SK,SP,IDB,SKB,Ebb,DC,Tr,Tf,PP,AP,QE,DE,BN,TransportDate from hamamatsudbt where SN='$statu' order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'SN' => $row['SN'],
        'SK' => $row['SK'],
        'SP' => $row['SP'],
        'IDB' => $row['IDB'],
        'SKB' => $row['SKB'],
        'Ebb' => $row['Ebb'],
        'DC' => $row['DC'],
        'Tr' => $row['Tr'],
        'Tf' => $row['Tf'],
        'PP' => $row['PP'],
        'AP' => $row['AP'],
        'QE' => $row['QE'],
        'DE' => $row['DE'],
        'BN' => $row['BN'],
        'TransportDate' => $row['TransportDate'],
    );
}
echo json_encode($arr);
?>
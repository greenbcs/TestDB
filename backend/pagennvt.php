<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$statu=$_POST['SN'];
$FG=intval($_POST['FG']);
if($FG==1){
    $result = mysqli_query($conn, "select * from nnvtdbt") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,CD,SN,NQE,HV,G,PvsV,R,DE,DR,TTS,PP,AP,NL,RT,FT,VS,BN,TransportDate from nnvtdbt order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from nnvtdbt") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,CD,SN,NQE,HV,G,PvsV,R,DE,DR,TTS,PP,AP,NL,RT,FT,VS,BN,TransportDate from nnvtdbt order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from nnvtdbt  where SN='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,CD,SN,NQE,HV,G,PvsV,R,DE,DR,TTS,PP,AP,NL,RT,FT,VS,BN,TransportDate from nnvtdbt where SN='$statu' order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'CD' => $row['CD'],
        'SN' => $row['SN'],
        'NQE' => $row['NQE'],
        'HV' => $row['HV'],
        'G' => $row['G'],
        'PvsV' => $row['PvsV'],
        'R' => $row['R'],
        'DE' => $row['DE'],
        'DR' => $row['DR'],
        'TTS' => $row['TTS'],
        'PP' => $row['PP'],
        'AP' => $row['AP'],
        'NL' => $row['NL'],
        'RT' => $row['RT'],
        'FT' => $row['FT'],
        'VS' => $row['VS'],
        'BN' => $row['BN'],
        'TransportDate' => $row['TransportDate'],

    );
}
echo json_encode($arr);
?>
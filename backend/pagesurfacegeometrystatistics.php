<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$statu=$_POST['SN'];
$FG=intval($_POST['FG']);
$SELECTED=$_POST['SELECT'];

if($FG==1){
    $sql="select * from surface_geometry_conclution where conclution814='$SELECTED'";
    if (strlen($SELECTED)>20){$sql="select * from surface_geometry_conclution ";}

    $result = mysqli_query($conn, $sql) or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, $sql.=" order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $sql="select * from surface_geometry_conclution where conclution814='$SELECTED'";
    if (strlen($SELECTED)>20){$sql="select * from surface_geometry_conclution ";}
    $result = mysqli_query($conn, $sql) or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, $sql.=" order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $sql="select * from surface_geometry_conclution where SN='$statu' and conclution814='$SELECTED'";
    if (strlen($SELECTED)>20){$sql="select * from surface_geometry_conclution where SN='$statu'";}
    $result = mysqli_query($conn, $sql) or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, $sql.=" order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'DATE' => $row['DATE'],
        'SN' => $row['SN'],
        'Diameter' => $row['Diameter'],
        'Dislocation_flange' => $row['Dislocation_flange'],
        'Gap_flange' => $row['Gap_flange'],
        'Crack' => $row['Crack'],
        'upBubble35_quality' => $row['upBubble35_quality'],
        'upBubble135_quality' => $row['upBubble135_quality'],
        'downBubble5_quality' => $row['downBubble5_quality'],
        'downBubble25_quality' => $row['downBubble25_quality'],
        'Scratch50_quality' => $row['Scratch50_quality'],
        'Scratch1050_quality' => $row['Scratch1050_quality'],
        'Uneven_quality' => $row['Uneven_quality'],
        'Black3_qulity' => $row['Black3_qulity'],
        'Black13_qulity' => $row['Black13_qulity'],
        'White3_quality' => $row['White3_quality'],
        'upBubble135_Black13_quality' => $row['upBubble135_Black13_quality'],
        'Other_quality' => $row['Other_quality'],
        'Open_bubble_quality' => $row['Open_bubble_quality'],
        'conclution814' => $row['conclution814'],
        'conclution' => $row['conclution'],

    );
}
echo json_encode($arr);
?>
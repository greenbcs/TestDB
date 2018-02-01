<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$statu=$_POST['SN'];
$FG=intval($_POST['FG']);
if($FG==1){
    $result = mysqli_query($conn, "select * from surface_geometry") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select * from surface_geometry order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from surface_geometry") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select * from surface_geometry order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from surface_geometry  where SN='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select * from surface_geometry where SN='$statu' order by NO ASC limit $startPage,$pageSize");

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
        'Bubble_a' => $row['Bubble_a'],
        'Bubble_b' => $row['Bubble_b'],
        'Bubble_effective' => $row['Bubble_effective'],
        'Scratch_a' => $row['Scratch_a'],
        'Scratch_b' => $row['Scratch_b'],
        'Uneven_a' => $row['Uneven_a'],
        'Uneven_b' => $row['Uneven_b'],
        'Black_impurity_a' => $row['Black_impurity_a'],
        'Black_impurity_b' => $row['Black_impurity_b'],
        'Black_impurity_effective' => $row['Black_impurity_effective'],
        'White_impurity_a' => $row['White_impurity_a'],
        'White_impurity_b' => $row['White_impurity_b'],
        'White_impurity_effective' => $row['White_impurity_effective'],
        'Other_a' => $row['Other_a'],
        'Other_b' => $row['Other_b'],
        'Open_bubble_a' => $row['Open_bubble_a'],
        'Open_bubble_b' => $row['Open_bubble_b'],

    );
}
echo json_encode($arr);
?>
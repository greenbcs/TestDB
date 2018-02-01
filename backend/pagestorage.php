<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$statu=$_POST['SN'];
$FG=intval($_POST['FG']);
$ITEM=intval($_POST['ITEM']);
if($ITEM==2)
{
    if($FG==1){
    $result = mysqli_query($conn, "select * from pmts_storage") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from pmts_storage") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from pmts_storage  where SN='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $pageSize = 20; //每页显示数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage where SN='$statu' order by NO ASC limit $startPage,$pageSize");

}

}
elseif($ITEM==3)
{
    if($FG==1){
        $result = mysqli_query($conn, "select * from pmts_storage") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage where Location='SHELF' order by NO desc limit $startPage,$pageSize");
    }
    elseif($FG==2){
        $result = mysqli_query($conn, "select * from pmts_storage") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage where Location='SHELF' order by NO ASC limit $startPage,$pageSize");

    }
    elseif($FG==3){
        $result = mysqli_query($conn, "select * from pmts_storage  where SN='$statu'") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage where SN='$statu' and Location='SHELF' order by NO ASC limit $startPage,$pageSize");

    }

}
elseif($ITEM==4)
{
    if($FG==1){
        $result = mysqli_query($conn, "select * from pmts_storage") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage where Location='CONTAINER1' order by NO desc limit $startPage,$pageSize");
    }
    elseif($FG==2){
        $result = mysqli_query($conn, "select * from pmts_storage") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage where Location='CONTAINER1' order by NO ASC limit $startPage,$pageSize");

    }
    elseif($FG==3){
        $result = mysqli_query($conn, "select * from pmts_storage  where SN='$statu'") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage where SN='$statu' and Location='CONTAINER1' order by NO ASC limit $startPage,$pageSize");

    }
}
elseif($ITEM==1)
{
    if($FG==1){
        $result = mysqli_query($conn, "select * from pmts_storage_logs") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage_logs order by NO desc limit $startPage,$pageSize");
    }
    elseif($FG==2){
        $result = mysqli_query($conn, "select * from pmts_storage_logs") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage_logs order by NO ASC limit $startPage,$pageSize");

    }
    elseif($FG==3){
        $result = mysqli_query($conn, "select * from pmts_storage_logs  where SN='$statu'") or die(mysqli_connect_error());
        $total = mysqli_num_rows($result);//总记录数
        $pageSize = 20; //每页显示数
        $totalPage = ceil($total / $pageSize); //总页数
        $startPage = $page * $pageSize;
        $arr['total'] = $total;
        $arr['pageSize'] = $pageSize;
        $arr['totalPage'] = $totalPage;
        $query = mysqli_query($conn, "select NO,SN,SR,SW,SD,SP,Location,Stage,SNote from pmts_storage_logs where SN='$statu' order by NO ASC limit $startPage,$pageSize");

    }
}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'SN' => $row['SN'],
        'SR' => $row['SR'],
        'SW' => $row['SW'],
        'SD' => $row['SD'],
        'SP' => $row['SP'],
        'Location' => $row['Location'],
        'Stage' => $row['Stage'],
        'SNote' => $row['SNote'],
    );
}
echo json_encode($arr);

?>
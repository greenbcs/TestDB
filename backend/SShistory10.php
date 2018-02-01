<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$query = mysqli_query($conn, "select NO,SN,SD,Location from pmts_storage order by NO desc limit $page,12");
//limit is (0,12]
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'SN' => $row['SN'],
        'SD' => $row['SD'],
        'Location' => $row['Location'],

    );
}
echo json_encode($arr);
?>
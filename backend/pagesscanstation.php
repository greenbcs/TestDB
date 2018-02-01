<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = intval($_POST['pageNum']);
$pageSize = 10; //每页显示数
$statu=$_POST['SN'];
$FG=intval($_POST['FG']);
if($FG==1){
    $result = mysqli_query($conn, "select * from scan_system_data") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,scan_id,pmt_type,pmt_sn,emf,amp,date,comment,n_zenith,n_azimuth,coeffs,pde6,pde4,pde7,pde1,pde1_sig,pde4_sig,pde6_sig,pde7_sig,mu_map,gain_map,hist_map from scan_system_data order by NO desc limit $startPage,$pageSize");
}
elseif($FG==2){
    $result = mysqli_query($conn, "select * from scan_system_data") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,scan_id,pmt_type,pmt_sn,emf,amp,date,comment,n_zenith,n_azimuth,coeffs,pde6,pde4,pde7,pde1,pde1_sig,pde4_sig,pde6_sig,pde7_sig,mu_map,gain_map,hist_map from scan_system_data order by NO ASC limit $startPage,$pageSize");

}
elseif($FG==3){
    $result = mysqli_query($conn, "select * from scan_system_data  where pmt_sn='$statu'") or die(mysqli_connect_error());
    $total = mysqli_num_rows($result);//总记录数
    $totalPage = ceil($total / $pageSize); //总页数
    $startPage = $page * $pageSize;
    $arr['total'] = $total;
    $arr['pageSize'] = $pageSize;
    $arr['totalPage'] = $totalPage;
    $query = mysqli_query($conn, "select NO,scan_id,pmt_type,pmt_sn,emf,amp,date,comment,n_zenith,n_azimuth,coeffs,pde6,pde4,pde7,pde1,pde1_sig,pde4_sig,pde6_sig,pde7_sig,mu_map,gain_map,hist_map from scan_system_data where pmt_sn='$statu' order by NO ASC limit $startPage,$pageSize");

}
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'scan_id' => $row['scan_id'],
        'pmt_type' => $row['pmt_type'],
        'pmt_sn' => $row['pmt_sn'],
        'emf' => $row['emf'],
        'amp' => $row['amp'],
        'date' => $row['date'],
        'comment' => $row['comment'],
        'n_zenith' => $row['n_zenith'],
        'n_azimuth' => $row['n_azimuth'],
        'coeffs' => $row['coeffs'],
        'pde6' => $row['pde6'],
        'pde4' => $row['pde4'],
        'pde7' => $row['pde7'],
        'pde1' => $row['pde1'],
        'pde1_sig' => $row['pde1_sig'],
        'pde4_sig' => $row['pde4_sig'],
        'pde6_sig' => $row['pde6_sig'],
        'pde7_sig' => $row['pde7_sig'],
        'mu_map' => $row['mu_map'],
        'gain_map' => $row['gain_map'],
        'hist_map' => $row['hist_map'],

    );
}
echo json_encode($arr);
?>
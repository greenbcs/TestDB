<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$deliverynnvt=mysqli_query($conn, "select * from nnvtdbt") or die(mysqli_connect_error());
$deliverynnvttotal=mysqli_num_rows($deliverynnvt);//总记录数
$deliveryhamamatsu= mysqli_query($conn, "select * from hamamatsudbt") or die(mysqli_connect_error());
$deliveryhamamatsutotal=mysqli_num_rows($deliveryhamamatsu);//总记录数

$warehousingnnvt=mysqli_query($conn, "select * from receive_check where MF='NNVT'") or die(mysqli_connect_error());
$warehousingnnvttotal=mysqli_num_rows($warehousingnnvt);
$warehousinghamamatsu=mysqli_query($conn, "select * from receive_check where MF='Hamamatsu'") or die(mysqli_connect_error());
$warehousinghamamatsutotal=mysqli_num_rows($warehousinghamamatsu);

$totalwarehousing=$warehousingnnvttotal+$warehousinghamamatsutotal;
$totaldelivery=$deliverynnvttotal+$deliveryhamamatsutotal;

//echo $totalwarehousing,'!',$totaldelivery;
$result1=mysqli_query($conn,"select DATE_FORMAT(RD,'%Y-%m-%d') as times ,count(MF) as totalpmt,sum(MF='Hamamatsu') as HamamatsuTotal, sum(MF='NNVT') as NNVTTotal,TIMESTAMPDIFF(SECOND,min(RD),max(RD))/60 as dm, count(MF)/IF(TIMESTAMPDIFF(SECOND,min(RD),max(RD))/60=0,1,TIMESTAMPDIFF(SECOND,min(RD),max(RD))/60) as warehousingspeed from receive_check group by DATE_FORMAT(RD,'%Y-%m-%d')") or die(mysqli_connect_error());
//$result2=mysqli_query($conn,"select TIMESTAMPDIFF(SECOND,min(RD),max(RD)) as dm from receive_check group by DATE_FORMAT(RD,'%Y-%m-%d')") or die(mysqli_connect_error());
//{"deliverynnvttotal":2015,"deliveryhamamatsutotal":1760,"warehousingnnvttotal":2,"warehousinghamamatsutotal":2,"totalwarehousing":4,"totaldelivery":3775,"list":[{"times":"2017-09-08","totalpmt":"1","HamamatsuTotal":"1","NNVTTotal":"0","dm":"0"},{"times":"2017-09-17","totalpmt":"3","HamamatsuTotal":"1","NNVTTotal":"2","dm":"27"}]}
$result2=mysqli_query($conn,"select DATE_FORMAT(RD,'%Y-%m') as months ,count(MF) as monthstotalpmt,sum(MF='Hamamatsu') as monthsHamamatsuTotal, sum(MF='NNVT') as monthsNNVTTotal from receive_check group by DATE_FORMAT(RD,'%Y-%m')") or die(mysqli_connect_error());
$result3=mysqli_query($conn,"select TransportDate,BatchNumber,Quanlity  from transport_statistics where Manufactures='Hamamatsu' order by BatchNumber ASC") or die(mysqli_connect_error());
$result4=mysqli_query($conn,"select TransportDate,BatchNumber,Quanlity  from transport_statistics where Manufactures='NNVT' order by BatchNumber ASC") or die(mysqli_connect_error());

$arr['deliverynnvttotal']=$deliverynnvttotal;
$arr['deliveryhamamatsutotal']=$deliveryhamamatsutotal;
$arr['warehousingnnvttotal']=$warehousingnnvttotal;
$arr['warehousinghamamatsutotal']=$warehousinghamamatsutotal;
$arr['totalwarehousing']=$totalwarehousing;
$arr['totaldelivery']=$totaldelivery;
while ($row = mysqli_fetch_array($result1)) {
    $arr['list'][] = array(
        'times' => $row['times'],
        'totalpmt'=>$row['totalpmt'],
        'HamamatsuTotal'=>$row['HamamatsuTotal'],
        'NNVTTotal'=>$row['NNVTTotal'],
        'dm'=>$row['dm'],
        'warehousingspeed'=>$row['warehousingspeed'],
    );
}
while ($row1 = mysqli_fetch_array($result2)) {
    $arr['list1'][] = array(
        'months' => $row1['months'],
        'monthstotalpmt'=>$row1['monthstotalpmt'],
        'monthsHamamatsuTotal'=>$row1['monthsHamamatsuTotal'],
        'monthsNNVTTotal'=>$row1['monthsNNVTTotal'],
    );
}
while ($row2 = mysqli_fetch_array($result3)) {
    $arr['list2'][] = array(
        'HamaTransportDate' => $row2['TransportDate'],
        'HamaBatchNumber'=>$row2['BatchNumber'],
        'HamaQuanlity'=>$row2['Quanlity'],
    );
}
while ($row3 = mysqli_fetch_array($result4)) {
    $arr['list3'][] = array(
        'NNVTTransportDate' => $row3['TransportDate'],
        'NNVTBatchNumber'=>$row3['BatchNumber'],
        'NNVTQuanlity'=>$row3['Quanlity'],
    );
}
echo json_encode($arr);
?>
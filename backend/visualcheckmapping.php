<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
//图1总的

$IND=mysqli_query($conn, "select * from surface_geometry_conclution where conclution814='Indetermination'") or die(mysqli_connect_error());
$INDtotal=mysqli_num_rows($IND);
$Qu=mysqli_query($conn, "select * from surface_geometry_conclution where conclution814='Qualification'") or die(mysqli_connect_error());
$Qutotal=mysqli_num_rows($Qu);
$Disqu=mysqli_query($conn, "select * from surface_geometry_conclution where conclution814='Disqualification'") or die(mysqli_connect_error());
$Disqutotal=mysqli_num_rows($Disqu);
//图2NNVT总的
$INnnvt=mysqli_query($conn, "select * from surface_geometry_conclution where SN like '%PA%'and conclution814='Indetermination'") or die(mysqli_connect_error());
$INnnvttotal=mysqli_num_rows($INnnvt);
$Qunnvt=mysqli_query($conn, "select * from surface_geometry_conclution where SN like 'PA%' and conclution814='Qualification'") or die(mysqli_connect_error());
$Qunnvttotal=mysqli_num_rows($Qunnvt);
$Disqunnvt=mysqli_query($conn, "select * from surface_geometry_conclution where SN like 'PA%' and conclution814='Disqualification'") or die(mysqli_connect_error());
$Disqunnvttotal=mysqli_num_rows($Disqunnvt);
//图2Hamamatsu总的
$INhamamastu=mysqli_query($conn, "select * from surface_geometry_conclution where SN like '%EA%' and conclution814='Indetermination'") or die(mysqli_connect_error());
$INhamamastutotal=mysqli_num_rows($INhamamastu);
$Quhamamastu=mysqli_query($conn, "select * from surface_geometry_conclution where SN like '%EA%' and conclution814='Qualification'") or die(mysqli_connect_error());
$Quhamamastutotal=mysqli_num_rows($Quhamamastu);
$Disquhamamastu=mysqli_query($conn, "select * from surface_geometry_conclution where SN like '%EA%' and conclution814='Disqualification'") or die(mysqli_connect_error());
$Disquhamamastutotal=mysqli_num_rows($Disquhamamastu);
//按天,月统计
$sql1=mysqli_query($conn,"select DATE_FORMAT(DATE,'%Y-%m-%d') as days ,count(NO) as daytotalpmt,sum(SN like 'EA%' and conclution814='Indetermination') as DHITotal,sum(SN like 'EA%' and conclution814='Qualification') as DHQTotal, sum(SN like 'EA%' and conclution814='Disqualification') as DHDTotal,sum(SN like 'PA%' and conclution814='Indetermination') as DNITotal,sum(SN like 'PA%' and conclution814='Qualification') as DNQTotal, sum(SN like 'PA%' and conclution814='Disqualification') as DNDTotal from surface_geometry_conclution group by DATE_FORMAT(DATE,'%Y-%m-%d')") or die(mysqli_connect_error());
$sql2=mysqli_query($conn,"select DATE_FORMAT(DATE,'%Y-%m') as months ,count(NO) as monthstotalpmt,sum(conclution814='Indetermination') as MItotal,sum(conclution814='Qualification') as MQtotal, sum(conclution814='Disqualification') as MDtotal,count(NO)/(DATEDIFF(max(DATE_FORMAT(DATE,'%Y-%m-%d')),min(DATE_FORMAT(DATE,'%Y-%m-%d')))+1) as VSspeed from surface_geometry_conclution group by DATE_FORMAT(DATE,'%Y-%m')") or die(mysqli_connect_error());

$sql3=mysqli_query($conn,"select Bubble_effective,Scratch_a,Scratch_b,Uneven_a,Uneven_b,Black_impurity_effective,White_impurity_effective,Other_a,Other_b,Open_bubble_a,Open_bubble_b from surface_geometry ")or die(mysqli_connect_error());
$sql4=mysqli_query($conn,"select * from surface_geometry_conclution where conclution814='Disqualification'")or die(mysqli_connect_error());

$arr['INDtotal']=$INDtotal;
$arr['Qutotal']=$Qutotal;
$arr['Disqutotal']=$Disqutotal;
$arr['INnnvttotal']=$INnnvttotal;
$arr['Qunnvttotal']=$Qunnvttotal;
$arr['Disqunnvttotal']=$Disqunnvttotal;
$arr['INhamamastutotal']=$INhamamastutotal;
$arr['Quhamamastutotal']=$Quhamamastutotal;
$arr['Disquhamamastutotal']=$Disquhamamastutotal;
while ($row1 = mysqli_fetch_array($sql1)){
    $arr['list1'][] = array(
        'days' => $row1['days'],
        'daytotalpmt'=>$row1['daytotalpmt'],
        'DHITotal'=>$row1['DHITotal'],
        'DHQTotal'=>$row1['DHQTotal'],
        'DHDTotal'=>$row1['DHDTotal'],
        'DNITotal'=>$row1['DNITotal'],
        'DNQTotal'=>$row1['DNQTotal'],
        'DNDTotal'=>$row1['DNDTotal'],
    );
}
while ($row2 = mysqli_fetch_array($sql2)){
    $arr['list2'][] = array(
        'months' => $row2['months'],
        'monthstotalpmt'=> $row2['monthstotalpmt'],
        'MItotal'=>$row2['MItotal'],
        'MQtotal'=>$row2['MQtotal'],
        'MDtotal'=>$row2['MDtotal'],
        'VSspeed'=>$row2['VSspeed'],

    );

}
while ($row3 = mysqli_fetch_array($sql3)){
    $arr['list3'][] = array(
        'Bubble_effective' => $row3['Bubble_effective'],
        'Scratch_a'=> $row3['Scratch_a'],
        'Scratch_b'=>$row3['Scratch_b'],
        'Black_impurity_effective'=>$row3['Black_impurity_effective'],
        'White_impurity_effective'=>$row3['White_impurity_effective'],
        'Uneven_a'=>$row3['Uneven_a'],
        'Uneven_b'=>$row3['Uneven_b'],
        'Other_a'=>$row3['Other_a'],
        'Other_b'=>$row3['Other_b'],
        'Open_bubble_a'=>$row3['Open_bubble_a'],
        'Open_bubble_b'=>$row3['Open_bubble_b'],

    );

}
while ($row4 = mysqli_fetch_array($sql4)){
    $arr['list4'][] = array(
        'Diameter' => $row4['Diameter'],
        'Dislocation_flange'=> $row4['Dislocation_flange'],
        'Gap_flange'=>$row4['Gap_flange'],
        'Crack'=>$row4['Crack'],
        'upBubble35_quality'=>$row4['upBubble35_quality'],
        'upBubble135_quality'=>$row4['upBubble135_quality'],
        'downBubble5_quality'=>$row4['downBubble5_quality'],
        'downBubble25_quality'=>$row4['downBubble25_quality'],
        'Scratch50_quality'=>$row4['Scratch50_quality'],
        'Scratch1050_quality'=>$row4['Scratch1050_quality'],
        'Uneven_quality'=>$row4['Uneven_quality'],
        'Black3_qulity'=>$row4['Black3_qulity'],
        'Black13_qulity'=>$row4['Black13_qulity'],
        'White3_quality'=>$row4['White3_quality'],
        'upBubble135_Black13_quality'=>$row4['upBubble135_Black13_quality'],
        'Other_quality'=>$row4['Other_quality'],
        'Open_bubble_quality'=>$row4['Open_bubble_quality'],

    );

}
$json= json_encode($arr);
$content="var array={$json};";
$fp=fopen("data/visualcheckarray.js","wb");
if(false!=$fp){
    fwrite($fp,$content,strlen($content));
    fclose($fp);
}
echo json_encode($A['mark']=1);


?>
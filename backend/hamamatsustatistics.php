<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$result=mysqli_query($conn,"select NO,SN,SK,SP,IDB,SKB,Ebb,DC,Tr,Tf,PP,AP,QE,DE from hamamatsudbt order by NO ASC") or die(mysqli_connect_error());
$total = mysqli_num_rows($result);//总记录数
$arr['mark']=1;
while ($row = mysqli_fetch_array($result)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
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
    );
}
$json= json_encode($arr);
$content="var array={$json};";
$fp=fopen("data/hamamatsuarray.js","wb");
if(false!=$fp){
    fwrite($fp,$content,strlen($content));
    fclose($fp);
}
echo json_encode($A['mark']=1);


?>
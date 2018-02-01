<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$result=mysqli_query($conn,"select NO,NQE,HV,G,PvsV,R,DE,DR,TTS,PP,AP,NL,RT,FT from nnvtdbt order by NO ASC") or die(mysqli_connect_error());
$total = mysqli_num_rows($result);//总记录数
$arr['mark']=1;
while ($row = mysqli_fetch_array($result)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
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
    );
}
$json= json_encode($arr);
$content="var array={$json};";
$fp=fopen("data/nnvtarray.js","wb");
if(false!=$fp){
    fwrite($fp,$content,strlen($content));
    fclose($fp);
}
echo json_encode($A['mark']=1);


?>
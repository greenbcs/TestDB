<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$DB_TBLName = $_GET['pmttable'];
$DB_Server = $server;
$DB_Username = $ur;
$DB_Password = $psw;
$DB_DBName = $datab;

$savename = date("YmjHis");
$Connect = mysqli_connect($DB_Server, $DB_Username, $DB_Password) or die("Couldn't connect!");
mysqli_query($Connect,"set names 'UTF-8'");
$file_type = "vnd.ms-excel";
$file_ending = "xls";
header("Content-Type: application/vnd.ms-excel;charset=UTF-8");
header("Content-Disposition: attachment; filename=$DB_TBLName".$savename.".$file_ending");
//header("Pragma: no-cache");

$now_date = date("Y-m-j H:i:s");
//$title = "数据库名 :$DB_DBName,数据表 :$DB_TBLName,备份日期:$now_date";

$sql = "Select * from $DB_TBLName";
$ALT_Db = @mysqli_select_db($Connect,$DB_DBName) or die("Couldn't select database");
$result = @mysqli_query($Connect,$sql) or die(mysqli_error());

//echo iconv('utf-8','gb2312',"$title\n");
$sep = "\t";
for ($i = 0; $i < mysqli_num_fields($result); $i++) {
    echo mysqli_fetch_field_direct($result,$i)->name. "\t";
}
print("\n");
$i = 0;
while($row = mysqli_fetch_row($result)) {
    $schema_insert = "";
    for($j=0; $j<mysqli_num_fields($result);$j++) {
        if(!isset($row[$j]))
            $schema_insert .= "NULL".$sep;
        elseif ($row[$j] != "")
            $schema_insert .= "$row[$j]".$sep;
        else
            $schema_insert .= "".$sep;
    }
    $schema_insert = str_replace($sep."$", "", $schema_insert);
    $schema_insert .= "\t";
    $schema_insert=iconv('utf-8','gb2312',"$schema_insert");
    //$ssss=trim($schema_insert);
    //echo iconv('utf-8','gb2312',"$ssss\n");
    print (trim($schema_insert));
    print "\n";
    $i++;
}
return (true);
?>
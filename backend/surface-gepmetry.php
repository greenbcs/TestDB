<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
//session_start();
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="2"|$junoL23=="3") {
$sql1 = mysqli_query($conn,"select * from surface_geometry") or die(mysqli_connect_error());
$row1 = mysqli_num_rows($sql1);
if($row1==0){
    $num=1;
}
else{
    $sql2 = mysqli_query($conn,"select * from surface_geometry where NO=(select max(NO) from surface_geometry) ");
    while($row=mysqli_fetch_assoc($sql2)){
        $num=$row['NO']+1;
        //echo $num;
    }
}
$SN = @$_GET['SN'];
$VCD =@$_GET['VCD'];
$Diameter =@$_GET['Diameter'];
$Dislocation_flange =@$_GET['Dislocation_flange'];
$Gap_flange =@$_GET['Gap_flange'];
$Crack =@$_GET['Crack'];//1代表不合格，0代表不合格
$Bubble_a = @$_GET['Bubble_a'];
$Bubble_b =@$_GET['Bubble_b'];
$Scratch_a =@$_GET['Scratch_a'];
$Scratch_b =@$_GET['Scratch_b'];
$Uneven_a =@$_GET['Uneven_a'];
$Uneven_b =@$_GET['Uneven_b'];
$Black_impurity_a =@$_GET['Black_impurity_a'];
$Black_impurity_b =@$_GET['Black_impurity_b'];
$White_impurity_a =@$_GET['White_impurity_a'];
$White_impurity_b =@$_GET['White_impurity_b'];
$Other_a =@$_GET['Other_a'];
$Other_b =@$_GET['Other_b'];
$Open_bubble_a =@$_GET['Open_bubble_a'];
$Open_bubble_b =@$_GET['Open_bubble_b'];

$Bubble_effective=myfun($Bubble_a,$Bubble_b);
$Black_impurity_effective=myfun($Black_impurity_a,$Black_impurity_b);
$White_impurity_effective=myfun($White_impurity_a,$White_impurity_b);
$Other_effective=myfun($Other_a,$Other_b);
$Open_bubble_effective=myfun($Open_bubble_a,$Open_bubble_b);
$Uneven_effective=myfun($Uneven_a,$Uneven_b);

$jsBubble_effective=implode(',',myfun($Bubble_a,$Bubble_b));
$jsBlack_impurity_effective=implode(',',myfun($Black_impurity_a,$Black_impurity_b));
$jsWhite_impurity_effective=implode(',',myfun($White_impurity_a,$White_impurity_b));

$d3_5=3.5;
$d0=0;
$d1=1;
$d2=2;
$d5=5;
$d3=3;
$w=1;
$l50=50;
$l10=10;

$upBubble35_quality=array_filter($Bubble_effective, function($Bubble_effective) use($d3_5) { return $d3_5 <= $Bubble_effective; });
$upBubble35_quality=count($upBubble35_quality);

$upBubble135_quality=array_filter($Bubble_effective, function($Bubble_effective) use($d3_5,$d1) { return $d3_5 > $Bubble_effective&$Bubble_effective>$d1; });
$upBubble135_quality=count($upBubble135_quality);

$downBubble5_quality=array_filter($Bubble_effective, function($Bubble_effective) use($d5) { return -$d5 >= $Bubble_effective; });
$downBubble5_quality=count($downBubble5_quality);

$downBubble25_quality=array_filter($Bubble_effective, function($Bubble_effective) use($d5,$d2) { return -$d5 < $Bubble_effective&$Bubble_effective<-$d2; });
$downBubble25_quality=count($downBubble25_quality);

$Black3_qulity=array_filter($Black_impurity_effective, function($Black_impurity_effective) use($d3) { return abs($Black_impurity_effective)>=$d3; });
$Black3_qulity=count($Black3_qulity);

$Black13_qulity=array_filter($Black_impurity_effective, function($Black_impurity_effective) use($d3,$d1) { return abs($Black_impurity_effective)<$d3&abs($Black_impurity_effective)>$d1; });
$Black13_qulity=count($Black13_qulity);

$White3_quality=array_filter($White_impurity_effective, function($White_impurity_effective) use($d3) { return abs($White_impurity_effective)>=$d3; });
$White3_quality=count($White3_quality);

$upBubble135_Black13_quality=$upBubble135_quality+$Black13_qulity;

$Other_quality=array_filter($Other_effective, function($Other_effective) use($d0) { return abs($Other_effective)>=$d0; });
$Other_quality=count($Other_quality);

$Open_bubble_quality=array_filter($Open_bubble_effective, function($Open_bubble_effective) use($d0) { return abs($Open_bubble_effective)>=$d0; });
$Open_bubble_quality=count($Open_bubble_quality);

$Uneven_quality=array_filter($Uneven_effective, function($Uneven_effective) use($d0) { return abs($Uneven_effective)>=$d0; });
$Uneven_quality=count($Uneven_quality);

$hello_Scratch_a=explode(',',$Scratch_a);
$hello_Scratch_b=explode(',',$Scratch_b);

$Scratch50_quality=scratch50($hello_Scratch_a,$hello_Scratch_b);

$Scratch1050_quality=scratch1050($hello_Scratch_a,$hello_Scratch_b);

$conclution814=conclution20170814($upBubble35_quality,$upBubble135_quality,$downBubble5_quality,$downBubble25_quality,$White3_quality,$Black3_qulity,$Black13_qulity,$upBubble135_Black13_quality,$Scratch50_quality,$Scratch1050_quality,$Open_bubble_quality,$Crack,$SN,$Diameter,$Dislocation_flange,$Gap_flange);

//$conclution='';//留作执行以后的标准

$result1="insert into surface_geometry (NO,DATE,SN,Diameter,Dislocation_flange,Gap_flange,Crack,Bubble_a,Bubble_b,Bubble_effective,Scratch_a,Scratch_b,Uneven_a,Uneven_b,Black_impurity_a,Black_impurity_b,Black_impurity_effective,White_impurity_a,White_impurity_b,White_impurity_effective,Other_a,Other_b,Open_bubble_a,Open_bubble_b) values ('$num','$VCD','$SN','$Diameter','$Dislocation_flange','$Gap_flange','$Crack','$Bubble_a','$Bubble_b','$jsBubble_effective','$Scratch_a','$Scratch_b','$Uneven_a','$Uneven_b','$Black_impurity_a','$Black_impurity_b','$jsBlack_impurity_effective','$White_impurity_a','$White_impurity_b','$jsWhite_impurity_effective','$Other_a','$Other_b','$Open_bubble_a','$Open_bubble_b')";
$result2="insert into surface_geometry_conclution (NO,DATE,SN,Diameter,Dislocation_flange,Gap_flange,Crack,upBubble35_quality,upBubble135_quality,downBubble5_quality,downBubble25_quality,Scratch50_quality,Scratch1050_quality,Uneven_quality,Black3_qulity,Black13_qulity,White3_quality,upBubble135_Black13_quality,Other_quality,Open_bubble_quality,conclution814) values ('$num','$VCD','$SN','$Diameter','$Dislocation_flange','$Gap_flange','$Crack','$upBubble35_quality','$upBubble135_quality','$downBubble5_quality','$downBubble25_quality','$Scratch50_quality','$Scratch1050_quality','$Uneven_quality','$Black3_qulity','$Black13_qulity','$White3_quality','$upBubble135_Black13_quality','$Other_quality','$Open_bubble_quality','$conclution814')";
if (!mysqli_query($conn,$result1)&!mysqli_query($conn,$result2))
{
    die('Error: ' . mysqli_error($conn));
}
else{print "<script>alert('Add Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";}

}else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to try add data to surface_geometry and surface_geometry_conclution.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}

function conclution20170814($data1,$data2,$data3,$data4,$data5,$data6,$data7,$data8,$data9,$data10,$data11,$data12,$data13,$data14,$data15,$data16){
    $count814=0;
    //执行上气泡标准D>=3.5mm
    if($data1>0){$count814=$count814+1;}
    //执行上气泡标准1mm<D>3.5mm
    if($data2>5){$count814=$count814+1;}
    //执行下气泡标准D>=5mm
    if($data3>0){$count814=$count814+1;}
    //执行下气泡标准5mm>D>2mm
    if($data4>10){$count814=$count814+1;}
    //执行白色异物D>=3mm
    if($data5>0){$count814=$count814+1;}
    //执行黑色异物D>=3mm
    if($data6>0){$count814=$count814+1;}
    //执行黑色异物1mm<D<3mm
    if($data7>5){$count814=$count814+1;}
    //执行上气泡和黑色异物总数量
    if($data8>7){$count814=$count814+1;}
    //执行伤痕标准W>1mm,L>=50mm
    if($data9>0){$count814=$count814+1;}
    //执行伤痕标准W>1mm,50mm>L>10mm
    if($data10>5){$count814=$count814+1;}
    //执行开气泡标准 N>0
    if($data11>0){$count814=$count814+1;}
    //其他不明
    //不均匀不列入讨论
    //执行破裂标准 N>0
    if($data12>0){$count814=$count814+1;}

    //其他的事件不明
    //执行直径标准NNVT508+-1.5mm,Hamamatsu 508+-3mm
    if(substr($data13, 0,2)=='EA'&($data14<505|$data14>511)){$count814=$count814+1;}
    if(substr($data13, 0,2)=='PA'&($data14<506.5|$data14>509.5)){$count814=$count814+1;}
    //执行可伐盘偏差标准<=3mm
    if($data15>3){$count814=$count814+1;}
    //执行可伐盘封装缝隙标准<=1mm
    if($data16>1){$count814=$count814+1;}

    //上传csv文件中，判断PMT直径为空，这部结论不定
    $csvDiameterempty=myfun($data14,$data14);
    if($csvDiameterempty=='0'){
        $conc='Indetermination';
    }else{
    if($count814>0){
        $conc='Disqualification';
    }else if($count814==0){
        $conc='Qualification';
    }else{
        $conc='Unknown error';
    }}
return $conc;

}


function scratch50($data1,$data2){
    $j=0;
    for($i=0;$i<count($data1);$i++){
        if((abs($data1[$i])>1&abs($data2[$i])>=50)|(abs($data2[$i])>1&abs($data1[$i])>=50)){
            $j=$j+1;

        }
    }
    return $j;
}

function scratch1050($data1,$data2){
    $j=0;
    for($i=0;$i<count($data1);$i++){
        if((abs($data1[$i])>1&abs($data2[$i])>10&abs($data2[$i])<50)|(abs($data2[$i])>1&abs($data1[$i])>10)&abs($data1[$i])<50){
            $j=$j+1;

        }
    }
    return $j;
}

function myfun($data1,$data2) {
    $hello1 = explode(',',$data1);
    $hello2 = explode(',',$data2);
    if (empty($hello1[0])==true||empty($hello2[0])==true){
        $A=[];
        //$A=[];
    }else{
        for($index=0;$index<count($hello1);$index++)
    {
        $A[$index]=($hello1[$index]+$hello2[$index])/2;

    }
       // implode(",",$A);
    }
    return $A;
}


?>


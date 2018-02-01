<?php
header("Content-type: text/html; charset=utf-8");
//获取上传的文件名
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
$filename = $_FILES['Visualcsv'] ['name'];
$filetype= $exten[count($exten = explode('.', $filename)) - 1];
$filesize = $_FILES['Visualcsv'] ['size'];
//echo $filesize;
if($filetype=="csv") {
    if($filetype=="csv"){
        if ($_POST['VISUALCHECK']== "Submit for Visual Check Data"){
            $leadcsv = $_POST['leadcsv'];
            if ($leadcsv == "true") {
                $filesize = $_FILES['Visualcsv']['size'];
                if ($filesize > 2881064151) {
                    echo "<script>alert('Sorry, the file you uploaded exceeds the specified size !!NOT beyond 2M!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
                } else if ($filesize == 0) {
                    echo "<script>alert('You can not upload NULL!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
                } else {

                    //$do = copy($_FILES['Visualcsv']['tmp_name'],$fname);//复制数据可以检测上传是否成功。
                    $tmp_name = $_FILES ['Visualcsv']['tmp_name'];
                    $msg = uploadcsv($filename, $tmp_name,$conn);
                    if($msg=="Upload Successed!"){
                        echo "<script>alert('Upload Successed!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
                    }else{
                        echo "<script>alert('Upload Failed!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
                    }

                }
            }
            else {
                echo "<script>alert('Losting Connect!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
            }
        }else {
            echo "<script>alert('Please try upload again!');location.href='" . $_SERVER["HTTP_REFERER"] . "'</script>";
        }
    }

}
else
{
        echo "<script>alert('This is not a csv file!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
        return false;
    }
}else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to try upload data to surface_geometry and surface_geometry_conclution.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}


function uploadcsv($file, $filetempname,$conn){
    //自己设置的上传文件存放路径
    $filePath = './upfiles/';
    $filename=explode(".",$file);//把上传的文件名以“.”好为准做一个数组。
    $time="05152017";//date("y-m-d-H-i- s");//去当前上传的时间
    $filename [0]=$time;//取文件名t替换
    $name=implode (".",$filename); //上传后的文件名
    $uploadfile=$filePath.$name;//上传后的文件名地址
//echo $uploadfile;
//move_uploaded_file() 函数 将上传的文件移动到新位置。若成功，则返回 true，否则返回 false。
    $moveresult=move_uploaded_file($filetempname,$uploadfile);//假如上传到当前目录下
    //echo $uploadfile;
    if($moveresult) //如果上传文件成功，就执行导入 excel操作
    {
        $handle = fopen($uploadfile, 'r');
        $data= input_csv($handle);//解析csv
        $len_result = count($data);
        for($i=1;$i<$len_result;$i=$i+14){
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
            $VCD=str_replace('/','-',$data[$i][0]);
            $SN=$data[$i][1];
            $Diameter =$data[$i][3];
            $Dislocation_flange =$data[$i+1][3];
            $Gap_flange =$data[$i+2][3];
            $Crack =$data[$i+3][3];//1代表不合格，0代表不合格
            $Bubble_a = joinstring($data[$i]);
            $Bubble_b = joinstring($data[$i+1]);
            $Scratch_a = joinstring($data[$i+2]);
            $Scratch_b = joinstring($data[$i+3]);
            $Uneven_a = joinstring($data[$i+4]);
            $Uneven_b = joinstring($data[$i+5]);
            $Black_impurity_a =joinstring($data[$i+6]);
            $Black_impurity_b =joinstring($data[$i+7]);
            $White_impurity_a =joinstring($data[$i+8]);
            $White_impurity_b =joinstring($data[$i+9]);
            $Other_a =joinstring($data[$i+10]);
            $Other_b =joinstring($data[$i+11]);
            $Open_bubble_a =joinstring($data[$i+12]);
            $Open_bubble_b =joinstring($data[$i+13]);
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
            //else{print "<script>alert('Add Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";}
        }

        unlink ($uploadfile); //删除上传的excel文件
        $msg = "Upload Successed!";
    }

    else{
        $msg = "Upload Failed！";
    }
    return $msg;

}

function input_csv($handle)
{
    $out = array ();
    $n = 0;
    while ($data = fgetcsv($handle, 10000))
    {
        $num = count($data);
        for ($i = 0; $i < $num; $i++)
        {
            $out[$n][$i] = $data[$i];
        }
        $n++;
    }
    return $out;
}

function joinstring($sysu){
    $arr1=array_slice($sysu,6);//从数组的第七个元素开始取出，并返回数组中的其余元素：
    $arr=array_filter($arr1);//过滤数组中的空字符元素
    return implode(',',$arr);
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
    if($csvDiameterempty[0]==0){
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

?>
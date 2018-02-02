<?php
header("Content-type: text/html; charset=utf-8");

function uploadFile($file, $filetempname,$conn)
{
//自己设置的上传文件存放路径
    $filePath = './upfiles/';
    $str = "";
//下面的路径按照你 PHPExcel的路径来修改
    set_include_path('.'. PATH_SEPARATOR .'Classes\PHPExcel' . PATH_SEPARATOR .get_include_path());

    require_once 'Classes/PHPExcel.php';
    require_once 'Classes/PHPExcel/IOFactory.php';
    require_once 'Classes/PHPExcel/Reader/Excel2007.php';

    $filename=explode(".",$file);//把上传的文件名以“.”好为准做一个数组。
    $time="05152017";//date("m-d-y-H-i- s");//去当前上传的时间
    $filename [0]=$time;//取文件名t替换
    $name=implode (".",$filename); //上传后的文件名
    $uploadfile=$filePath.$name;//上传后的文件名地址
//echo $uploadfile;
    $BatchNumber=$_POST['batch2'];
    $shippingdate2=$_POST['shippingdate2'];
//move_uploaded_file() 函数 将上传的文件移动到新位置。若成功，则返回 true，否则返回 false。
    $result=move_uploaded_file($filetempname,$uploadfile);//假如上传到当前目录下

    //echo $result;

    if($result) //如果上传文件成功，就执行导入 excel操作
    {
// $objReader = PHPExcel_IOFactory::createReader('Excel5');//use excel2003
        $objReader = PHPExcel_IOFactory::createReader('Excel5');//use excel2003 和  2007 format
        // $objPHPExcel = $objReader->load($uploadfile); //这个容易造成httpd崩溃
        $objPHPExcel = PHPExcel_IOFactory::load($uploadfile);//改成这个写法就好了

        $sheet = $objPHPExcel->getSheet(0);
        $highestRow = $sheet->getHighestRow(); // 取得总行数
        $highestColumn = $sheet->getHighestColumn(); // 取得总列数
//echo "The numbers of row!",$highestColumn;
 //        echo "///////";
 //         echo $highestRow;
//循环读取excel文件,读取一条,插入一条
        $indexnumber=0;
        for($j=2;$j<=$highestRow;$j++)
        {
            //$row1=$j-1;
            $sql1 = mysqli_query($conn,"select * from nnvtdbt") or die(mysqli_connect_error());
            $row1 = mysqli_num_rows($sql1)+1;
            //$NO= $row1;
            $CD0= $objPHPExcel->getActiveSheet()->getCell("A".$j)->getValue();//获取A列的值
            $n=intval(($CD0 - 25569) * 3600 * 24);
            $CD=gmdate('Y-m-d', $n);
            $SN = $objPHPExcel->getActiveSheet()->getCell("B".$j)->getValue();//获取B列的值
            $NQE = $objPHPExcel->getActiveSheet()->getCell("C".$j)->getValue();//获取C列的值
            $HV = $objPHPExcel->getActiveSheet()->getCell("D".$j)->getValue();//获取D列的值
            $G = $objPHPExcel->getActiveSheet()->getCell("E".$j)->getValue();//获取E列的值
            $PvsV = $objPHPExcel->getActiveSheet()->getCell("F".$j)->getValue();//获取F列的值
            $R= $objPHPExcel->getActiveSheet()->getCell("G".$j)->getValue();//获取G列的值
            $DE = $objPHPExcel->getActiveSheet()->getCell("H".$j)->getValue();//获取H列的值
            $DR = $objPHPExcel->getActiveSheet()->getCell("I".$j)->getValue();//获取I列的值
            $TTS = $objPHPExcel->getActiveSheet()->getCell("J".$j)->getValue();//获取J列的值
            $PP = $objPHPExcel->getActiveSheet()->getCell("K".$j)->getValue();//获取K列的值
            $AP = $objPHPExcel->getActiveSheet()->getCell("L".$j)->getValue();//获取L列的值
            $NL = $objPHPExcel->getActiveSheet()->getCell("M".$j)->getValue();//获取M列的值
            $RT = $objPHPExcel->getActiveSheet()->getCell("N".$j)->getValue();//获取N列的值
            $FT = $objPHPExcel->getActiveSheet()->getCell("O".$j)->getValue();//获取O列的值
            $VS = $objPHPExcel->getActiveSheet()->getCell("P".$j)->getValue();//获取P列的值
            $BR1 = $objPHPExcel->getActiveSheet()->getCell("Q".$j)->getValue();//获取Q列的值
            $BR2 = $objPHPExcel->getActiveSheet()->getCell("R".$j)->getValue();//获取R列的值
            if($VS=="合格"){
                $VS='Good';
            }
            elseif($VS=="不合格")
            {
                $VS='Reject';
            }
            else{
                $VS=$VS;
            }
            //echo $CD0,"/////";
           // $sql = "insert into hamamatsudbt (NO,SN,SK,SP,IDB,SKB,Ebb,DC,Tr,Tf,PP,AP,QE,DE) values ('$row1',".$SN.",".$SK.",".$SP.",".$IDB.",".$SKB.",".$Ebb.",".$DC.",".$Tr.",".$Tf.",".$PP.",".$AP.",".$QE.",".$DE.")";
            $sql = "insert into nnvtdbt (NO,CD,SN,NQE,HV,G,PvsV,R,DE,DR,TTS,PP,AP,NL,RT,FT,VS,BR1,BR2,BN,TransportDate) values ('$row1','$CD','$SN','$NQE','$HV','$G','$PvsV','$R','$DE','$DR','$TTS','$PP','$AP','$NL','$RT','$FT','$VS','$BR1','$BR2','$BatchNumber','$shippingdate2')";
          //print $sql;
            if (!mysqli_query($conn,$sql))
            {
                die('Error: ' . mysqli_error($conn));
            }
            $indexnumber=$indexnumber+1;
        }
        $sqls2 = mysqli_query($conn, "select * from transport_statistics") or die(mysqli_connect_error());
        $rows2 = mysqli_num_rows($sqls2);
        if ($rows2 == 0) {
            $nums = 1;
        } else {
            $sqls02 = mysqli_query($conn, "select * from transport_statistics where NO=(select max(NO) from transport_statistics) ");
            while ($rows2 = mysqli_fetch_assoc($sqls02)) {
                $nums = $rows2['NO'] + 1;
                //echo $num;
            }
        }
        $sqls2="insert into transport_statistics(NO,Manufactures,TransportDate,BatchNumber,Quanlity) values('$nums','NNVT','$shippingdate2','$BatchNumber','$indexnumber')";
        if (!mysqli_query($conn,$sqls2))
        {
            die('Error: ' . mysqli_error($conn));
        }
        unlink ($uploadfile); //删除上传的excel文件
        $msg = "Upload Successed!"."Total: ".intval($indexnumber)." PMTs";
    }

    else{
        $msg = "Upload Failed！";
    }
    return $msg;
}
?>
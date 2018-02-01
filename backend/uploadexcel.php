<?php
//获取上传的文件名
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
session_start();
$junoL23=$_SESSION["JUNOLEVEL"];
if($junoL23=="3"|$junoL23=="2") {
$filename = $_FILES['HExcel'] ['name'];
$filetype= $exten[count($exten = explode('.', $filename)) - 1];
if($filetype=="xlsx"){
    include("function.php");
    header("Content-type: text/html; charset=utf-8");
    if ($_POST['HAMAMATSU'] == "Submit for Hamamatsu") {
        $leadExcel = $_POST['leadExcel'];
        if ($leadExcel == "true") {
            // $data = date("Y-m-d");
            //  $file_name = "files";
            $filesize = $_FILES['HExcel']['size'];
            if ($filesize > 2881064151) {
                echo "<script>alert('Sorry, the file you uploaded exceeds the specified size !!NOT beyond 2M!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
            } elseif ($filesize == 0) {
                echo "<script>alert('You can not upload NULL!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
            } else {

                //上传到服务器上的临时文件名
                $tmp_name = $_FILES ['HExcel']['tmp_name'];

                $msg = uploadFile($filename, $tmp_name,$conn);
                if($msg=="Upload Failed!"){
                    echo "<script>alert('Upload Failed!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
                }else{
                    echo "<script>alert('$msg');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
                }
            }
        } else {
            echo "<script>alert('Losting Connect!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
        }
    } else {
        echo "<script>alert('Please try upload again!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
    }

}
else {
    echo "<script>alert('This is not a XLSX file!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
    return false;
}
}else{
    include("record_illegal_operation.php");
    $IllegalEN="Illegal to try upload data to hamamatsudbt.";
    recordoperation($IllegalEN);
    print "<script>alert('Your authorization or permissions are too low to operate it.');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}
?>


<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$sysuusername = @$_POST['U'];
$sysupassword = @$_POST['P'];
$sql1 = mysqli_query($conn,"select * from pmtusers where Username='$sysuusername'") or die(mysqli_connect_error());
if(!$sql1){
    $SYSU=1;
    $arr['list'][] = array(
        'SYSU'=>$SYSU,
        'linkIP'=>'index.html',

    );
}
else{
    while ($row = mysqli_fetch_assoc($sql1)) {
        $pmtpassword = $row['Passwords'];
        $pmtemail = $row['Email'];
        $pmtinstitution = $row['Unit'];
        $pmtlevel = $row['Level'];
        //echo json_encode($StoPo);
    }
    $pmtloginip = getIPaddress();
    date_default_timezone_set('Asia/Shanghai');
    $pmtlogintime = date("Y-m-d H:i:s", time());
    $salt = "IhEP0527";
    $sysuencodepassword = generateHashWithSalt($sysupassword);
    if($sysuencodepassword==$pmtpassword){
        $linkIPsql= mysqli_query($conn, "select * from pmtdb_access_logs where NO=(select max(NO) from pmtdb_access_logs) ");
        while ($row = mysqli_fetch_assoc($linkIPsql)) {
            $linkIP = $row['Access_URL'];
            //echo $num;
        }
        $SYSU=4;
        $arr['list'][] = array(
            //'junoname' => $sysuusername,
           // 'junolevel' => $pmtlevel,
            'SYSU'=>$SYSU,
            'linkIP'=>$linkIP,
        );
        $pmtstatus="Successed";
        $sqlnum = mysqli_query($conn,"select * from pmtusers_login_logs") or die(mysqli_connect_error());
        $row1 = mysqli_num_rows($sqlnum);
        if ($row1==0){
            $num=1;
        }
        else{
            $sql0 = mysqli_query($conn,"select * from pmtusers_login_logs where NO=(select max(NO) from pmtusers_login_logs) ");
            while($row=mysqli_fetch_assoc($sql0)){
                $num=$row['NO']+1;
                //echo $num;
            }
        }
        $sqlright="insert into pmtusers_login_logs (NO,Username,Email,Institution,LoginIP,LoginTime,Status) values ('$num','$sysuusername','$pmtemail','$pmtinstitution','$pmtloginip','$pmtlogintime','$pmtstatus')";
        mysqli_query($conn,$sqlright);
        session_start();
        $_SESSION["JUNONAME"]=$sysuusername;
        $_SESSION["JUNOLEVEL"]=$pmtlevel;
        $_SESSION["JUNOPASSWORD"]=$sysuencodepassword;
        $_SESSION["JUNOLOGINIP"]=$pmtloginip;

        //print "<script>alert('login success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
    }
    else{
        $pmtstatus="Failed";
        $sqlnum = mysqli_query($conn,"select * from pmtusers_login_logs") or die(mysqli_connect_error());
        $row1 = mysqli_num_rows($sqlnum);
        if ($row1==0){
            $num=1;
        }
        else{
            $sql0 = mysqli_query($conn,"select * from pmtusers_login_logs where NO=(select max(NO) from pmtusers_login_logs) ");
            while($row=mysqli_fetch_assoc($sql0)){
                $num=$row['NO']+1;
                //echo $num;
            }
        }
        $sqlwrong="insert into pmtusers_login_logs (NO,Username,Email,Institution,LoginIP,LoginTime,Status) values ('$num','$sysuusername','$pmtemail','$pmtinstitution','$pmtloginip','$pmtlogintime','$pmtstatus')";
        mysqli_query($conn,$sqlwrong);
        //print "<script>alert('The username or password is wrong');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
        $SYSU=2;
        $arr['list'][] = array(
            'SYSU'=>$SYSU,
            'linkIP'=>'index.html',

        );
    }



}

echo json_encode($arr);


    function getIPaddress()
    {

        $IPaddress='';

        if (isset($_SERVER)){

            if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){

                $IPaddress = $_SERVER["HTTP_X_FORWARDED_FOR"];

            } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {

                $IPaddress = $_SERVER["HTTP_CLIENT_IP"];

            } else {

                $IPaddress = $_SERVER["REMOTE_ADDR"];

            }

        } else {

            if (getenv("HTTP_X_FORWARDED_FOR")){

                $IPaddress = getenv("HTTP_X_FORWARDED_FOR");

            } else if (getenv("HTTP_CLIENT_IP")) {

                $IPaddress = getenv("HTTP_CLIENT_IP");

            } else {

                $IPaddress = getenv("REMOTE_ADDR");

            }

        }

        return $IPaddress;

    }

function generateHashWithSalt($password) {
    //$intermediateSalt = md5(uniqid(rand(), true));
    // $salt = substr($intermediateSalt, 0, 6);
    $salt="IhEP0527";
    return hash("sha256", $password . $salt);
}
?>
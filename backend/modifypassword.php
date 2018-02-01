<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn1.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$username = @$_POST['username'];
$oldpasswords = @$_POST['oldpasswords'];
$newpasswords = @$_POST['newpasswords'];
$encodenewpasswords=generateHashWithSalt($newpasswords);
$encodeoldpasswords=generateHashWithSalt($oldpasswords);
$sql44= "select Passwords from pmtusers where Username='$username'";
$result0=mysqli_query($conn,$sql44);
while($row = mysqli_fetch_assoc($result0)) {
    $S1=$row['Passwords'];
}
if($S1==$encodeoldpasswords) {
    $sql = "update pmtusers set Passwords='$encodenewpasswords' where Username='$username'";
    if (!mysqli_query($conn, $sql)) {
        die('Error: ' . mysqli_error($conn));
    } else {
        print "<script>alert('Modify Success!You need login again!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
    }
}
else{
    print "<script>alert('Modify Fail!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}
function generateHashWithSalt($password) {
    $salt="IhEP0527";
    return hash("sha256", $password . $salt);
}
?>

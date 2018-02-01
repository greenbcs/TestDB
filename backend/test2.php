<?php
header("Content-Type: text/html; charset=UTF-8");
require("conn.php");
$conn=mysqli_connect($server,$ur,$psw,$datab);
$page = 0;
$pageSize = 10; //每页显示数
$result = mysqli_query($conn, "select * from scan_system_data") or die(mysqli_connect_error());
$total = mysqli_num_rows($result);//总记录数
$totalPage = ceil($total / $pageSize); //总页数
$startPage = $page * $pageSize;
$arr['total'] = $total;
$arr['pageSize'] = $pageSize;
$arr['totalPage'] = $totalPage;
$query = mysqli_query($conn, "select NO,scan_id,pmt_type,pmt_sn,emf,amp,date,comment,n_zenith,n_azimuth,coeffs,pde6,pde4,pde7,pde1,pde1_sig,pde4_sig,pde6_sig,pde7_sig,mu_map,gain_map,hist_map from scan_system_data order by NO ASC limit $startPage,$pageSize");
while ($row = mysqli_fetch_array($query)) {
    $arr['list'][] = array(
        'NO' => $row['NO'],
        'scan_id' => $row['scan_id'],
        'pmt_type' => $row['pmt_type'],
        'pmt_sn' => $row['pmt_sn'],
        'emf' => $row['emf'],
        'amp' => $row['amp'],
        'date' => $row['date'],
        'comment' => $row['comment'],
        'n_zenith' => $row['n_zenith'],
        'n_azimuth' => $row['n_azimuth'],
        'coeffs' => $row['coeffs'],
        'pde6' => $row['pde6'],
        'pde4' => $row['pde4'],
        'pde7' => $row['pde7'],
        'pde1' => $row['pde1'],
        'pde1_sig' => $row['pde1_sig'],
        'pde4_sig' => $row['pde4_sig'],
        'pde6_sig' => $row['pde6_sig'],
        'pde7_sig' => $row['pde7_sig'],
        'mu_map' => $row['mu_map'],
        'gain_map' => $row['gain_map'],
        'hist_map' => $row['hist_map'],

    );
}
echo json_encode($arr);

?>


$result0=mysqli_query($conn,"select * from receive_check where SN ='$SN'");


if (!mysqli_num_rows($result0))
{
//echo "<script>alert('We did not receive this PMT!');history.back()</script>";
echo "<script>alert('We did not receive this PMT!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";
}
else
{
$sql="insert into surface_geometry (NO,SN,SGR,SGCD,NumB,AConc,SGN) values ('$row1','$SN','$SGR','$SGCD','$NumB','$AConc','$SGN')";
if (!mysqli_query($conn,$sql))
{
die('Error: ' . mysqli_error($conn));
}
else{print "<script>alert('Add Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";}
}


if(judgmentdata(arrayBubbleA,arrayBubbleB)==1){
var redflag1=1;
}else if(judgmentdata(arrayBubbleA,arrayBubbleB)==0){
alert("The length of Bubble a and Bubble b are not equal!")
var redflag1=2;
}else if(judgmentdata(arrayBubbleA,arrayBubbleB)==2)
{
alert(" Some data in Bubble a or Bubble b has been lost - or been 0. ");
var redflag1=2;
}else
{
var redflag1=1;
}

if(judgmentdata(arrayScratchA,arrayScratchB)==1){
var redflag2=1;
}else if(judgmentdata(arrayScratchA,arrayScratchB)==0){
alert("The length of Scratch a and Scratch b are not equal!")
var redflag2=2;
}else if(judgmentdata(arrayScratchA,arrayScratchB)==2)
{
alert(" Some data in Scratch a or Scratch b has been lost - or been 0. ");
var redflag2=2;
}else
{
var redflag2=1;
}

if(judgmentdata(arrayUnevenA,arrayUnevenB)==1){
var redflag3=1;
}else if(judgmentdata(arrayUnevenA,arrayUnevenB)==0){
alert("The length of Uneven a and Uneven b are not equal!")
var redflag3=2;
}else if(judgmentdata(arrayUnevenA,arrayUnevenB)==2)
{
alert(" Some data in Uneven a or Uneven b has been lost - or been 0. ");
var redflag3=2;
}else
{
var redflag3=1;
}

if(judgmentdata(arrayBlackImpurityA,arrayBlackImpurityB)==1){
var redflag4=1;
}else if(judgmentdata(arrayBlackImpurityA,arrayBlackImpurityB)==0){
alert("The length of Black impurity a and Black impurity b are not equal!")
var redflag4=2;
}else if(judgmentdata(arrayBlackImpurityA,arrayBlackImpurityB)==2)
{
alert(" Some data in Black impurity a or Black impurity b has been lost - or been 0. ");
var redflag4=2;
}else
{
var redflag4=1;
}

if(judgmentdata(arrayWhiteImpurityA,arrayWhiteImpurityB)==1){
var redflag5=1;
}else if(judgmentdata(arrayWhiteImpurityA,arrayWhiteImpurityB)==0){
alert("The length of White impurity a and White impurity b are not equal!")
var redflag5=2;
}else if(judgmentdata(arrayWhiteImpurityA,arrayWhiteImpurityB)==2)
{
alert(" Some data in White impurity a or White impurity b has been lost - or been 0. ");
var redflag5=2;
}else
{
var redflag5=1;
}

if(judgmentdata(arrayOtherA,arrayOtherB)==1){
var redflag6=1;
}else if(judgmentdata(arrayOtherA,arrayOtherB)==0){
alert("The length of Other a and Other b are not equal!")
var redflag6=2;
}else if(judgmentdata(arrayOtherA,arrayOtherB)==2)
{
alert(" Some data in Other a or Other b has been lost - or been 0. ");
var redflag6=2;
}else
{
var redflag6=1;
}

if(judgmentdata(arrayOpenBubbleA,arrayOpenBubbleB)==1){
var redflag7=1;
}else if(judgmentdata(arrayOpenBubbleA,arrayOpenBubbleB)==0){
alert("The length of Open Bubble a and Open Bubble b are not equal!")
var redflag7=2;
}else if(judgmentdata(arrayOpenBubbleA,arrayOpenBubbleB)==2)
{
alert(" Some data in Open Bubble a or Open Bubble b has been lost - or been 0. ");
var redflag7=2;
}else
{
var redflag7=1;
}

if(redflag7+redflag6+redflag5+redflag4+redflag3+redflag2+redflag1==7){
return true;
}else
{
return false;
}



if(data1.length==data2.length){
var flag=0;
if(data1.length>1){
for(var i=0;i<data1.length;i++){
if(Number(data1[i])*Number(data2[i])>0){
flag+=1;
}
}
if(flag==data1.length){
var AWS=1;
}else{
var AWS=2;
}
}
else
{
var AWS=3;
}
}
else{
var AWS="The length of "+name+" a and"+ name+" b are not equal!"
;
}
alert(AWS);


<?php

$result1="insert into surface_geometry (NO,DATE,SN,Diameter,Dislocation_flange,Gap_flange,Crack,Bubble_a,Bubble_b,Bubble_effective,Scratch_a,Scratch_b,Uneven_a,Uneven_b,Black_impurity_a,Black_impurity_b,Black_impurity_effective,White_impurity_a,White_impurity_b,White_impurity_effective,Other_a,Other_b,Open_bubble_a,Open_bubble_b) values ('$num','$VCD','$SN','$Diameter','$Dislocation_flange','$Gap_flange','$Crack','$Bubble_a','$Bubble_b','$jsBubble_effective','$Scratch_a','$Scratch_b','$Uneven_a','$Uneven_b','$Black_impurity_a','$Black_impurity_b','$jsBlack_impurity_effective','$White_impurity_a','$White_impurity_b','$jsWhite_impurity_effective','$Other_a','$Other_b','$Open_bubble_a','$Open_bubble_b')";
if (!mysqli_query($conn,$result1))
{
    die('Error: ' . mysqli_error($conn));
}
else{print "<script>alert('Add Success!');location.href='".$_SERVER["HTTP_REFERER"]."' </script>";}

?>


if($filetype=="csv"){
if ($_POST['VisualCheck']== "Submit for Visual Check Data"){
$leadcsv = $_POST['leadcsv'];
if ($leadcsv == "true") {
$filesize = $_FILES['Visualcsv']['size'];
if ($filesize > 2881064151) {
echo "<script>alert('Sorry, the file you uploaded exceeds the specified size !!NOT beyond 2M!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
} else if ($filesize == 0) {
echo "<script>alert('You can not upload NULL!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
} else {

$do = copy($_FILES['Visualcsv']['tmp_name'],$fname);
$handle=fopen("$fname","r");
echo $handle;

}
}
else {
echo "<script>alert('Losting Connect!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}
}else {
echo "<script>alert('Please try upload again!');location.href='" . $_SERVER["HTTP_REFERER"] . "'</script>";
}


}
else
{
echo "<script>alert('This is not a csv file!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
return false;
}


if($msg=="Upload Successed!"){
echo "<script>alert('Upload Successed!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}else{
echo "<script>alert('Upload Failed!');location.href='" . $_SERVER["HTTP_REFERER"] . "' </script>";
}


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


var data1 = [{
value: Qutotal,
name: 'Qualification'
}, {
value: Disqutotal,
name: 'Disqualification'
}, {
value: INDtotal,
name: 'Indetermination'
}];
var option2 = {
title: {
text: 'Visual Check Statistics 2',
subtext:'Total:'+(INDtotal+Qutotal+Disqutotal).toString()
},
tooltip: {
show: false,
trigger: 'item',
formatter: "{b}: {c} ({d}%)"
},
toolbox: {
show: true,
feature: {
dataView: {readOnly: false},
restore : {show: true},
saveAsImage : {show: true}
}
},
legend: {
orient: 'vertical',
right: '0%',
bottom: '0%',
data: ['Qualification', 'Disqualification', 'Indetermination']
},
series: [{
type: 'pie',
selectedMode: 'single',
radius: ['40%', '58%'],
color: ['#AF89D6', '#59ADF3', '#FF999A', '#FFCC67','#FCC667','#CC5962'],

label: {
normal: {
position: 'inner',
formatter: '{d}%',

textStyle: {
color: '#fff',
fontWeight: 'bold',
fontSize: 12
}
}
},
labelLine: {
normal: {
show: false
}
},
data: data1
}]
};




var askpostcode="BeiJingandGuangZhou";
var myParames1;
var myParames2;
var DBSgrade = document.getElementById("DBSlevel").value;
//alert(DBSgrade);
$.ajax({
    url:'backend/junocheck.php',
    dataType:'json',
    type:'POST',
    data:{'APC':askpostcode,'link':document.URL},
    async : false,
    success: function(json) {
        var list =json.list;
        var junoname=[];
        var junolevel=[];

        $.each(list, function (index, array) {
            junoname[index]=array['NAME'];
            junolevel[index]=array['LEVEL'];

        });
        if (junoname=="QWVB"||junolevel==99||junoname==""||junolevel==""||junoname.length==0||junolevel.length==0){
            alert("Login failed!The username or password is wrong！");
            window.location.href="index.html";
        }
        else{
            //var dbslevel=myFun(junoname,junolevel);
            //返回上一页并本地刷新
			$("#IDlabel").html(junoname);//在右上角显示用户名
			//console.log(junoname);
            myFun(junoname,junolevel);//该函数把查询到的用户名传递到页面中，主要是Users Profiles。
            if(junolevel<DBSgrade){alert('Your authorization or permissions are too low to access the page.');history.go(-1);};//location.reload();本地刷新
        }
    },
    error: function () {
        alert("Login failed!The username or password is wrong！");
        window.location.href="index.html";}
});

function myFun(junoname,junolevel){
     myParames1=junoname;
     myParames2=junolevel;

}


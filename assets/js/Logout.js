function logout(){
    var askdelivercode="IHEPSYSUPANASIA";
    $.ajax({
        url: "backend/Logout.php",  // 后台地址
        type:"POST",
        dataType:"json",
        data:{'ADC':askdelivercode},  //自己需要传递的数据 {}
        success: function(data){
            var list =data.list;
                $.each(list, function (index, array) {
                    var junoname=array['NAME'];
                    var junolevel=array['LEVEL'];
                    if (junoname=="QWVB"||junolevel==99){
                        alert("Logout Sucessed!");
                        window.location.href="index.html";
                    }
                    else{
                        myFun(junoname,junolevel);
                    }
                });

        },
        error:function(){
            //出错
        }
    });
}
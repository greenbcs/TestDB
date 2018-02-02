/**
 * Created by yry on 2017/4/17.
 */
function operation(flag,process,obj){   //数据操作
    if(flag&&process&&obj) {
        if (flag === 'view') {
            if(process === 'warehouse'){
                openModal('./itemDetails.html');
            }else if(process === 'install'){
                openModal('./itemDetails3.html');
            }else if(process === 'test'){
                openModal('./itemDetails2.html');
            }
        } else if (flag === 'edit') {

            console.log('edit操作');
        } else if (flag === 'del'){
            var url = '';
            if(process === 'warehouse'){
                url = 'pmts/'+obj.sn;
            }else if(process === 'install'){
                url = 'pmt_installations/'+obj.sn;
            }else if(process === 'test'){
                url = 'pmt_tests/'+obj.sn;
            }
            var c = layer.confirm('确认删除(Delete?)',{icon:3,title:'提示',btn:['Ok','Cancel']},function(index){
                //console.log(that.userToken);
                layer.close(c);
                $.ajax({
                    url:host+url,
                    type:'DELETE',
                    dataType:'json',
                    headers:{'user_token':vm.userToken},
                    success:function(data){
                        if(data.result === true){
                            layer.msg('删除成功',{
                                anim:0,
                                time:1000
                            },function () {
                                if(process === 'warehouse'){
                                    vm.getAllWares();
                                }else if(process === 'install'){
                                    vm.getAllInstalls();
                                }else{
                                    vm.getAllTests();
                                }
                            });
                        }else{
                            layer.msg('删除失败:'+data.msg);
                        }
                    }
                });
            });
        }
    }
}

function openModal(html) {             //打开弹窗
    console.log('打开html:'+html);// ./itemDetails.html
    var a = layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        area: ['280px', '520px'], //宽高
        content: [html,'no'],
        btn: ['关闭'],
        success:function(layero,index){
//            var body = layer.getChildFrame('body', index);
//            body.find('span').eq(0).text(data.invitation_code);
        },
        yes: function(index, layero){
            //关闭
            layer.close(a);
        }
    });
}

function textWidth(text){
    var sensor = $('<pre>'+ text +'</pre>').css({display: 'none'});
    $('body').append(sensor);
    var width = sensor.width();
    sensor.remove();
    return width;
};

// function baseDelete(token,url) {
//     $.ajax({
//         url:host+url,
//         type:'DELETE',
//         dataType:'json',
//         headers:{'user_token':token},
//         success:function(data){
//             if(data.result === true){
//                 layer.msg('删除成功',{
//                     anim:0,
//                     time:1000
//                 },function () {
//                     if(that.currentShow === 'warehouse'){
//                         that.getAllWares();
//                     }else if(that.currentShow === 'install'){
//                         that.getAllInstalls();
//                     }else{
//                         that.getAllTests();
//                     }
//                 });
//             }else{
//                 layer.msg('删除失败:'+data.msg);
//             }
//         }
//     });
// }
//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    var sn= document.getElementById("SN").value;
    $.ajax({
        type: 'POST',
        url: 'backend/pagennvt.php',
        data: {'pageNum': page - 1,"SN":sn,'FG':fg},
        dataType: 'json',
        beforeSend: function () {
            $("#tablelist ").append("<h3>loading...</h3>");
        },
        success: function (json) {
            $("#tablelist").empty();
            total = json.total; //总记录数
            pageSize = json.pageSize; //每页显示条数
            curPage = page; //当前页
            totalPage = json.totalPage; //总页数
            var table_html = "";
            table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><th width=\"*\">NO</th><th width=\"*\">CD</th><th width=\"*\">SN</th><th width=\"*\">NQE</th><th width=\"*\">HV</th><th width=\"*\">G</th><th width=\"*\">PvsV</th><th width=\"*\">R</th><th width=\"*\">DE</th><th width=\"*\">DR</th><th width=\"*\">TTS</th><th width=\"*\">PP</th><th width=\"*\">AP</th><th width=\"*\">NL</th><th width=\"*\">RT</th><th width=\"*\">FT</th><th width=\"*\">VS</th><th width=\"*\">BN</th><th width=\"*\">Transport Date</th></tr>";
            var list = json.list;
            $.each(list, function (index, array) { //遍历json数据列
                // if(array['ID'].length > 28){
                //     var title_sub = array['ID'].substring(0,20); // 获取子字符串。
                //  }
                //  else
                var title_sub = array['NO'];
                table_html += "<tr><td>" + title_sub + "</td><td>" + array['CD'] + "</td><td>" + array['SN'] + "</td><td>" + array['NQE'] + "</td><td>" + array['HV'] + "</td><td>" + array['G'] + "</td><td>" + array['PvsV'] + "</td><td>" + array['R'] + "</td><td>" + array['DE'] + "</td><td>" + array['DR'] + "</td><td>" + array['TTS'] + "</td><td>" + array['PP'] + "</td><td>" + array['AP'] + "</td><td>" + array['NL'] + "</td><td>" + array['RT'] + "</td><td>" + array['FT'] + "</td><td>" + array['VS'] + "</td><td>" + array['BN'] + "</td><td>" + array['TransportDate'] + "</td><tr>";
            });
            table_html += "</table>";
            $("#tablelist").append(table_html);
        },
        complete: function () { //生成分页条
            //alert("Bar load failed!");
            getPageBar();
        },
        error: function () {
            alert("Data load failed!");
        }
    });


}

function getPageBar(){
    //页码大于最大页数
    if(curPage>totalPage) curPage=totalPage;
    //页码小于1
    if(curPage<1) curPage=1;
    pageStr = "<span class=\"button_span_page gray\">Totals:"+total+"Records "+curPage+"/"+totalPage+"</span>";

    //如果是第一页
    if(curPage==1){
        pageStr += "<span class=\"button_span blue\">    First Page    </span><span class=\"button_span blue\">    Last Page    </span>";
    }else{
        pageStr += "<span class=\"button_span green\"><a href='javascript:void(0)' rel='1'>    First Page    </a></span><span class=\"button_span green\"><a href='javascript:void(0)' rel='"+(curPage-1)+"'>    Last Page    </a></span>";
    }

    //如果是最后页
    if(curPage>=totalPage){
        pageStr += "<span class=\"button_span blue\">    Next Page    </span><span class=\"button_span blue\">    End Page    </span>";
    }else{
        pageStr += "<span class=\"button_span green\"><a href='javascript:void(0)' rel='"+(parseInt(curPage)+1)+"'>    Next Page    </a>&nbsp;</span><span class=\"button_span green\"><a href='javascript:void(0)' rel='"+totalPage+"'>    End Page    </a></span>";
    }

    $("#pagecount").html(pageStr);
}

$(function(){
    fg=1;
    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });
});

function DescendOrder()
{
    fg=1;

    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });

};

function AscendOrder()
{
    fg=2;

    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });

};

function SYSUPMT()
{
    fg=3;

    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });


};

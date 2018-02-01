//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    var sn= document.getElementById("SN").value;
    $.ajax({
        type: 'POST',
        url: 'backend/pagehamamatsu.php',
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
            table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><th width=\"10\">NO</th><th width=\"60\">SN</th><th width=\"60\">SK</th><th width=\"60\">SP</th><th width=\"60\">IDB</th><th width=\"60\">SKB</th><th width=\"60\">Ebb</th><th width=\"60\">DC</th><th width=\"60\">Tr</th><th width=\"60\">Tf</th><th width=\"60\">PP</th><th width=\"60\">AP</th><th width=\"60\">QE</th><th width=\"60\">DE</th><th width=\"60\">BN</th><th width=\"60\">Transport Date</th></tr>";
            var list = json.list;
            $.each(list, function (index, array) { //遍历json数据列
                // if(array['ID'].length > 28){
                //     var title_sub = array['ID'].substring(0,20); // 获取子字符串。
                //  }
                //  else
                var title_sub = array['NO'];
                table_html += "<tr><td>" + title_sub + "</td><td>" + array['SN'] + "</td><td>" + array['SK'] + "</td><td>" + array['SP'] + "</td><td>" + array['IDB'] + "</td><td>" + array['SKB'] + "</td><td>" + array['Ebb'] + "</td><td>" + array['DC'] + "</td><td>" + array['Tr'] + "</td><td>" + array['Tf'] + "</td><td>" + array['PP'] + "</td><td>" + array['AP'] + "</td><td>" + array['QE'] + "</td><td>" + array['DE'] + "</td><td>" + array['BN'] + "</td><td>" + array['TransportDate'] + "</td><tr>";
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
    })


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

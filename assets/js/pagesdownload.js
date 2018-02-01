//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    $.ajax({
        type: 'POST',
        url: 'backend/pagedownload.php',
        data: {'pageNum': page - 1},
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
            table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><th width=\"10\">NO</th><th width=\"60\">The name of the tables</th><th width=\"60\">Operation Choose</th></tr>";
            var list = json.list;
            var title_sub = 1;
            $.each(list, function (index, array) { //遍历json数据列
                // if(array['ID'].length > 28){
                //     var title_sub = array['ID'].substring(0,20); // 获取子字符串。
                //  }
                //  elsethis

                table_html += "<tr><td>" + title_sub + "</td><td>" + array['tablename'] + "</td><td><a class=\"am-icon-cloud-download\" title=\"Download Table\" class=\"am-btn-primary am-btn-xs\" href=\"#\" onclick=\"{window.location.href='backend/download_pmttable.php?pmttable="+array['tablename']+"';}\">  Download  </a></td><tr>";
                title_sub=title_sub+1;
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
    $("#pagecount").html(pageStr);
}

$(function(){
    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });
});

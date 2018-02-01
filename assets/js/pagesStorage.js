//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    var sn= document.getElementById("SN").value;
    var item = $("input[name='radio10']:checked").val();
    //alert(item);
    $.ajax({
        type: 'POST',
        url: 'backend/pagestorage.php',
        data: {'pageNum': page - 1,"SN":sn,'FG':fg,"ITEM":item},
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
            if (item==1){
                table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><th width=\"10\">NO</th><th width=\"60\">SN</th><th width=\"60\">SR</th><th width=\"60\">SW</th><th width=\"60\">SD</th><th width=\"60\">SP</th><th width=\"60\">Location</th><th width=\"60\">Stage</th><th width=\"60\">SNote</th></tr>";
                var list = json.list;
                $.each(list, function (index, array) { //遍历json数据列
                    var title_sub = array['NO'];
                    table_html += "<tr><td>" + title_sub + "</td><td>" + array['SN'] + "</td><td>" + array['SR'] + "</td><td>" + array['SW'] + "</td><td>" + array['SD'] + "</td><td>" + array['SP'] + "</td><td>" + array['Location'] + "</td><td>" + array['Stage'] + "</td><td>" + array['SNote'] + "</td><tr>";
                });
            }else {
                table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><th width=\"10\">NO</th><th width=\"60\">SN</th><th width=\"60\">SR</th><th width=\"60\">SW</th><th width=\"60\">SD</th><th width=\"60\">SP</th><th width=\"60\">Location</th><th width=\"60\">Stage</th><th width=\"60\">SNote</th><th width=\"60\">Operation Choose</th></tr>";
                var list = json.list;
                $.each(list, function (index, array) { //遍历json数据列
                    var title_sub = array['NO'];
                    table_html += "<tr><td>" + title_sub + "</td><td>" + array['SN'] + "</td><td>" + array['SR'] + "</td><td>" + array['SW'] + "</td><td>" + array['SD'] + "</td><td>" + array['SP'] + "</td><td>" + array['Location'] + "</td><td>" + array['Stage'] + "</td><td>" + array['SNote'] + "</td><td><a class=\"am-icon-edit\" class=\"am-btn-primary am-btn-xs\" href=\"#\">  Modify  </a><a class=\"am-icon-trash\" class=\"am-btn-primary am-btn-xs\" href=\"#\" onclick=\"{if(confirm('Delete!?')){window.location.href='backend/delete_pmtstorage.php?pmtsn="+array['SN']+"';}else return false;}\">  Delete  </a></td><tr>";
                });
            }

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

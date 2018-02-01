//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    var sn= document.getElementById("SN").value;
    var val_info=$("#conclutionselect option:selected");
    val_info=val_info.text();
   // alert(val_info);

    $.ajax({
        type: 'POST',
        url: 'backend/pagesurfacegeometrystatistics.php',
        data: {'pageNum': page - 1,"SN":sn,'FG':fg,'SELECT':val_info},
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
            var table_html = "<div class=\"am-scrollable-horizontal\">";
            table_html += "<table class=\"am-table am-table-striped am-table-hover table-main \"><tr><th width=\"10\">NO</th><th width=\"10\">DATE</th><th width=\"10\">SN</th><th width=\"10\">Diameter </th><th width=\"10\">Dislocation of Flange</th><th width=\"10\">Gap of Flange</th><th width=\"10\">Crack</th><th width=\"10\">upBubble (>3.5mm) quality</th><th width=\"10\">upBubble (1-3.5mm) quality</th><th width=\"10\">downBubble (>5mm) quality</th><th width=\"10\">downBubble (2-5mm) quality</th><th width=\"10\">Scratch (w>1mm, l>50mm) quality</th><th width=\"10\">Scratch (w>1mm, 50>l>10mm) quality</th><th width=\"10\">Uneven quality</th><th width=\"10\">Black (>3mm) qulity</th><th width=\"10\">Black (1-3mm) qulity</th><th width=\"10\">White (>3mm) quality</th><th width=\"10\">upBubble (1-3.5mm)+Black (1-3mm) quality</th><th width=\"10\">Other quality</th><th width=\"10\">Open bubble quality</th><th width=\"10\">conclution (Standards (2017.8.14))</th><th width=\"10\">conclution </th></tr>";
            var list = json.list;
            $.each(list, function (index, array) { //遍历json数据列
                // if(array['ID'].length > 28){
                //     var title_sub = array['ID'].substring(0,20); // 获取子字符串。
                //  }
                //  else
                var title_sub = array['NO'];
                table_html += "<tr><td>" + title_sub + "</td><td>" + array['DATE'] + "</td><td>" + array['SN'] + "</td><td>" + array['Diameter'] + "</td><td>" + array['Dislocation_flange'] + "</td><td>" + array['Gap_flange'] + "</td><td>" + array['Crack'] + "</td><td>" + array['upBubble35_quality'] + "</td><td>" + array['upBubble135_quality'] + "</td><td>" + array['downBubble5_quality'] + "</td><td>" + array['downBubble25_quality'] + "</td><td>" + array['Scratch50_quality'] + "</td><td>" + array['Scratch1050_quality'] + "</td><td>" + array['Uneven_quality'] + "</td><td>" + array['Black3_qulity'] + "</td><td>" + array['Black13_qulity'] + "</td><td>" + array['White3_quality'] + "</td><td>" + array['upBubble135_Black13_quality'] + "</td><td>" + array['Other_quality'] + "</td><td>" + array['Open_bubble_quality'] + "</td><td>" + array['conclution814'] + "</td><td>" + array['conclution'] + "</td><tr>";
            });
            table_html += "</table></div>";
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

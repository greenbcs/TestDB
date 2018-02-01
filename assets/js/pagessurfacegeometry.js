//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    var sn= document.getElementById("SN").value;
    $.ajax({
        type: 'POST',
        url: 'backend/pagesurfacegeometry.php',
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
            var table_html = "<div class=\"am-scrollable-horizontal\">";
            table_html += "<table class=\"am-table am-table-striped am-table-hover table-main \"><tr><th width=\"10\">NO</th><th width=\"10\">DATE</th><th width=\"10\">SN</th><th width=\"10\">Diameter </th><th width=\"10\">Dislocation of Flange</th><th width=\"10\">Gap of Flange</th><th width=\"10\">Crack</th><th width=\"10\">Bubble a</th><th width=\"10\">Bubble b</th><th width=\"10\">Bubble-Effective</th><th width=\"10\">Scratch a</th><th width=\"10\">Scratch b</th><th width=\"10\">Uneven a</th><th width=\"10\">Uneven b</th><th width=\"10\">Black impurity a</th><th width=\"10\">Black impurity b</th><th width=\"10\">Black impurity-Effective</th><th width=\"10\">White impurity a</th><th width=\"10\">White impurity b</th><th width=\"10\">White impurity-Effective</th><th width=\"10\">Other a</th><th width=\"10\">Other b</th><th width=\"10\">Open bubble a</th><th width=\"10\">Open bubble b</th><th width=\"10\">Operation Choose</th></tr>";
            var list = json.list;
            $.each(list, function (index, array) { //遍历json数据列
                // if(array['ID'].length > 28){
                //     var title_sub = array['ID'].substring(0,20); // 获取子字符串。
                //  }
                //  else
                var title_sub = array['NO'];
                table_html += "<tr><td>" + title_sub + "</td><td>" + array['DATE'] + "</td><td>" + array['SN'] + "</td><td>" + array['Diameter'] + "</td><td>" + array['Dislocation_flange'] + "</td><td>" + array['Gap_flange'] + "</td><td>" + array['Crack'] + "</td><td>" + array['Bubble_a'] + "</td><td>" + array['Bubble_b'] + "</td><td>" + array['Bubble_effective'] + "</td><td>" + array['Scratch_a'] + "</td><td>" + array['Scratch_b'] + "</td><td>" + array['Uneven_a'] + "</td><td>" + array['Uneven_b'] + "</td><td>" + array['Black_impurity_a'] + "</td><td>" + array['Black_impurity_b'] + "</td><td>" + array['Black_impurity_effective'] + "</td><td>" + array['White_impurity_a'] + "</td><td>" + array['White_impurity_b'] + "</td><td>" + array['White_impurity_effective'] + "</td><td>" + array['Other_a'] + "</td><td>" + array['Other_b'] + "</td><td>" + array['Open_bubble_a'] + "</td><td>" + array['Open_bubble_b'] + "</td><td><a class=\"am-icon-trash\" class=\"am-btn-primary am-btn-xs\" href=\"#\" onclick=\"{if(confirm('Delete!?')){window.location.href='backend/delete_pmtsurfacegeometry.php?pmtsn="+array['SN']+"';}else return false;}\">  Delete  </a></td><tr>";
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


//获取数据
function getData(page)
{
    $.ajax({
        type: 'POST',
        url: 'backend/SShistory10.php',
        data: {'pageNum': page - 1},
        dataType: 'text',
        beforeSend: function () {
            $("#tablelist ").append("<h3>loading...</h3>");
        },
        success: function (json) {
            $("#tablelist").empty();
            var table_html = "";
            //table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><td widtd=\"10\">NO</td><td widtd=\"60\">SN</td><td widtd=\"60\">SD</td><td widtd=\"60\">Location</td></tr>";
            var list = json.list;
            $.each(list, function (index, array) { //遍历json数据列
                var title_sub = array['NO'];
                table_html += "<tr><td>" + title_sub + "</td><td>" + array['SN'] + "</td><td>" + array['SD'] + "</td><td>" + array['Location'] + "</td></tr>";
            });

            //table_html += "</table>";
            $("#tablelist").append(table_html);
        },
        error: function () {
            alert("Data load failed!");
        }
    });


}

$(function(){
    getData(1);
});

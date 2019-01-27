$(document).ready(function() {

console.log("Im working!")
	$.ajax({
		url: '/blog/sidebar/',
		type: 'get',
		dataType: 'json',
		success: function (data) {
			for (var i = 0; i < data["plans"].length; i++) {
			    var componentID = data["plans"][i]["Category"]
			    var Injury_key = data["plans"][i]["Injury_key"]
                var text="/blog/"+Injury_key+"/"
                var list = $("<li>")
                var link = $("<a />", {
				    href : text,
				    text : data["plans"][i]["Injury"]
				});
				list.append(link)
			    $('#'+componentID).append(list)
			}
		}
	});

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
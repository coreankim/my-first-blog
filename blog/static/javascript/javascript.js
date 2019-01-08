$(document).ready(function() {

console.log("Im working!")
	$.ajax({
		url: '/blog/sidebar/',
		type: 'get',
		dataType: 'json',
		success: function (data) {
			for (var x in data["plans"]) {
			    var componentID = data["plans"][x]["Category"]
			    var Injury_key = data["plans"][x]["Injury_key"]
                var text="/blog/"+Injury_key+"/"
                var list = $("<li>")
                var link = $("<a />", {
				    href : text,
				    text : data["plans"][x]["Injury"]
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
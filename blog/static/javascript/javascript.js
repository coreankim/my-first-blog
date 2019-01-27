$(document).ready(function() {

console.log("Im working!")
	$.ajax({
		url: '/blog/sidebar/',
		type: 'get',
		dataType: 'json',
		success: function (data) {
			var plans = data["plans"].slice(0);
			plans.sort(function(a,b) {
			    return a.id - b.id;
			});
			for (var i = 0; i < plans.length; i++) {
			    var componentID = plans[i]["Category"]
			    var Injury_key = plans[i]["Injury_key"]
                var text="/blog/"+Injury_key+"/"
                var list = $("<li>")
                var link = $("<a />", {
				    href : text,
				    text : plans[i]["Injury"]
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
$(document).ready(function() {

var currentID = window.location.href.split("/").reverse()[1];
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
				var Sidebar_menu = plans[i]["Sidebar_menu"]
			    var componentID = plans[i]["Category"]
			    var Injury_key = plans[i]["Injury_key"]
                var text="/blog/"+Injury_key+"/"
                var list = $("<li>")
                list.attr("id", Injury_key)
                var link = $("<a />", {
				    href : text,
				    text : plans[i]["Injury"]
				});
				list.append(link)
			    $('#'+componentID).append(list)
			    if (currentID == Injury_key) {
			    	$('a[href="#'+Sidebar_menu+'"]').attr("aria-expanded", "true")
			    	$('#'+Sidebar_menu).attr("class", "list-unstyled collapse show")
			    	$('#'+componentID).attr("class", "list-unstyled collapse show")
			    	$('#'+Injury_key).attr({"color": "#fff", "background-color": "#white"})
			    }
			}
		}
	});

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});
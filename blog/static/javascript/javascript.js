$(document).ready(function() {

console.log("Im working!")
	$.ajax({
		url: '/blog/sidebar/',
		type: 'get',
		dataType: 'json',
		success: function (data) {
			for (var x in data["plans"]) {
			    var componentID = data["plans"][x]["Category"]
			    var id = data["plans"][x]["id"]
                var text="/blog/"+id+"/"
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

            // {% for plan in plans %}
            //   {% if plan.Category == "Hip" %}
            //     <li>
            //       <a href="{% url 'plan_detail' pk=plan.pk %}">{{ plan.Injury }}</a>
            //     </li>
            //   {% endif %}
            // {% endfor %}

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

	$('#plan-detail-button').click( function(event) {
		var pk = $(this).attr("pk")
		var data_state = $(this).attr("data-state") 
	    $.ajax({
			url: '/blog/plan_detail_toggle/'+pk+'/',
			type: 'get',
			dataType: 'json',
			success: function (data) {
				if (data_state === "unclicked") {
					$('#plan-detail-button').attr("data-state", "clicked")
					$('#plan-detail-button').text("No detail")
					var textList = JSON.stringify(data["plan_detail_toggle"]["Acute_plan_reasons"]).replace(/\\n/g, '<br>#@').replace(/\:/g, ":#@").split("#@")
					var newTextList = [] 
					for (var i = 0; i < textList.length; i++) {
						var newText = ""
						if (textList[i].includes(":")) {
							newText = "<b>"+textList[i]+"</b>"
						} else {
							newText = textList[i]
						}
						newTextList.push(newText)
					}
					text = newTextList.join(" ")
					$('#acute-plan-info').html("<p>"+text.replace(/\"/g, "")+"<br></p>")
				} else if (data_state === "clicked") {
					$('#plan-detail-button').attr("data-state", "unclicked")
					$('#plan-detail-button').text("Detail")
					text = JSON.stringify(data["plan_detail_toggle"]["Acute_plan_checklist"])
					$('#acute-plan-info').html("<p>"+text.replace(/\\n/g, '<br>').replace(/\"/g, "")+"<br></p>")
				}
			}
	    });
	});
});
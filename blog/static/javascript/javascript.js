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
		var Injury_key = $(this).attr("Injury_key")
		var data_state = $(this).attr("data-state") 
	    $.ajax({
			url: '/blog/plan_detail_toggle/'+Injury_key+"/",
			type: 'get',
			dataType: 'json',
			success: function (data) {
				var acute_plan = JSON.stringify(data["plan_detail_toggle"]["Acute_plan"]).replace(/\\n/g, '<br>#@').replace(/\:/g, ":#@").split("#@")
				var acute_plan_edited = []
				var acute_plan_checklist = [] 
				for (var i = 0; i < acute_plan.length; i++) {
					var acute_plan_edited_text = ""
					var acute_plan_checklist_text = ""
					if (acute_plan[i].includes(":")) {
						acute_plan_edited_text = "<b>"+acute_plan[i]+"</b>"
						acute_plan_checklist_text = acute_plan[i].replace(":","")+"</br>"
					} else {
						acute_plan_edited_text = acute_plan[i]
					}
					acute_plan_edited.push(acute_plan_edited_text)
					acute_plan_checklist.push(acute_plan_checklist_text)
				}
				acute_plan_edited = acute_plan_edited.join(" ")
				acute_plan_checklist = acute_plan_checklist.join(" ")
				console.log("This is edited plan:")
				console.log(acute_plan_edited)
				console.log("This is checklist:")
				console.log(acute_plan_checklist)
				if (data_state === "unclicked") {
					$('#plan-detail-button').attr("data-state", "clicked")
					$('#plan-detail-button').text("Collapse")
					$('#acute-plan-info').html("<p>"+acute_plan_edited.replace(/\"/g, "").replace(/\%%/g, ":")+"<br></p>")
				} else if (data_state === "clicked") {
					$('#plan-detail-button').attr("data-state", "unclicked")
					$('#plan-detail-button').text("Expand")
					$('#acute-plan-info').html("<p>"+acute_plan_checklist.replace(/\\n/g, '<br>').replace(/\"/g, "")+"<br></p>")
				}
			}
	    });
	});
});
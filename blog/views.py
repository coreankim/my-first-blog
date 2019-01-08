from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post, Plan
from django.http import HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string
import json

def base(request):
	plans = Plan.objects.all()
	return render(request, 'blog/base.html')

def sidebar(request):
	plans = Plan.objects.all()
	planObjList = list()
	for x in plans:
		planObj = dict()
		planObj["Injury_key"] = x.Injury_key
		planObj["Injury"] = x.Injury
		planObj["Category"] = x.Category
		planObjList.append(planObj)
	return JsonResponse({'plans': planObjList})

# def plan_detail(request, Injury_key):
# 	plan = get_object_or_404(Plan, Injury_key=Injury_key)
# 	return render(request, 'blog/plan_detail.html', {'plan': plan})

def plan_detail(request, Injury_key):
	plan = get_object_or_404(Plan, Injury_key=Injury_key)
	acute_plan = plan.Acute_plan.split("\n")
	print(acute_plan)
	newTextList = list()
	for i in range(len(acute_plan)):
		newText = ""
		if "##" in acute_plan[i]:
			newText = "<h5><u>"+acute_plan[i].replace("##","")+"</u></h5>"
		elif "~~" in acute_plan[i]:
			newText = "<ul><li>"+acute_plan[i].replace("~~","").lstrip()+"</li></ul>"
		elif acute_plan[i] == "":
			newText = "<br>"
		else:
			newText = "<li>"+acute_plan[i]+"</li>"
		newTextList.append(newText)
	acute_plan_checklist = " ".join(newTextList)
	print("edited------------------------------")
	print(acute_plan_checklist)
	if plan.Category in ["Procedures", "Rotations_logistics", "Attending Preferences", "Templates", "Contact Info", "Education Sources"]:
		plan.Acute_plan = plan.Acute_plan
	else:
		plan.Acute_plan = acute_plan_checklist
	return render(request, 'blog/plan_detail.html', {'plan': plan})

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
	acute_plan_split = plan.Acute_plan.split("\n")
	newTextList = list()
	for i in range(len(acute_plan_split)):
		newText = ""
		if "##" in acute_plan_split[i]:
			newText = "<h5><u>"+acute_plan_split[i].replace("##","")+"</u></h5>"
		elif "~~" in acute_plan_split[i]:
			newText = "<ul><li>"+acute_plan_split[i].replace("~~","").lstrip()+"</li></ul>"
		elif acute_plan_split[i] == "":
			newText = "<br>"
		else:
			newText = "<li>"+acute_plan_split[i]+"</li>"
		newTextList.append(newText)
	acute_plan_edited = " ".join(newTextList)
	if plan.Category in ["Procedures", "Rotations_logistics", "Attending Preferences", "Templates", "Contact Info", "Education Sources"]:
		plan.Acute_plan = acute_plan_edited
	else:
		plan.Acute_plan = acute_plan_edited
	return render(request, 'blog/plan_detail.html', {'plan': plan})

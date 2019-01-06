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

def plan_detail(request, Injury_key):
	plan = get_object_or_404(Plan, Injury_key=Injury_key)
	acute_plan = plan.Acute_plan.replace(":", ":#@").replace("\n", "#@").split("#@")
	newTextList = list()
	for i in range(len(acute_plan)):
		newText = ""
		if ":" in  acute_plan[i]:
			newText = acute_plan[i].replace(":","\n")
		newTextList.append(newText)
	acute_plan_checklist = " ".join(newTextList)
	if plan.Category in ["Procedures", "Rotations", "Attending Preferences", "Templates", "Contact Info", "Education Sources"]:
		plan.Acute_plan = plan.Acute_plan
	else:
		plan.Acute_plan = acute_plan_checklist
	return render(request, 'blog/plan_detail.html', {'plan': plan})

def plan_detail_toggle(request, Injury_key):
	print("I got the data")
	plan = get_object_or_404(Plan, Injury_key=Injury_key)
	plan_detail_toggle = {
		"Category": plan.Category,
		"Acute_plan": plan.Acute_plan
	}
	return JsonResponse({'plan_detail_toggle': plan_detail_toggle})
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
	return render(request, 'blog/plan_detail.html', {'plan': plan})

def plan_detail_toggle(request, Injury_key):
	print("I got the data")
	plan = get_object_or_404(Plan, Injury_key=Injury_key)
	plan_detail_toggle = {
		"Category": plan.Category,
		"Acute_plan": plan.Acute_plan
	}
	return JsonResponse({'plan_detail_toggle': plan_detail_toggle})
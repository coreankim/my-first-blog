from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post, Plan
from django.http import HttpResponse
from django.http import JsonResponse
from django.template.loader import render_to_string

def base(request):
	plans = Plan.objects.all()
	return render(request, 'blog/base.html')

def plan_list(request):
    plans = Plan.objects.all()
    print(plans)
    return render(request, 'blog/plan_list.html', {'plans': plans})

def sidebar(request):
	plans = Plan.objects.all()
	planObjList = list()
	print(plans)
	for x in plans:
		planObj = dict()
		planObj["id"] = x.id
		planObj["Injury"] = x.Injury
		planObj["Category"] = x.Category
		planObjList.append(planObj)
	return JsonResponse({'plans': planObjList})

def plan_detail(request, pk):
    plan = get_object_or_404(Plan, pk=pk)
    return render(request, 'blog/plan_detail.html', {'plan': plan})

def plan_detail_toggle(request, pk):
	plan = get_object_or_404(Plan, pk=pk)
	plan_detail_toggle = {
		"Acute_plan_checklist": plan.Acute_plan_checklist,
		"Acute_plan_reasons": plan.Acute_plan_reasons
	}
	return JsonResponse({'plan_detail_toggle': plan_detail_toggle})
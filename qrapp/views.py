from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect


# from . import forms
from .decoder import get_my_code
# from .forms import Camera
# from django.core.cache import cache
# from django.db import models
# import json

def index(request):
    shop = request.GET.get("sh", "")
    return render(request, 'qrapp/index.html', {'shop': shop})

def info(request):
    return render(request, 'qrapp/info.html')

def error(request):
    return render(request, 'qrapp/error.html')

def printinfo(request):
    # myimg = ('static/img/01.jpg')
    data = {'cont': get_my_code()}
    return render(request, 'qrapp/result.html', data)
    # return render(request, 'qrapp/printinfo.html', data)

def result(request):
    return render(request, 'qrapp/result.html')


def getDataPhoto(request):
    if request.method == 'POST':

        shop = request.POST.get('shop', None)
        photo = request.POST.get('photo', None)
        # request_gdata = request.POST.get('photo,shop', None)
        takingData = get_my_code(photo, shop)

        if takingData == 0:
            return JsonResponse({
                "result": False,
                "js_string": takingData})
        if takingData == 1:
            return JsonResponse({
                "result": False,
                "js_string": takingData})
        # data = {'cont': takingData}
        return JsonResponse({
             "result": True,
             "js_string": takingData})
    else:
        return JsonResponse({
            "result": False,
            "js_string": ''})


from django.shortcuts import render
from django.http import JsonResponse


def home(request):
    return render(request, 'api/home.html')

def say_hi(request):
    return JsonResponse({"response" : "Hello there !"})

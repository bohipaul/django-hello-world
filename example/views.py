# example/views.py
from datetime import datetime
from django.shortcuts import render

def index(request):
    context = {
        'current_time': datetime.now()
    }
    return render(request, 'example/index.html', context)
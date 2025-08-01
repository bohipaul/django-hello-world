# example/views.py
from datetime import datetime

from django.http import HttpResponse

def index(request):
    now = datetime.now()
    html = f'''
    <html>
        <body>
            <h1>Hello from Vercel!</h1>
            <p>The current time is { now }.</p>
            <p>Welcome to our Django application running on Vercel.</p>
            <p>Enjoy your stay!</p>
        </body>
    </html>
    '''
    return HttpResponse(html)
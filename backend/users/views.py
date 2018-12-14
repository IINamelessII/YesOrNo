from django.shortcuts import render, redirect


def admin_login(request):
    if request.user.is_staff:
        return redirect('/admin/')
    else:
        return redirect('index')
    

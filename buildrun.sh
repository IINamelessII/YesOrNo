#!/bin/bash
cd frontend/
npm run build
cd ../
source venv/bin/activate
cd backend
python manage.py runserver
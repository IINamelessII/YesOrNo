If you write/refactor backend Python files such as views.py/models.py/urls.py/admin.pyserializers.py/permissions.py or another custom file, you should check its test coverage:
```
coverage run manage.py test
coverage report
```
or
```
coverage run manage.py test
coverage html
cd htmlcov
python -m http.server
```
And if your part of code is not covered by tests, you should cover it with unit tests.

[Django docs about testing](https://docs.djangoproject.com/en/2.1/topics/testing/)

Thank you for understanding and developing a quality product!

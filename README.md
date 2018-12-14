# YesOrNo
Django REST Framework &amp; React.js app [alpha v.1.0]


API return JSON only



"""
List represent all Poll objects in database
"""
/api/polls/$ - List of <dict> with fields:
"id":<int>
"flow":<str>
"agree":<int>
"disagree":<int>
"likes":<int>
"dislikes":<int>

Example:
~~~~
[{"id":17,"flow":"Code","statement":"Hello World?","agree":1024,"disagree":256,"likes":800,"dislikes":600},{"id":132,"flow":"World","statement":"Hello, Earth?","agree":123,"disagree":222,"likes":444,"dislikes":333}]
~~~~



"""
List represent all Flow objects in database
"""
/api/flows/$ - List of <dict> with fields:
"id":<int>
"name":<str>

Example:
~~~~
[{"id":12,"name":"Code"},{"id":32,"name":"World"}]
~~~~



"""
List represent all User objects in database
"""
/api/users/$ - List of <dict> with fields:
"id":<int>
"username":<str>
"polls":<list>
    <int>

Example:
~~~~
[{"id":232,"username":"Daniel","polls":[11,22,33,66]},{"id":444,"username":"FooBar","polls":[]}]
~~~~


"""
Dict represent Profile object of current user
"""
/api/profile/$ (if user is authenticated) - <dict> with fields:
"is_auth":<bool>
"message":<str> or null
"voted":<dict>
    "<int>":<bool>
"rated":<dict>
    "<int>":<bool>

Example:
~~~~
{"username":"Daniel","is_auth":true,"message":null,"voted":{"2":false,"3":true,"4":true},"rated":{"4":true,"5":false,"6":false}}
~~~~



"""
Dict represent Profile object of current user(not authentificated by far)
"""
/api/profile/$ (if user is not authenticated) - <dict> with fields:
"is_auth":<bool>
"message":<str> or null

Example:
~~~~
{"is_auth":false,"message":"Wrong Username or Password, please try again or reset your Password"}
~~~~



"""
List represent all Poll objects in database that was created by current user
"""
/api/polls_by_user/$ - List of <dict> with fields:
"id":<int>
"flow":<str>
"agree":<int>
"disagree":<int>
"likes":<int>
"dislikes":<int>

Example:
~~~~
[{"id":22,"flow":"Code","statement":"Hello World?","agree":1024,"disagree":256,"likes":800,"dislikes":600},{"id":144,"flow":"World","statement":"Hello, Earth?","agree":123,"disagree":222,"likes":444,"dislikes":333}]
~~~~



"""
Dict represent Poll objects fields(if Poll object with the id in database) or empty dict(if Poll object with the id not in database) 
"""
/api/shortpoll_by_id/(?P<id>.+)/$ - <dict> with fields:
"agree_rate":<int>
"rate":<int>

Examples:
~~~~
{"agree_rate":66,"rate":100}
~~~~

~~~~
{}
~~~~



"""
List represent all Poll objects in database with the flow
"""
/api/polls_by_flow/(?P<flow_name>.+)/$ - List of <dict> with fields:
"id":<int>
"flow":<str>
"agree":<int>
"disagree":<int>
"likes":<int>
"dislikes":<int>

Example:
~~~~
[{"id":22,"flow":"Code","statement":"Hello World?","agree":1024,"disagree":256,"likes":800,"dislikes":600},{"id":144,"flow":"Code","statement":"Hello, Earth?","agree":123,"disagree":222,"likes":444,"dislikes":333}]
~~~~
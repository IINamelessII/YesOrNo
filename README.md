# [YesOrNo](https://olehserikov.info/)
---

YesOrNo is a web project, made up using a Django REST framework &amp; React.js application.
* Version: open alpha test.
* Technical dependencies: API returns JSON only.
* Alternative link: https://yesorno.world

## Documentation
---
Soon.

## API Examples
---
### 1. List that represents all Poll objects in database.

Dependencies: /api/polls/$ - list of ```<dict>``` with fields:
* "id":```<int>```
* "flow":```<str>```
* "agree":```<int>```
* "disagree":```<int>```
* "likes":```<int>```
* "dislikes":```<int>```

Example:
```python
[{"id":17,"flow":"Code","statement":"Hello World?","agree":1024,"disagree":256,"likes":800,"dislikes":600},{"id":132,"flow":"World","statement":"Hello, Earth?","agree":123,"disagree":222,"likes":444,"dislikes":333}]
```

### 2. List that represents all Flow objects in database.

Dependencies: /api/flows/$ - list of ```<dict>``` with fields:
* "id":```<int>```
* "name":```<str>```

Example:
```python
[{"id":12,"name":"Code"},{"id":32,"name":"World"}]
```

### 3. List that represents all User objects in database.

Dependencies: /api/users/$ - list of ```<dict>``` with fields:
* "id":```<int>```
* "username":```<str>```
* "polls":```<list>```
    ```<int>```

Example:
```python
[{"id":232,"username":"Daniel","polls":[11,22,33,66]},{"id":444,"username":"FooBar","polls":[]}]
```

### 4. Dictionary that represents Profile object of current user.

Dependencies: /api/profile/$ (if user is authenticated) - ```<dict>``` with fields:
* "is_auth":```<bool>```
* "message":```<str>``` or ```<null>```
* "voted":```<dict>```
    ```"<String>"```:```<int>```
* "rated":```<dict>```
    ```"<String>"```:```<int>```

Example:
```python
{"username":"Daniel","is_auth":true,"message":null,"voted":{"+":[1,3,7],"-":[4,5]},"rated":{"+":[3,5],"-":[]}}
```

### 5. Dictionary that represents Profile object of current user (not authentificated by far).

Dependencies: /api/profile/$ (if user is not authenticated) - ```<dict>``` with fields:
* "is_auth":```<bool>```
* "message":```<str>``` or ```<null>```

Example:
```python
{"is_auth":false,"message":"Wrong Username or Password, please try again or reset your Password"}
```

### 6. List that represent all Poll objects in database that were created by current user.

Dependencies: /api/polls_by_user/$ - list of ```<dict>``` with fields:
* "id":```<int>```
* "flow":```<str>```
* "agree":```<int>```
* "disagree":```<int>```
* "likes":```<int>```
* "dislikes":```<int>```

Example:
```python
[{"id":22,"flow":"Code","statement":"Hello World?","agree":1024,"disagree":256,"likes":800,"dislikes":600},{"id":144,"flow":"World","statement":"Hello, Earth?","agree":123,"disagree":222,"likes":444,"dislikes":333}]
```

### 7. Dictionary that represent Poll object fields (if Poll object with the id is in database) or empty dictionary (if Poll object with the id is not in database).

Dependencies: /api/shortpoll_by_id/(?P<id>.+)/$ - ```<dict>``` with fields:
* "agree_rate":```<int>```
* "rate":```<int>```

Examples:
```python
{"agree_rate":66,"rate":100}
```

### 8. List that represent all Poll objects in database with the flow.

Dependencies: /api/polls_by_flow/(?P<flow_name>.+)/$ - list of ```<dict>``` with fields:
* "id":```<int>```
* "flow":```<str>```
* "agree":```<int>```
* "disagree":```<int>```
* "likes":```<int>```
* "dislikes":```<int>```

Example:
```python
[{"id":22,"flow":"Code","statement":"Hello World?","agree":1024,"disagree":256,"likes":800,"dislikes":600},{"id":144,"flow":"Code","statement":"Hello, Earth?","agree":123,"disagree":222,"likes":444,"dislikes":333}]
```

## Contributing
[Contributing](/CONTRIBUTING.md)

## License
[License](/LICENSE.md)

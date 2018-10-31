from rest_framework.permissions import BasePermission

class IsSuperUserOrReadOnly(BasePermission):
    """
    The request is authenticated as admin, or is a read-only request.
    """

    def has_permission(self, request, view):
        SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_superuser


class IsSuperUserOrOwnerAdnDeleteOnlyObjectOrReadOnly(BasePermission):
    """
    The request is authenticated as a user, or is a delete-only request.
    """

    def has_permission(self, request, view):
        SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
        if request.method in SAFE_METHODS:
            return True
        if request.user == obj.owner and request.method == 'DELETE':
            return True
        return request.user and request.user.is_superuser

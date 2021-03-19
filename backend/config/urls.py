from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from django.contrib import admin
from django.urls import (
    include,
    re_path,
    path,
)

from .routers import v1_urls

schema_view = get_schema_view(
    openapi.Info(
        title="movies",
        default_version="v1",
        description="movies",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

schema_patterns = [
    re_path(
        r"api(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json-yaml",
    ),
    path(
        "api/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger",
    ),
]

patterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(v1_urls)),
]

urlpatterns = schema_patterns + patterns

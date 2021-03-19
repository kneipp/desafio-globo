from rest_framework import routers
from django.urls import path

from app.movies.views import MovieViewSet

v1_router = routers.DefaultRouter()

v1_router.register("movies", MovieViewSet, basename="api_v1_movies")

v1_urls = v1_router.urls

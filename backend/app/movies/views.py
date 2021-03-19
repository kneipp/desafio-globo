from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .serializers import MovieSerializer
from .services import (
    get_movies_and_people,
    MoviesAPIException,
)


class MovieViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    def list(self, request) -> Response:
        try:
            movies = get_movies_and_people()
        except MoviesAPIException as exc:
            raise

        serialized_movies = MovieSerializer(movies, many=True)
        return Response(serialized_movies.data)

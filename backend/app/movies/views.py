from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .serializers import MovieSerializer
from .services import (
    get_movies_and_people,
    filter_movies_by,
    MoviesAPIException,
)


class MovieViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = MovieSerializer

    def list(self, request) -> Response:
        filters = {
            "freetext": request.GET.get("freetext"),
            "director": request.GET.get("director"),
            "year": request.GET.get("year"),
        }
        try:
            movies = get_movies_and_people()
        except MoviesAPIException as exc:
            raise

        filtered_movies = filter_movies_by(movies, filters)
        serialized_movies = MovieSerializer(filtered_movies, many=True)
        return Response(serialized_movies.data)

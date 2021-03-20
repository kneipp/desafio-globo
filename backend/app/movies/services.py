import requests
from requests.exceptions import RequestException

from django.core.cache import cache
from django.conf import settings


class MoviesAPIException(Exception):
    pass


def get_movies() -> list:
    if cached_movies := cache.get("movies"):
        return cached_movies

    movies_endpoint = f"{settings.MOVIES_API_BASE_URL}/films"
    try:
        response = requests.get(movies_endpoint, timeout=10)
    except RequestException as exc:
        raise MoviesAPIException(str(exc))

    movies = response.json()
    five_minutes = 5 * 60
    cache.set("movies", movies, five_minutes)
    return response.json()


def get_people() -> list:
    people_endpoint = f"{settings.MOVIES_API_BASE_URL}/people/"
    try:
        response = requests.get(people_endpoint, timeout=10)
    except RequestException as exc:
        raise MoviesAPIException(str(exc))
    return response.json()


def get_people_from_movie(movie: dict, people: list) -> list:
    for person in people:
        for film in person["films"]:
            if movie["id"] in film:
                yield person


def get_movies_and_people() -> list:
    movies = get_movies()
    people = get_people()
    for movie in movies:
        movie["people"] = get_people_from_movie(movie, people)
    return movies


def filter_movies_by(movies, filters: dict) -> list:
    if freetext := filters.get("freetext"):
        freetext = freetext.lower()
        movies = filter(
            lambda movie: freetext in movie["title"].lower()
            or freetext in movie["description"].lower(),
            movies,
        )
    if director := filters.get("director"):
        director = director.lower()
        movies = filter(lambda movie: director in movie["director"].lower(), movies)
    if year := filters.get("year"):
        year = year.lower()
        movies = filter(lambda movie: year in movie["release_date"].lower(), movies)
    return list(movies)

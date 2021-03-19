import requests
from requests.exceptions import RequestException

from django.conf import settings


class MoviesAPIException(Exception):
    pass


def get_movies() -> list:
    movies_endpoint = f"{settings.MOVIES_API_BASE_URL}/films"
    try:
        response = requests.get(movies_endpoint, timeout=10)
    except RequestException as exc:
        raise MoviesAPIException(str(exc))
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

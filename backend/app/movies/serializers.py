from rest_framework import serializers


class PersonSerializer(serializers.Serializer):
    name = serializers.CharField()


class MovieSerializer(serializers.Serializer):
    title = serializers.CharField()
    people = PersonSerializer(many=True)

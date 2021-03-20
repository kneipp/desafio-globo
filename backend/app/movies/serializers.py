from rest_framework import serializers


class PersonSerializer(serializers.Serializer):
    name = serializers.CharField()


class MovieSerializer(serializers.Serializer):
    title = serializers.CharField()
    director = serializers.CharField()
    description = serializers.CharField()
    people = PersonSerializer(many=True)
    release_date = serializers.IntegerField()
    rt_score = serializers.IntegerField()

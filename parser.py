"""Spreadsheet Parser to JSON

This script allows the user to make json file from the planilha.txt 
or similar spreadsheet file given by user.

Usage: 

    python parser.py 

or

    python parser.py /path/to/spreadsheet.txt

This script was tested with Python 3.9

This file contains the following functions:

    * normalize_date - returns date in dd/mm/yyyy format
    * normalize_size - converts size from bytes and returns into gigabytes
    * parse_data_from_blob - parses lines of spreadsheet
    * output_to_json - saves json data into movie_data.json file
    * main - the main function of the script
"""

import json
import re
import sys

from datetime import datetime
from typing import Generator

date_re = re.compile(r"[0-9]{2}-[0-9]{2}-[0-9]{4}")


def normalize_date(date_str: str) -> datetime:
    return datetime.strptime(date_str, "%d-%m-%Y").date().strftime("%d/%m/%Y")


def normalize_size(size_str: str) -> str:
    gb = int(size_str) / 1024 / 1024 / 1024
    if gb < 1:
        return f"{gb:.2f}GB".replace(".", ",")
    return f"{int(gb)}GB"


def parse_data_from_blob(blob: str) -> Generator[list, None, None]:
    lines = [line.strip() for line in blob.split("\n")[1:]]
    for line in lines:
        if not line:
            continue

        date_match = re.search(date_re, line)
        date = date_match.group(0)

        name = line[0 : date_match.start()].rstrip()
        spaces_in_name = name.count(" ")

        split_values = line.split()
        path = split_values[spaces_in_name + 2]
        size = split_values[-1]

        yield {
            "name": name,
            "path": path,
            "date": normalize_date(date),
            "size": normalize_size(size),
        }


def output_to_json(movie_data: list) -> None:
    with open("movie_data.json", "w") as output_f:
        json.dump(movie_data, output_f)


def main() -> None:
    default_input_file_path = "planilha.txt"
    try:
        input_file_path = sys.argv[1]
    except IndexError:
        input_file_path = default_input_file_path

    with open(input_file_path, "r") as input_stream:
        movie_data = list(parse_data_from_blob(input_stream.read()))

    output_to_json(movie_data)


if __name__ == "__main__":
    main()

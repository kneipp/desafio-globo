import React, { useState, useEffect, useCallback } from 'react'

import PulseLoader from "react-spinners/PulseLoader";

import { APIGet } from 'services/API'

export default function Home() {
  const [ movies, setMovies ] = useState(undefined)
  const [ filters, setFilters ] = useState(undefined)
  const [ activeMovie, setActiveMovie ] = useState(undefined)

  const getMovies = function(appliedFilters) {
    setMovies(undefined)
    APIGet('movies',
      (error) => console.log(error),
      (data) => setMovies(data),
      appliedFilters
    )
  }

  useEffect(() => {
    getMovies(filters)
  }, [])

  useEffect(() => {
    if (filters === undefined) {
      return
    }

    const debounce = setTimeout(() => {
      getMovies(filters)
    }, 500);
    return () => clearTimeout(debounce);
  }, [filters])

  const MovieComponent = useCallback(() =>
    <>
      <button onClick={() => setActiveMovie(undefined)} type="button" class="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      &lt;- Go back
    </button>
    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {activeMovie.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {activeMovie.description}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Director
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {activeMovie.director}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              People
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                {activeMovie.people.map(person =>
                  <li>{person.name}</li>
                )}
              </ul>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Score
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {activeMovie.rt_score}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    </>
  , [activeMovie])

  const MoviesComponent = useCallback(() =>
    <>
    <div className="mt-4">
      <label for="freetext" className="block text-sm font-medium text-gray-700">Filter by name or description</label>
      <input type="text" onChange={e => setFilters({...filters, freetext: e.target.value})} name="freetext" id="freetext" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></input>
    </div>
    <div className="mt-4 flex flex-row">
      <div className="flex-1 pr-2">
        <label for="director" className="block text-sm font-medium text-gray-700">Filter by director</label>
        <input type="text" onChange={e => setFilters({...filters, director: e.target.value})} name="director" id="director" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></input>
      </div>
      <div className="flex-1 pl-2">
        <label for="year" className="block text-sm font-medium text-gray-700">Filter by year</label>
        <input type="text" onChange={e => setFilters({...filters, year: e.target.value})} name="year" id="freetext_filter" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></input>
      </div>
    </div>
    <div className="mt-8 flex flex-col">
      {movies === undefined ?
        <PulseLoader color="gray" size={10} />
      :
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Director
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    People
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {movies && movies.map((movie, index) => 
                  <tr key={index} className={`${index % 2 == 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => setActiveMovie(movie)}>{movie.title}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movie.director}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movie.people && movie.people.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {movie.rt_score}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      }
    </div>
    </>
  , [movies])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {activeMovie ?
          <MovieComponent />
        :
          <MoviesComponent />
        }
      </div>
    </div>
  )
}

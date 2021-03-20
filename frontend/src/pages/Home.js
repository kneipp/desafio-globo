import React, { useState, useEffect } from 'react'

import PulseLoader from "react-spinners/PulseLoader";

import { APIGet } from 'services/API'

export default function Home() {
  const [ movies, setMovies ] = useState(undefined)
  const [ filters, setFilters ] = useState({})

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
    const debounce = setTimeout(() => {
      getMovies(filters)
    }, 1000);
    return () => clearTimeout(debounce);
  }, [filters])


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">{movie.title}</a>
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

      </div>
    </div>
  )
}

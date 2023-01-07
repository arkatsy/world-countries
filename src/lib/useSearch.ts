import { useReducer } from 'react'
import { Regions } from './types'

enum SEARCH {
  INPUT = 'INPUT',
  FILTER = 'FILTER',
}

type ValidFilters = Regions | null

type SearchActions =
  | {
      type: SEARCH.INPUT
      payload: string
    }
  | {
      type: SEARCH.FILTER
      payload: ValidFilters
    }

type SearchState = {
  input: string
  filter: ValidFilters
}

const initialState: SearchState = {
  input: '',
  filter: null,
}

const reducer = (state: SearchState, action: SearchActions) => {
  const { type, payload } = action
  switch (type) {
    case SEARCH.INPUT:
      return {
        ...state,
        input: payload,
      }
    case SEARCH.FILTER:
      return {
        ...state,
        filter: payload,
      }
    default:
      return state
  }
}
export const useSearch = () => {
  const [currentState, dispatch] = useReducer(reducer, initialState)

  const onSearchInputChange = (input: string) =>
    dispatch({ type: SEARCH.INPUT, payload: input })

  const onFilterChange = (region: Regions | null) =>
    dispatch({ type: SEARCH.FILTER, payload: region })

  return { currentState, onSearchInputChange, onFilterChange } as const
}

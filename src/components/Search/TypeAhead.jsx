import React, { Component } from 'react'

import SearchItem from './SearchItem';
import { getSearchResult } from '../../util/search.js'

class TypeAhead extends Component {
  state = {
    searchResults: false,
    itemRefs: [],
    currentFocus: 1,
  }

  componentWillReceiveProps(nextProps) {
    this.handleSearchQuery(nextProps)
  }

  componentDidMount() {
    this.handleSearchQuery()
  }

  async handleSearchQuery (nextProps) {
    const query = this.props.query || nextProps.query
    const data = await getSearchResult('https://api.themoviedb.org/3/search/multi?api_key=', query, '&query=')

    this.setState({ searchResults: data.results })
  }

  handleRefLink = link => {
    this.setState(prevState => ({
      itemRefs: [...prevState.itemRefs, link]
    }))
  }

  handleKeyDown = e => {
    e.preventDefault()
    const { currentFocus, itemRefs } = this.state

    if (e.key === 'ArrowUp') {
      if (currentFocus === 1) {
        this.setState({ currentFocus: itemRefs.length }, () => {
          itemRefs[itemRefs.length].focus()
        })
        return
      }

      this.setState({ currentFocus: currentFocus - 1 }, () => {
        itemRefs[currentFocus - 1].focus()
      })
      return
    }

    if (e.key === 'ArrowDown') {
      if (currentFocus === itemRefs.length) {
        this.setState({ currentFocus: 0 }, () => {
          itemRefs[0].focus()
        })
        return
      }

      this.setState({ currentFocus: currentFocus + 1 }, () => {
        itemRefs[currentFocus].focus()
      })
      return
    }
  }

  render() {
    const { searchResults } = this.state
    const { query } = this.props

    return (
      searchResults && (
        <div className="typeahead-form" onKeyDown={this.handleKeyDown}>
          <h3>Search results: {query}</h3>
          <ul>
            {searchResults.map((item, index) =>
              <SearchItem
                key={`search-${index}`}
                item={item}
                title={item.title}
                name={item.name}
                id={item.id}
                handleRefLink={this.handleRefLink}
              />
            )}
          </ul>
        </div>
      )
    )
  }
}

export default TypeAhead

import React, { Component } from 'react'

class Filter extends Component {

    render() {
        return (
        <input placeholder="Filter" onChange={e => this.props.filterfield(e.target.value)} />
        )
    }
}


export default Filter


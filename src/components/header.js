import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <div>
                <button onClick={()=>this.props.admin}>Admin</button>
            <h1>West Fran Dog Club</h1>
            </div>
        )
    }
}


export default Create
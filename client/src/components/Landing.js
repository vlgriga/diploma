import React, { Component } from 'react';
import { connect } from 'react-redux';


class Landing extends Component {
    render(){
        return (
            <div style={{ textAlign: 'center'}}>
                <h1>Emaily!</h1>
                Collect feedback from you!
            </div>
        )
    }    
}

function mapStateToProps({ auth }) {
    return { auth: auth };
} 

export default connect(mapStateToProps, null)(Landing);
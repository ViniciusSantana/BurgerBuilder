import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';

class Logout extends Component {
    componentDidMount() {
        const { onLogout } = this.props;
        onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

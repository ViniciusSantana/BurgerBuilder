import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => class extends Component {
       state = {
           error: null,
       }

       componentWillMount() {
           this.responseInteceptor = axios.interceptors.response.use((response) => response, (error) => {
               this.setState({ error });
               console.error(error);
           });

           this.requestInteceptor = axios.interceptors.request.use((request) => {
               this.setState({ error: null });
               return request;
           });
       }

       componentWillUnmount() {
           axios.interceptors.response.eject(this.responseInteceptor);
           axios.interceptors.request.eject(this.requestInteceptor);
       }

        errorConfirmHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
};

export default withErrorHandler;

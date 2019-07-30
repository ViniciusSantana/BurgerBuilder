import React, {Fragment, Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';



const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{
       state = {
           error: null
       }
        componentWillMount(){
           this.responseInteceptor =  axios.interceptors.response.use(response =>{
                console.log(response);
                return response;
            }, error =>{
                this.setState({error: error});
                console.error(error)
            });

            this.requestInteceptor = axios.interceptors.request.use(request =>{
                this.setState({error: null});
                console.log(request);
                return request;
            });
            
            
        }

        componentWillUnmount(){
            axios.interceptors.response.eject(this.responseInteceptor)
            axios.interceptors.request.eject(this.requestInteceptor)
        }

        errorConfirmHandler = () =>{
            this.setState({error: null});
        }

        render() {
            return (
            <Fragment>
                <Modal show = {this.state.error}
                    modalClosed ={this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Fragment>
            )
        }
    }
}

export default withErrorHandler;
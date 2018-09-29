import React, { Component } from 'react';
import Modal from '../../componets/UI/Modal/Modal';
import Aux from '../Auxil/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return  class extends Component {

        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        componentWillUnmount () {
            console.log('willUnmount ErrorHandlerCheck', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);

        }
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render () {
            return (
                <Aux>
                <Modal 
                    show={this.state.error}
                    modalClose={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : 'OH NO! SOMETHING HAPPENED RED ALERT!!!'}
                </Modal>
                <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};
export default withErrorHandler;
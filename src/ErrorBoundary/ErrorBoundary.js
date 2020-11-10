import React, { Component } from 'react';

class ErrorBoundary extends Component {//high order componentを作成(開発時にエラーが予測される場所をwrappingするために使用)
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {//エラーが投げれたら自動的に発火するメソッド
        this.setState({hasError: true, errorMessage: error});
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.errorMessage}</h1>;
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
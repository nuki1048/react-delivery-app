/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { Component, ErrorInfo } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { ErrorBoundaryProps } from './ErrorBoundary.props';

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
    this.setState({ error: true });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.error) {
      return <ErrorMessage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

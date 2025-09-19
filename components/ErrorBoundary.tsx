import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './common/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-dark-background text-center p-4">
            <div className="bg-card/60 dark:bg-dark-card/50 p-8 rounded-xl shadow-lg border border-border dark:border-dark-border">
                <h1 className="text-2xl font-bold text-red-500">Oops! Something went wrong.</h1>
                <p className="mt-4 text-muted-foreground">
                    An unexpected error occurred. Please try refreshing the page.
                </p>
                {this.state.error && (
                    <pre className="mt-4 text-left p-2 bg-muted dark:bg-dark-muted rounded-md text-xs overflow-auto max-h-40">
                        {this.state.error.toString()}
                    </pre>
                )}
                <Button onClick={this.handleReload} className="mt-6">
                    Reload Page
                </Button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

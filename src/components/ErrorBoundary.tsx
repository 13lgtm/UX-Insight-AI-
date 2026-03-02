import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error in component:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // @ts-expect-error - suppress false positive generic props type error
            if (this.props.fallback) {
                // @ts-expect-error
                return this.props.fallback;
            }
            return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex flex-col items-center justify-center gap-2 min-h-[100px]">
                    <span className="text-xl">⚠️</span>
                    <div className="text-sm font-medium">组件渲染异常或数据解析失败，请重新加载</div>
                </div>
            );
        }
        // @ts-expect-error
        return this.props.children;
    }
}

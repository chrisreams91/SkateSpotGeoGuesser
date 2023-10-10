interface Props {
  children: React.ReactNode;
}

const ErrorBoundary = ({ children }: Props) => {
  return children;
};

export default ErrorBoundary;

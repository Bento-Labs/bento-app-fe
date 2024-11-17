import { useRouteError } from "react-router-dom";

export const ErrorComponent = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col px-7 text-center">
      <h1 className="text-center text-2xl">Oops! Something went wrong...</h1>
      <p className="mt-4 text-center text-sm text-white/50">
        {error instanceof Error && error.message}
      </p>
    </div>
  );
};

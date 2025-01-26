import { useState } from 'react';

export const useExecuteSqlMutation = ({
  onSuccess,
  onError,
  ...options
}: {
  onSuccess?: (data: string[]) => void;
  onError?: (error: unknown) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = () => {
    setIsLoading(true);
    mimicResultsAfterTimeout()
      .then((results) => {
        setIsLoading(false);
        if (onSuccess) {
          onSuccess(results);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (onError) {
          onError(error);
        }
      });
  };

  return { mutate, isLoading };
};

function mimicResultsAfterTimeout(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mimic some data being returned with a delay
      resolve(["Mimicked", "Data", "Values"]);
    }, 2000);
  });
}

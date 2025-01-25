import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  useQueryStates,
} from "nuqs";

export function useProjectParams(options?: { shallow: boolean }) {
  const [params, setParams] = useQueryStates(
    {
      sort: parseAsArrayOf(parseAsString),
      name: parseAsString,
      q: parseAsString,
    },
    options,
  );

  return {
    ...params,
    setParams,
  };
}

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useSearchQuery(): [any, (key: string, value: string) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let values = {};

  searchParams.forEach((v, k) => {
    values = { ...values, [k]: v };
  });
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (value === "") {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const setQuery = (key: string, value: string) => {
    if (value === null) {
      router.push(pathname + "?" + createQueryString(key, ""));
      return;
    }
    router.push(pathname + "?" + createQueryString(key, value as string));
  };

  return [values, setQuery];
}

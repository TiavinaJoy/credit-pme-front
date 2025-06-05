import useSWR from "swr";
import { fetcher } from "../api/fetcher";

export function useApi(endpoint, options = {}) {
    const {
        revalidateIfStale = true,
        revalidateOnFocus = true,
        revalidateOnReconnect = true
    } = options;

    const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, { revalidateIfStale, revalidateOnFocus, revalidateOnReconnect });

    return {
        data, error, isLoading, mutate
    };
}
import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

/**
 * Appwrite API呼び出しと結果のキャッシュを処理するためのフック
 *
 * @param {UseAppwriteOptions<T, P>} options
 * @param {function(P): Promise<T>} options.fn 呼び出すAppwrite API関数
 * @param {P} [options.params={}] Appwrite API関数に渡すパラメータ
 * @param {boolean} [options.skip=false] trueの場合、API関数を即座に呼び出さない。
 *   代わりに、呼び出し元が返される`refetch`関数を呼び出してデータを取得する必要がある。
 *
 * @returns {UseAppwriteReturn<T, P>}
 * @returns {T | null} data 取得したデータ、またはまだ読み込み中かエラーが発生した場合はnull
 * @returns {boolean} loading データが現在取得中かどうか
 * @returns {string | null} error 取得中にエラーが発生した場合のエラーメッセージ、それ以外はnull
 * @returns {function(P): Promise<void>} refetch 新しいパラメータでデータを再取得する
 */

export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (newParams?: P) => await fetchData(newParams!);

  return { data, loading, error, refetch };
};

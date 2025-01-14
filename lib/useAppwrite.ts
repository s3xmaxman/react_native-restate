import { Alert } from "react-native";
import { useEffect, useState, useCallback } from "react";

/**
 *  @interface UseAppwriteOptions
 *  @description Appwrite API呼び出しのオプション
 *  @template T - APIの結果型
 *  @template P - APIパラメータ型
 */
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  /**
   *  @property fn
   *  @description API呼び出し関数
   *  @param {P} params - APIパラメータ
   *  @returns {Promise<T>} - API結果Promise
   */
  fn: (params: P) => Promise<T>;
  /**
   *  @property params
   *  @description APIパラメータ
   *  @optional
   */
  params?: P;
  /**
   *  @property skip
   *  @description API呼び出しをスキップするか
   *  @optional
   *  @default false
   */
  skip?: boolean;
}

/**
 *  @interface UseAppwriteReturn
 *  @description useAppwriteフックの戻り値
 *  @template T - APIの結果型
 *  @template P - APIパラメータ型
 */
interface UseAppwriteReturn<T, P> {
  /**
   *  @property data
   *  @description API結果データ
   */
  data: T | null;
  /**
   *  @property loading
   *  @description APIローディング状態
   */
  loading: boolean;
  /**
   *  @property error
   *  @description APIエラーメッセージ
   */
  error: string | null;
  /**
   *  @property refetch
   *  @description API再実行関数
   *  @param {P} newParams - 新しいパラメータ
   *  @returns {Promise<void>}
   */
  refetch: (newParams: P) => Promise<void>;
}

/**
 *  @function useAppwrite
 *  @description Appwrite API呼び出しフック
 *  @template T - APIの結果型
 *  @template P - APIパラメータ型
 *  @param {UseAppwriteOptions<T, P>} options - フックオプション
 *  @returns {UseAppwriteReturn<T, P>} - フック戻り値
 */
export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  /**
   *  @state data
   *  @description API結果データ状態
   */
  const [data, setData] = useState<T | null>(null);
  /**
   *  @state loading
   *  @description APIローディング状態
   */
  const [loading, setLoading] = useState(!skip);
  /**
   *  @state error
   *  @description APIエラーメッセージ状態
   */
  const [error, setError] = useState<string | null>(null);

  /**
   *  @function fetchData
   *  @description API呼び出し実行関数
   *  @param {P} fetchParams - APIパラメータ
   *  @returns {Promise<void>}
   */
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

  /**
   *  @function refetch
   *  @description API再実行関数
   *  @param {P} newParams - 新しいパラメータ
   *  @returns {Promise<void>}
   */
  const refetch = async (newParams: P) => await fetchData(newParams);

  return { data, loading, error, refetch };
};

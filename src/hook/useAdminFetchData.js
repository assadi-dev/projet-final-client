import { useCallback, useEffect, useRef, useState } from "react";
import { adminInstance } from "../services/instance";

/**
 * Effectue une requete de type GET avec insertion du token avec axios interceptor
 * @param {string} url endpoint de l'api qu'on souhaite interrogé ex: /questions
 * @param {object} params objet contenant les parametres de la requete
 * @returns
 */
const useFetchData = (url, params) => {
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    errors: null,
  });

  const abortControllerRef = useRef(new AbortController());

  const { isLoading, data, errors } = state;

  const fetch = useCallback(async (url, params) => {
    abortControllerRef.current?.abort();
    setState({ ...state, isLoading: true });
    try {
      const res = await adminInstance.get(url, {
        signal: abortControllerRef.current?.signal,
        ...params,
      });
      setState({ ...state, data: res.data });
    } catch (error) {
      setState({ ...state, errors: error });
    } finally {
      setState({ ...state, isLoading: false });
    }
  }, []);

  useEffect(() => {
    if (url) {
      fetch(url, params);
    }
  }, [url]);

  return { isLoading, data, errors, fetch };
};

export default useFetchData;

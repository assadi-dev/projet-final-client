import { useCallback, useEffect, useRef, useState } from "react";
import { instance } from "../services/instance";

/**
 * Effectue une requete de type GET
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
    setState({ ...state, isLoading: true });
    try {
      const res = await instance.get(url, {
        signal: abortControllerRef.current?.signal,
        ...params,
      });
      setState((prevState) => ({ ...prevState, data: res.data }));
    } catch (error) {
      setState((prevState) => ({ ...prevState, errors: error }));
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, []);

  return {
    isLoading,
    data,
    errors,
    fetch,
    abortController: abortControllerRef,
  };
};

export default useFetchData;

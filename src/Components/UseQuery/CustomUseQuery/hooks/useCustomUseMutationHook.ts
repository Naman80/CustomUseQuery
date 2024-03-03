import { useState } from "react";

export const useCustomUseMutationHook = ({ mutationFn, onSuccess, onError }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(undefined);
    const [status, setStatus] = useState('idle')
    const [variables, setVariables] = useState(undefined);
    const isError = status === 'error';
    const isPending = status === 'pending';
    const isSuccess = status === 'success';
    const isIdle = status === 'idle';

    const mutate = async (data: any) => {
        try {
            setStatus('pending');
            setVariables(data);
            const res = await mutationFn(data);
            setStatus('success')
            setData(res);
            onSuccess({ data: res, variables: data });
        } catch (error) {
            setError(error);
            setStatus('error')
            onError({ error: error, variables: data });
        }
    }
    const reset = () => {
        setData(undefined);
        setStatus('idle');
        setError(null);
        setVariables(undefined);
    }
    return { mutate, isError, isPending, isSuccess, isIdle, error, reset, variables, data, status }

}

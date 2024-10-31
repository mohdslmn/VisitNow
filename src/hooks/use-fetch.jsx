// import { useState } from "react";

// const UseFetch = (cb, options = {}) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);

//   const fn = async (...args) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await cb(options, ...args);
//       setData(response);
//       setError(null);
//     } catch (e) {
//         setError(e);
//     }finally{
//         setLoading(false);
//     }
//   };
//   return {data, loading , error, fn};
// };
// export default UseFetch;
import { useState, useCallback } from "react";

const UseFetch = (cb) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(...args);
      setData(response);
      return response;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [cb]);

  return { data, loading, error, execute };
};

export default UseFetch;
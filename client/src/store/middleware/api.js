import axios from "axios";
import * as actions from "../api";
import {getClientRequestConfig} from '../../config/requestConfig'
import {dataApi} from '../../config/api'

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
 let reqClientHeader = getClientRequestConfig();
  try {
    const response = await axios.request({
      baseURL:dataApi,
      headers:reqClientHeader.headers,
      url,
      method,
      data
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data  , message: "updated Succesfully" });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.response.data  });
  }
};

export default api;

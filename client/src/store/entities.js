import { combineReducers } from "redux";
import userReducer from "./users";
import bookingsReducer from  "./bookings";

export default combineReducers({
  user: userReducer,
  bookings:bookingsReducer
});

/* eslint-disable no-unused-vars */
import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../../store/action/ThemeAction";

//reducer
const initialState = {
  resto: [],
  query: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RESTO":
      return {
        ...state,
        resto: action.payload,
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

const Homepage = () => {
  // Use useReducer to manage resto and query states
  const [state, dispatch] = useReducer(reducer, initialState);
  const { resto, query } = state; // Destructure state
  const theme = useSelector((state) => state.theme.theme);
  const dispatchRedux = useDispatch();
  // Function to handle search input change
  const handleSearchChange = (e) => {
    dispatch({ type: "SET_QUERY", payload: e.target.value });
  };

  // Function to fetch restaurants based on query, memorized using useCallback
  const fetchRestaurants = useCallback(async () => {
    try {
      const url = query
        ? `https://restaurant-api.dicoding.dev/search?q=${query}`
        : "https://restaurant-api.dicoding.dev/list";
      const response = await axios.get(url);
      dispatch({ type: "SET_RESTO", payload: response.data }); // Assuming the response contains the restaurant data
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }, [query]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  console.log(theme);

  return (
    <div className="flex min-h-screen justify-center bg-gray-900 dark:bg-gray-200">
      <div className="flex-col pt-4 pb-12">
        <div className="flex justify-center my-4">
          {/* Center align the search bar */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search restaurants..."
              className="input w-full max-w-lg pl-10 border-0 text-white dark:text-black bg-gray-800 dark:bg-white"
            />
            {/* Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-70 text-white dark:text-black"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/* Display search result count or message */}
        <div className="flex justify-center my-4">
          <span className="text-gray-500">
            {query && resto.restaurants && resto.restaurants.length > 0
              ? `Found ${resto.restaurants.length} results for "${query}"`
              : query
              ? `No results found for "${query}"`
              : ""}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {/* <div className="">
            <button onClick={() => dispatchRedux(toogleTheme())}>
              Dispatch Test
            </button>
          </div> */}
          {resto?.restaurants && resto.restaurants.length > 0 ? (
            resto.restaurants.map((resto) => (
              <div key={resto.id}>
                <Card
                  id={resto.id}
                  img={
                    "https://restaurant-api.dicoding.dev/images/small/" +
                    resto.pictureId
                  }
                  heading={resto.name}
                  text={resto.description}
                  city={resto.city}
                  rate={resto.rating}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center">
              <p>No restaurants to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;

// src/components/SearchForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiAlertCircle, FiLoader } from "react-icons/fi";
import "../styles/search-form.css";

const SearchForm = ({ fetchRecommendations, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitError, setSubmitError] = React.useState(null);
  const [retryCount, setRetryCount] = React.useState(0);

  const onSubmit = async ({ location }) => {
    try {
      setSubmitError(null);
      await fetchRecommendations(location);
      setRetryCount(0);
    } catch (error) {
      if (retryCount < 2) {
        setRetryCount((c) => c + 1);
        setTimeout(() => onSubmit({ location }), 1000);
      } else {
        setSubmitError(error.message || "Failed after 3 attempts");
      }
    }
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="search-form">
        <div className="input-group">
          <div className="input-wrapper">
            <div
              className={`input-icon ${errors.location ? "error" : ""}`}
            ></div>
            <input
              {...register("location", {
                required: "Location is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
              })}
              placeholder="Enter city or town"
              className={`search-input ${errors.location ? "error" : ""}`}
              aria-label="Enter a city or town"
            />
          </div>

          <button
            type="submit"
            className="search-button"
            disabled={isLoading}
            aria-label="Search"
          >
            {isLoading ? (
              <>
                <FiLoader className="spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <FiSearch />
                <span>Search</span>
              </>
            )}
          </button>
        </div>

        {errors.location && (
          <div className="error-message" role="alert">
            <FiAlertCircle />
            <span>{errors.location.message}</span>
          </div>
        )}

        {submitError && (
          <div className="error-banner" role="alert">
            <FiAlertCircle />
            <span>{submitError}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;

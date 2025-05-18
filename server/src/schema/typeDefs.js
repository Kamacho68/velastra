module.exports = `
  """
  Represents a single activity and its suitability score for a given day.
  """
  type ActivityScore {
    """Name of the activity."""
    name: String!

    """Suitability score of the activity (0 to 100)."""
    score: Float!

    """Description or details about the activity."""
    description: String!
  }

  """
  Represents the weather forecast and activity recommendations for a specific day.
  """
  type DailyForecast {
    """Date of the forecast (ISO 8601 format)."""
    date: String!

    """List of recommended activities with scores."""
    activities: [ActivityScore!]!
  }

  """
  A structured representation of any errors returned by the API.
  """
  type Error {
    """Error message describing the issue."""
    message: String!

    """Optional details about the error."""
    details: String
  }

  """
  Root Query type for fetching recommendations and other data.
  """
  type Query {
    """
    Fetch activity recommendations based on location.
    - location: The name or identifier of the location for which recommendations are needed.
    """
    getActivityRecommendations(location: String!): [DailyForecast!]!

    """
    Test query to check if the API is running.
    """
    healthCheck: String!
  }
`;

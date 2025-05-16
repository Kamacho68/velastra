module.exports = `
  type ActivityScore {
    name: String!
    score: Float!
    description: String!
  }

  type DailyForecast {
    date: String!
    activities: [ActivityScore!]!
  }

  type Query {
    getActivityRecommendations(location: String!): [DailyForecast!]!
  }
`;

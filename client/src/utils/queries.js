import { gql } from '@apollo/client';

export const GET_RECOMMENDATIONS = gql`
  query GetRecommendations($location: String!) {
    getActivityRecommendations(location: $location) {
      date
      activities {
        name
        score
        description
      }
    }
  }
`;

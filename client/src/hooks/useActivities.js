// src/hooks/useActivities.js
import { useLazyQuery } from '@apollo/client';
import { GET_RECOMMENDATIONS } from '../utils/queries';
import { useState } from 'react';

export const useActivities = () => {
    const [location, setLocation] = useState('');
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [getRecommendations] = useLazyQuery(GET_RECOMMENDATIONS, {
        onCompleted: (data) => {
            if (data?.getActivityRecommendations) {
                setRecommendations(data.getActivityRecommendations);
                setError(null);
            } else {
                setError('No recommendations data received');
            }
            setLoading(false);
        },
        onError: (error) => {
            setError(error.message || 'Failed to fetch recommendations');
            setLoading(false);
            throw error; // Important for SearchForm to catch
        },
    });

    const fetchRecommendations = async (searchLocation) => {
        const sanitizedLocation = searchLocation.trim().replace(/[^a-zA-Z\s]/g, '');
        if (!sanitizedLocation) {
            throw new Error('Location is required');
        }

        setLoading(true);
        setLocation(sanitizedLocation);
        setRecommendations(null);
        setError(null);

        try {
            await getRecommendations({
                variables: { location: sanitizedLocation },
                fetchPolicy: 'network-only'
            });
        } catch (error) {
            setLoading(false);
            throw error;
        } finally {
            setLoading(false);  // Ensure loading is always set to false when done
        }
    };

    const clearRecommendations = () => {
        setRecommendations(null);
        setLocation('');
        setError(null);
    };

    return {
        location,
        recommendations,
        loading,
        error,
        fetchRecommendations,
        clearRecommendations
    };
};
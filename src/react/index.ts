import { useState, useEffect } from 'react';
import UIState from '../UIState';

export function useUIState<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Initialize UIState if needed
    useEffect(() => {
        UIState.init();
    }, []);

    // Get initial state
    const [state, setState] = useState<T>(() => {
        try {
            const value = UIState.getState<T>(key);
            return value !== undefined ? value : initialValue;
        } catch {
            return initialValue;
        }
    });

    // Set up observer
    useEffect(() => {
        return UIState.observe<T>(key, (value) => {
            setState(value);
        });
    }, [key]);

    // Return state and setter
    const setUIState = (value: T) => {
        UIState.setState(key, value);
    };

    return [state, setUIState];
}

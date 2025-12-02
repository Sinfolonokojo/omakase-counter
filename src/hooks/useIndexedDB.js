import { useState, useEffect } from 'react';
import {
  initDB,
  getAllSessions,
  getAllSushiTypes,
  initDefaultSushiTypes
} from '../utils/db';

export const useIndexedDB = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initDB();
        await initDefaultSushiTypes();
        setIsReady(true);
      } catch (err) {
        console.error('Failed to initialize database:', err);
        setError(err);
      }
    };

    init();
  }, []);

  return { isReady, error };
};

export const useSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isReady } = useIndexedDB();

  const loadSessions = async () => {
    if (!isReady) return;
    setLoading(true);
    try {
      const allSessions = await getAllSessions();
      // Sort by date descending (newest first)
      const sorted = allSessions.sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );
      setSessions(sorted);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [isReady]);

  return { sessions, loading, refreshSessions: loadSessions };
};

export const useSushiTypes = () => {
  const [sushiTypes, setSushiTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isReady } = useIndexedDB();

  const loadSushiTypes = async () => {
    if (!isReady) return;
    setLoading(true);
    try {
      const types = await getAllSushiTypes();
      setSushiTypes(types);
    } catch (error) {
      console.error('Failed to load sushi types:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSushiTypes();
  }, [isReady]);

  return { sushiTypes, loading, refreshSushiTypes: loadSushiTypes };
};

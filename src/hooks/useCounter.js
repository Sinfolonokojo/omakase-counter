import { useState, useEffect, useCallback } from 'react';
import { getPersonalRecord, saveSession } from '../utils/db';

export const useCounter = () => {
  const [count, setCount] = useState(0);
  const [personalRecord, setPersonalRecord] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [sessionStartTime] = useState(() => new Date());
  const [selectedSushiTypes, setSelectedSushiTypes] = useState([]);

  useEffect(() => {
    // Load personal record on mount
    const loadRecord = async () => {
      const record = await getPersonalRecord();
      setPersonalRecord(record);
    };
    loadRecord();
  }, []);

  const increment = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);

    // Trigger haptic feedback if supported
    if (window.navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Check for new record
    if (newCount > personalRecord && !isNewRecord) {
      setIsNewRecord(true);
    }
  }, [count, personalRecord, isNewRecord]);

  const decrement = useCallback(() => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);

      // Reset record flag if we go below record
      if (newCount <= personalRecord && isNewRecord) {
        setIsNewRecord(false);
      }
    }
  }, [count, personalRecord, isNewRecord]);

  const reset = useCallback(() => {
    setCount(0);
    setIsNewRecord(false);
  }, []);

  const addSushiType = useCallback((typeId) => {
    setSelectedSushiTypes(prev => {
      if (!prev.includes(typeId)) {
        return [...prev, typeId];
      }
      return prev;
    });
  }, []);

  const removeSushiType = useCallback((typeId) => {
    setSelectedSushiTypes(prev => prev.filter(id => id !== typeId));
  }, []);

  const endSession = useCallback(async (photoUrl = null) => {
    const sessionEndTime = new Date();
    const duration = Math.floor((sessionEndTime - sessionStartTime) / 1000 / 60); // minutes

    await saveSession({
      id: sessionId,
      count,
      date: sessionEndTime.toISOString(),
      sushiTypes: selectedSushiTypes,
      photoUrl,
      isRecord: isNewRecord,
      duration
    });

    // Update personal record if needed
    if (isNewRecord) {
      setPersonalRecord(count);
    }

    return sessionId;
  }, [sessionId, count, selectedSushiTypes, isNewRecord, sessionStartTime]);

  const startNewSession = useCallback(() => {
    setCount(0);
    setIsNewRecord(false);
    setSelectedSushiTypes([]);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    personalRecord,
    isNewRecord,
    sessionId,
    selectedSushiTypes,
    addSushiType,
    removeSushiType,
    endSession,
    startNewSession
  };
};

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Hooks
import { useCounter } from './hooks/useCounter';
import { useCamera } from './hooks/useCamera';
import { useShare } from './hooks/useShare';
import { useIndexedDB, useSessions, useSushiTypes } from './hooks/useIndexedDB';

// Components
import { CounterDisplay } from './components/Counter/CounterDisplay';
import { RecordIndicator } from './components/Counter/RecordIndicator';
import { RecordBreakModal } from './components/Celebration/RecordBreakModal';
import { CameraCapture } from './components/Camera/CameraCapture';
import { PhotoPreview } from './components/Camera/PhotoPreview';
import { Navigation } from './components/Layout/Navigation';
import { SessionList } from './components/History/SessionList';
import { TypeGrid } from './components/SushiTypes/TypeGrid';
import { FloatingSushi } from './components/Animations/FloatingSushi';
import { AnimatedBackground } from './components/Animations/AnimatedBackground';
import { WaveEffect } from './components/Animations/WaveEffect';
import { savePhoto } from './utils/db';

function App() {
  const [activeTab, setActiveTab] = useState('counter');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [celebrationTriggered, setCelebrationTriggered] = useState(false);
  const [tapTrigger, setTapTrigger] = useState(0);
  const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });

  // Hooks
  const { isReady } = useIndexedDB();
  const {
    count,
    increment,
    personalRecord,
    isNewRecord,
    sessionId,
    selectedSushiTypes,
    addSushiType,
    removeSushiType,
    endSession,
    startNewSession,
  } = useCounter();

  const {
    videoRef,
    photoData,
    error: cameraError,
    startCamera,
    capturePhoto,
    retakePhoto,
    stopCamera,
    handleFileInput,
  } = useCamera();

  const { share } = useShare();
  const { sessions, loading: sessionsLoading, refreshSessions } = useSessions();
  const { sushiTypes, loading: typesLoading } = useSushiTypes();

  // Show celebration modal when record is broken (only once per session)
  useEffect(() => {
    if (isNewRecord && !celebrationTriggered && count > 0) {
      setShowCelebration(true);
      setCelebrationTriggered(true);
    }
  }, [isNewRecord, celebrationTriggered, count]);

  const handleTakePhoto = async () => {
    setShowCelebration(false);
    setShowCamera(true);
    await startCamera();
  };

  const handleSkipPhoto = () => {
    setShowCelebration(false);
  };

  const handleSavePhoto = async () => {
    if (photoData) {
      await savePhoto(sessionId, photoData);
      await endSession(photoData);
      await refreshSessions();
      startNewSession();
      setCelebrationTriggered(false);
      setShowCamera(false);
      stopCamera();
      setActiveTab('history');
    }
  };

  const handleCancelCamera = () => {
    setShowCamera(false);
    stopCamera();
  };

  const handleShareSession = async (session) => {
    await share({
      count: session.count,
      photoUrl: session.photoUrl,
    });
  };

  const handleEndSessionWithoutPhoto = async () => {
    await endSession(null);
    await refreshSessions();
    startNewSession();
    setCelebrationTriggered(false);
  };

  const handleToggleSushiType = (typeId) => {
    if (selectedSushiTypes.includes(typeId)) {
      removeSushiType(typeId);
    } else {
      addSushiType(typeId);
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-rice flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍣</div>
          <p className="text-gray-600">Loading Omakase Counter...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Animated Background Effects */}
      <AnimatedBackground />
      <WaveEffect />

      {/* Counter Tab - Full Screen */}
      {activeTab === 'counter' && (
        <div className="fixed inset-0 pb-20 flex flex-col bg-rice">
          {/* Top bar with record and info */}
          <div className="flex-shrink-0 px-4 pt-8 pb-4">
            <h1 className="text-3xl font-heading font-bold text-center text-charcoal mb-4">
              Omakase Counter
            </h1>
            <RecordIndicator
              personalRecord={personalRecord}
              isNewRecord={isNewRecord}
            />
          </div>

          {/* Main tappable area */}
          <div
            className="flex-1 flex items-center justify-center cursor-pointer active:bg-gray-50 transition-colors"
            onClick={(e) => {
              increment();
              setTapPosition({ x: e.clientX, y: e.clientY });
              setTapTrigger(prev => prev + 1);
            }}
          >
            <div className="text-center">
              <CounterDisplay count={count} isNewRecord={isNewRecord} />
              <p className="text-gray-400 text-sm mt-4">Tap anywhere to count</p>
            </div>
          </div>

          {/* Floating Sushi Animation */}
          <FloatingSushi trigger={tapTrigger} position={tapPosition} />

          {/* Bottom info */}
          <div className="flex-shrink-0 px-4 pb-4 space-y-3">
            {selectedSushiTypes.length > 0 && (
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Today's selection:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedSushiTypes.slice(0, 5).map((typeId) => (
                    <span
                      key={typeId}
                      className="text-xs px-3 py-1 bg-white border border-border-gray text-gray-600 rounded-full"
                    >
                      {typeId}
                    </span>
                  ))}
                  {selectedSushiTypes.length > 5 && (
                    <span className="text-xs px-3 py-1 text-gray-500">
                      +{selectedSushiTypes.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {count > 0 && (
              <div className="text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEndSessionWithoutPhoto();
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  End session and save
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Other Tabs - With Container */}
      {activeTab !== 'counter' && (
        <div className="min-h-screen bg-rice pb-20">
          <div className="container mx-auto px-4 py-8 max-w-2xl">
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-heading font-bold text-charcoal mb-2">
                Omakase Counter
              </h1>
              <p className="text-gray-600 text-sm">お任せカウンター</p>
            </header>

            {/* Types Tab */}
            {activeTab === 'types' && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">
                  Sushi Types
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Tap to select the types you're eating in your current session
                </p>
                {typesLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading types...</p>
                  </div>
                ) : (
                  <>
                    {selectedSushiTypes.length > 0 && (
                      <div className="mb-6 p-4 bg-charcoal text-white rounded-lg">
                        <p className="text-sm font-medium mb-1">
                          ✓ {selectedSushiTypes.length} {selectedSushiTypes.length === 1 ? 'type' : 'types'} selected
                        </p>
                        <p className="text-xs opacity-80">
                          These will be saved with your session
                        </p>
                      </div>
                    )}
                    <TypeGrid
                      types={sushiTypes}
                      selectedTypes={selectedSushiTypes}
                      onToggle={handleToggleSushiType}
                    />
                  </>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">
                  Your Sessions
                </h2>
                <SessionList
                  sessions={sessions}
                  loading={sessionsLoading}
                  onShare={handleShareSession}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals */}
      <RecordBreakModal
        isOpen={showCelebration}
        count={count}
        previousRecord={personalRecord}
        onTakePhoto={handleTakePhoto}
        onSkip={handleSkipPhoto}
        onClose={() => setShowCelebration(false)}
      />

      <AnimatePresence>
        {showCamera && !photoData && (
          <CameraCapture
            videoRef={videoRef}
            onCapture={capturePhoto}
            onClose={handleCancelCamera}
            onFileSelect={handleFileInput}
            error={cameraError}
          />
        )}

        {showCamera && photoData && (
          <PhotoPreview
            photoData={photoData}
            onSave={handleSavePhoto}
            onRetake={() => {
              retakePhoto();
              startCamera();
            }}
            onCancel={handleCancelCamera}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

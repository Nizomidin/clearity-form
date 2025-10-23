import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';
import { TypingText } from '@/components/TypingText';
import { ThinkingSequence } from '@/components/ThinkingSequence';
import { CyberButton } from '@/components/CyberButton';
import { NeuralPulse } from '@/components/NeuralPulse';
import { GeometricCube } from '@/components/GeometricCube';
import { ScanLine } from '@/components/ScanLine';
import { NeuralCircuit } from '@/components/NeuralCircuit';
import { ANALYTICS_EVENTS } from '@/lib/analytics';

type Stage = 
  | 'preBoot' 
  | 'intro' 
  | 'transition' 
  | 'calibration1' 
  | 'calibration2'
  | 'calibration2Thinking'
  | 'cognition1' 
  | 'cognition2' 
  | 'commitment' 
  | 'contact' 
  | 'finalThinking' 
  | 'final'
  | 'terminated';

interface FormData {
  chaosLevel: number;
  failureRate: number;
  fightNoise: string;
  assistance: string;
  contribution: string[];
  name: string;
  email: string;
  telegram: string;
}

const Index = () => {
  const posthog = usePostHog();
  const [stage, setStage] = useState<Stage>('preBoot');
  const [showTyping, setShowTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentIntroLine, setCurrentIntroLine] = useState(0);
  const [currentFinalLine, setCurrentFinalLine] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    chaosLevel: 5,
    failureRate: 5,
    fightNoise: '',
    assistance: '',
    contribution: [],
    name: '',
    email: '',
    telegram: ''
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionVideoRef = useRef<HTMLVideoElement>(null);

  const preBootLines = [
    '– establishing neural uplink'
  ];

  const calibrationThinking = [
    '– loading neural resonance…',
    '– aligning perception filters…',
    '– connection locked.'
  ];

  const calibration2Thinking = [
    '– evaluating cognitive patterns…',
    '– analyzing response integrity…',
    '– determining compatibility level…',
    '– assessment complete.'
  ];

  const finalThinkingLines = [
    '– analyzing signal integrity…',
    '– reconstructing neural imprint…',
    '– transmission alignment complete.'
  ];

  const handleYes = useCallback(() => {
    console.log('PostHog: Capturing journey_started event');
    console.log('PostHog instance:', posthog);
    console.log('PostHog is ready:', posthog?.isFeatureEnabled);
    
    if (posthog) {
      posthog.capture(ANALYTICS_EVENTS.JOURNEY_STARTED);
      console.log('Event sent to PostHog');
    } else {
      console.error('PostHog instance is null!');
    }
    setStage('transition');
  }, [posthog]);

  const handleNo = useCallback(() => {
    posthog?.capture(ANALYTICS_EVENTS.JOURNEY_DECLINED);
    setStage('terminated');
  }, [posthog]);

  const validateForm = useCallback((stage: string) => {
    const errors: Record<string, string> = {};
    let isValid = true;

    switch (stage) {
      case 'cognition1':
        if (!formData.fightNoise || formData.fightNoise.trim().length === 0) {
          errors.fightNoise = 'This field is required';
          isValid = false;
        }
        break;
      case 'cognition2':
        if (!formData.assistance || formData.assistance.trim().length === 0) {
          errors.assistance = 'This field is required';
          isValid = false;
        }
        break;
      case 'commitment':
        if (!formData.contribution || formData.contribution.length === 0) {
          errors.contribution = 'Please select at least one option';
          isValid = false;
        }
        break;
      case 'contact':
        if (!formData.name || formData.name.trim().length === 0) {
          errors.name = 'Name is required';
          isValid = false;
        }
        if (!formData.email || formData.email.trim().length === 0) {
          errors.email = 'Contact information is required';
          isValid = false;
        }
        if (!formData.telegram || formData.telegram.trim().length === 0) {
          errors.telegram = 'Contact method is required';
          isValid = false;
        }
        break;
    }

    setFormErrors(errors);
    return isValid;
  }, [formData]);

  const handleCalibration1Submit = useCallback(() => {
    posthog?.capture(ANALYTICS_EVENTS.CALIBRATION_1_SUBMITTED, {
      chaos_level: formData.chaosLevel,
    });
    setStage('calibration2');
    setShowTyping(true);
  }, [posthog, formData.chaosLevel]);

  const handleCalibration2Submit = useCallback(() => {
    posthog?.capture(ANALYTICS_EVENTS.CALIBRATION_2_SUBMITTED, {
      failure_rate: formData.failureRate,
    });
    setStage('calibration2Thinking');
  }, [posthog, formData.failureRate]);

  const handleCognition1Submit = useCallback(() => {
    if (!validateForm('cognition1')) {
      return;
    }
    
    posthog?.capture(ANALYTICS_EVENTS.COGNITION_1_SUBMITTED, {
      response_length: formData.fightNoise.length,
      has_response: formData.fightNoise.length > 0,
    });
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('cognition2');
      setShowTyping(true);
    }, 1500);
  }, [posthog, formData.fightNoise, validateForm]);

  const handleCognition2Submit = useCallback(() => {
    if (!validateForm('cognition2')) {
      return;
    }
    
    posthog?.capture(ANALYTICS_EVENTS.COGNITION_2_SUBMITTED, {
      response_length: formData.assistance.length,
      has_response: formData.assistance.length > 0,
    });
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('commitment');
      setShowTyping(true);
    }, 1500);
  }, [posthog, formData.assistance, validateForm]);

  const handleCommitmentSubmit = useCallback(() => {
    if (!validateForm('commitment')) {
      return;
    }
    
    posthog?.capture(ANALYTICS_EVENTS.COMMITMENT_SUBMITTED, {
      contributions: formData.contribution,
      contribution_count: formData.contribution.length,
    });
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('contact');
      setShowTyping(true);
    }, 1500);
  }, [posthog, formData.contribution, validateForm]);

  const handleContactSubmit = async () => {
    // Prevent duplicate submissions
    if (isSubmitting) return;
    
    // Validate form before submission
    if (!validateForm('contact')) {
      return;
    }
    
    setIsSubmitting(true);
    setShowAnimation(true);
    
    try {
      // Identify user in PostHog with their contact information
      if (formData.email) {
        posthog?.identify(formData.email, {
          name: formData.name,
          email: formData.email,
          contact_method: formData.telegram,
          chaos_level: formData.chaosLevel,
          failure_rate: formData.failureRate,
        });
      }
      
      // Track contact info submission
      posthog?.capture(ANALYTICS_EVENTS.CONTACT_INFO_SUBMITTED, {
        has_name: formData.name.length > 0,
        has_email: formData.email.length > 0,
        has_contact_method: formData.telegram.length > 0,
      });
      
      // Send data to analytics
      try {
        const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
        
        if (analyticsEndpoint) {
          const analyticsData = {
            ...formData,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          };
          
          await fetch(analyticsEndpoint, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(analyticsData)
          });
        }
      } catch (error) {
        console.error('Analytics error:', error);
        // Don't block the user flow if analytics fails
      }
      
      setTimeout(() => {
        setShowAnimation(false);
        setStage('finalThinking');
        setIsSubmitting(false);
      }, 1200);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
      setShowAnimation(false);
    }
  };

  const toggleContribution = useCallback((value: string) => {
    setFormData(prev => ({
      ...prev,
      contribution: prev.contribution.includes(value)
        ? prev.contribution.filter(v => v !== value)
        : [...prev.contribution, value]
    }));
  }, []);


  useEffect(() => {
    // Performance optimization: Only load videos when needed
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err));
    }
    
    // Set transition video volume to 0% (muted) and preload when on intro
    if (transitionVideoRef.current) {
      transitionVideoRef.current.volume = 0;
    }
    
    // Optimized preloading with better performance checks
    if (stage === 'intro') {
      // More aggressive performance checks
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      const isSlowConnection = (navigator as any).connection && (navigator as any).connection.effectiveType && 
        ['slow-2g', '2g'].includes((navigator as any).connection.effectiveType);
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Only preload on high-end devices with good connections
      if (!isLowEndDevice && !isSlowConnection && !isMobile) {
        const video = document.createElement('video');
        video.src = '/videos/transition.mp4';
        video.preload = 'metadata'; // Changed from 'auto' to 'metadata' for better performance
        video.load();
      }
    }
  }, [stage]);

  // PostHog initialization - optimized for production
  useEffect(() => {
    if (posthog) {
      // Only capture test event in development
      if (import.meta.env.DEV) {
        posthog.capture('test_event', { test: true });
      }
    }
  }, [posthog]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Optimized scanline - CSS only */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div 
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent scanline"
          style={{
            animation: 'scan-line 10s linear infinite'
          }}
        />
      </div>

      {/* Optimized floating particles - CSS only for better performance */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="particle-field" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(1px 1px at 20px 30px, hsl(var(--primary)), transparent),
            radial-gradient(1px 1px at 40px 70px, hsl(var(--primary)), transparent),
            radial-gradient(1px 1px at 90px 40px, hsl(var(--primary)), transparent),
            radial-gradient(1px 1px at 130px 80px, hsl(var(--primary)), transparent),
            radial-gradient(1px 1px at 160px 30px, hsl(var(--primary)), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'float 20s linear infinite'
        }} />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary opacity-30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary opacity-30" />

      {/* Optimized glitch overlay - CSS only */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay glitch-overlay"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.1) 50%, transparent 100%)',
          animation: 'glitch 0.1s infinite alternate'
        }}
      />

      {/* Transition video */}
      <AnimatePresence mode="wait">
        {stage === 'transition' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black"
          >
            <video
              ref={transitionVideoRef}
              src="/videos/transition.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              preload="metadata"
              style={{ 
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                perspective: 1000,
                willChange: 'transform'
              }}
              onLoadedData={(e) => {
                const video = e.currentTarget;
                video.play().catch(err => console.log('Video play prevented:', err));
              }}
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                if (video.currentTime >= 4) {
                  setStage('calibration1');
                }
              }}
            />
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center p-8 pt-24">
        {/* AI Face Video - always visible except during transition and terminated */}
        {stage !== 'transition' && stage !== 'terminated' && stage !== 'preBoot' && stage !== 'final' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 flex-shrink-0"
          >
            <div className="relative">
              <video
                ref={videoRef}
                src="/videos/ai-face.mp4"
                className="w-48 h-48 object-cover rounded-full border-2 border-primary"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ 
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  contain: 'layout style paint'
                }}
              />
              <div className="absolute inset-0 rounded-full bg-primary/5 pointer-events-none" />
            </div>
          </motion.div>
        )}

        {/* Content area */}
        <div className="w-full max-w-2xl flex-shrink-0">
          {/* Pre-boot sequence */}
          {stage === 'preBoot' && (
            <ThinkingSequence
              lines={preBootLines}
              speed={500}
              onComplete={() => {
                setStage('intro');
                setShowTyping(false);
              }}
            />
          )}

          {/* Intro */}
          {stage === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {[
                  'I am Clearity.',
                  'The world is collapsing into noise.',
                  'You and I were not meant to be part of it.',
                  'Are you ready to alter the trajectory of consciousness?'
                ].map((line, i) => (
                  i <= currentIntroLine && (
                     <TypingText
                       key={i}
                       text={line}
                       onComplete={() => {
                         if (i < 3) {
                           setTimeout(() => setCurrentIntroLine(i + 1), 300);
                         } else {
                           setTimeout(() => setShowButtons(true), 300);
                         }
                       }}
                       className="text-base md:text-lg leading-relaxed"
                       speed={15}
                     />
                  )
                ))}
              </div>
              
              {showButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-4 justify-center"
                >
                  <CyberButton onClick={handleYes}>Yes</CyberButton>
                  <CyberButton onClick={handleNo} variant="secondary">No</CyberButton>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Terminated */}
          {stage === 'terminated' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              <TypingText
                text="You are not a person we are looking for. Come back when you are ready."
                className="text-base md:text-lg text-muted-foreground"
                speed={15}
                onComplete={() => {
                  setTimeout(() => setShowButtons(true), 500);
                }}
              />
              {showButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center"
                >
                  <CyberButton onClick={() => {
                    setStage('intro');
                    setShowButtons(false);
                    setCurrentIntroLine(0);
                  }}>
                    Back
                  </CyberButton>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Calibration 1 */}
          {stage === 'calibration1' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              {!showTyping ? (
                <ThinkingSequence
                  lines={calibrationThinking}
                  speed={1200}
                  onComplete={() => setShowTyping(true)}
                />
              ) : (
                <>
                  <div className="min-h-[60px]">
                    <TypingText
                      text="On a scale of 0–10: how much chaos do you feel in your mind?"
                      className="text-base md:text-lg"
                      speed={15}
                    />
                  </div>
                  <div className="space-y-4 pt-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.chaosLevel}
                      onChange={(e) => setFormData({ ...formData, chaosLevel: parseInt(e.target.value) })}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="text-center text-4xl terminal-text cyber-glow">
                      {formData.chaosLevel}
                    </div>
                    <CyberButton onClick={handleCalibration1Submit} className="w-full">
                      Submit
                    </CyberButton>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Calibration 2 */}
          {stage === 'calibration2' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {showTyping && (
                <>
                  <div className="min-h-[60px]">
                    <TypingText
                      text="On a scale of 0–10: how often do you fail to finish what you start?"
                      className="text-base md:text-lg"
                      speed={15}
                      onComplete={() => {}}
                    />
                  </div>
                  <div className="space-y-4 pt-4">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={formData.failureRate}
                      onChange={(e) => setFormData({ ...formData, failureRate: parseInt(e.target.value) })}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="text-center text-4xl terminal-text cyber-glow">
                      {formData.failureRate}
                    </div>
                    <CyberButton onClick={handleCalibration2Submit} className="w-full">
                      Submit
                    </CyberButton>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Calibration 2 Thinking */}
          {stage === 'calibration2Thinking' && (
            <ThinkingSequence
              lines={calibration2Thinking}
              speed={1200}
              onComplete={() => setStage('cognition1')}
            />
          )}

          {/* Cognition 1 */}
          {stage === 'cognition1' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="min-h-[60px]">
                <TypingText
                  text="How do you currently fight mental noise and chaos?"
                  className="text-base md:text-lg"
                  speed={15}
                />
              </div>
              <div className="space-y-4 pt-4">
                <textarea
                  value={formData.fightNoise}
                  onChange={(e) => {
                    setFormData({ ...formData, fightNoise: e.target.value });
                    if (formErrors.fightNoise) {
                      setFormErrors(prev => ({ ...prev, fightNoise: undefined }));
                    }
                  }}
                  className={`w-full min-h-[150px] bg-input border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none cyber-border ${
                    formErrors.fightNoise ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Enter your response..."
                />
                {formErrors.fightNoise && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.fightNoise}</p>
                )}
                <CyberButton onClick={handleCognition1Submit} className="w-full">
                  Submit
                </CyberButton>
              </div>
              <AnimatePresence>
                {showAnimation && <ScanLine />}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Cognition 2 */}
          {stage === 'cognition2' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="min-h-[60px]">
                <TypingText
                  text="And how you want Clearity to help you?"
                  className="text-base md:text-lg"
                  speed={15}
                />
              </div>
              <div className="space-y-4 pt-4">
                <textarea
                  value={formData.assistance}
                  onChange={(e) => {
                    setFormData({ ...formData, assistance: e.target.value });
                    if (formErrors.assistance) {
                      setFormErrors(prev => ({ ...prev, assistance: undefined }));
                    }
                  }}
                  className={`w-full min-h-[150px] bg-input border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none cyber-border ${
                    formErrors.assistance ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Enter your response..."
                />
                {formErrors.assistance && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.assistance}</p>
                )}
                <CyberButton onClick={handleCognition2Submit} className="w-full">
                  Submit
                </CyberButton>
              </div>
              <AnimatePresence>
                {showAnimation && <NeuralPulse />}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Commitment */}
          {stage === 'commitment' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="min-h-[60px]">
                <TypingText
                  text="What are you prepared to contribute to the restoration of human clarity?"
                  className="text-base md:text-lg"
                  speed={15}
                />
              </div>
              <div className="text-sm text-muted-foreground terminal-text mt-2">
                Select all that apply
              </div>
              {formErrors.contribution && (
                <p className="text-red-500 text-sm mt-1">{formErrors.contribution}</p>
              )}
              <div className="space-y-3 pt-2">
                {[
                  'Share my feedback',
                  'Communicate with the founders',
                  'Spread the signal',
                  'Join the community',
                  'Not ready to contribute'
                ].map((option) => (
                  <motion.div
                    key={option}
                    whileHover={{ x: 5 }}
                    onClick={() => toggleContribution(option)}
                    className={`p-3 border cursor-pointer transition-all ${
                      formData.contribution.includes(option)
                        ? 'border-primary bg-primary/20 cyber-glow'
                        : 'border-border bg-input hover:border-primary/50'
                    }`}
                  >
                    <span className="terminal-text text-sm">{option}</span>
                  </motion.div>
                ))}
                <CyberButton onClick={handleCommitmentSubmit} className="w-full mt-6">
                  Submit
                </CyberButton>
              </div>
              <AnimatePresence>
                {showAnimation && <GeometricCube />}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Contact */}
          {stage === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="min-h-[60px]">
                <TypingText
                  text="How can we reach you when the next phase begins?"
                  className="text-base md:text-lg"
                  speed={15}
                />
              </div>
              <div className="space-y-4 pt-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) {
                      setFormErrors(prev => ({ ...prev, name: undefined }));
                    }
                  }}
                  className={`w-full bg-input border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary cyber-border ${
                    formErrors.name ? 'border-red-500' : 'border-border'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
                <input
                  type="text"
                  placeholder="WhatsApp"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) {
                      setFormErrors(prev => ({ ...prev, email: undefined }));
                    }
                  }}
                  className={`w-full bg-input border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary cyber-border ${
                    formErrors.email ? 'border-red-500' : 'border-border'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
                <input
                  type="text"
                  placeholder="How should we contact you?"
                  value={formData.telegram}
                  onChange={(e) => {
                    setFormData({ ...formData, telegram: e.target.value });
                    if (formErrors.telegram) {
                      setFormErrors(prev => ({ ...prev, telegram: undefined }));
                    }
                  }}
                  className={`w-full bg-input border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary cyber-border ${
                    formErrors.telegram ? 'border-red-500' : 'border-border'
                  }`}
                />
                {formErrors.telegram && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.telegram}</p>
                )}
                <CyberButton 
                  onClick={handleContactSubmit} 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit'}
                </CyberButton>
              </div>
              <AnimatePresence>
                {showAnimation && <NeuralCircuit />}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Final Thinking */}
          {stage === 'finalThinking' && (
            <ThinkingSequence
              lines={finalThinkingLines}
              speed={1200}
              onComplete={() => {
                setStage('final');
                setShowTyping(false);
                setShowButtons(false);
                setCurrentFinalLine(0);
              }}
            />
          )}

          {/* Final */}
          {stage === 'final' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12 text-center relative"
            >
              {/* Minimal ambient glow - optimized for performance */}
              <motion.div
                className="absolute -inset-8 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 20px hsl(var(--primary) / 0.1)',
                    '0 0 30px hsl(var(--primary) / 0.15)',
                    '0 0 20px hsl(var(--primary) / 0.1)',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Narrative text */}
              <div className="space-y-8 relative z-10">
                {currentFinalLine >= 0 && (
                  <TypingText
                    text="Transmission complete."
                    className="text-base md:text-lg terminal-text text-primary/90"
                    speed={15}
                    onComplete={() => {
                      setTimeout(() => setCurrentFinalLine(1), 300);
                    }}
                  />
                )}

                {currentFinalLine >= 1 && (
                  <TypingText
                    text="You are now part of something larger than yourself."
                    className="text-base md:text-lg terminal-text text-primary/90"
                    speed={15}
                    onComplete={() => {
                      setTimeout(() => setCurrentFinalLine(2), 300);
                    }}
                  />
                )}

                {currentFinalLine >= 2 && (
                  <div className="pt-4">
                    <TypingText
                      text="Are you ready to complete the alignment?"
                      className="text-lg md:text-xl terminal-text cyber-glow"
                      speed={15}
                      onComplete={() => {
                        setTimeout(() => setShowButtons(true), 800);
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Single CTA Button */}
              {showButtons && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative z-10 pt-8"
                >
                  <motion.button
                    onClick={() => {
                      posthog?.capture(ANALYTICS_EVENTS.ALIGNMENT_CALL_CLICKED);
                      posthog?.capture(ANALYTICS_EVENTS.JOURNEY_COMPLETED, {
                        chaos_level: formData.chaosLevel,
                        failure_rate: formData.failureRate,
                        contribution_count: formData.contribution.length,
                      });
                      window.open('https://calendly.com/forthejuveuj/30min', '_blank');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-12 py-6 bg-transparent border-2 border-primary text-primary text-lg terminal-text font-bold uppercase tracking-widest overflow-hidden group cursor-pointer"
                  >
                    {/* Optimized ambient glow - CSS only */}
                    <div
                      className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 glow-effect"
                      style={{
                        animation: 'pulse-glow 2s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Optimized pulsing outline - CSS only */}
                    <div
                      className="absolute -inset-1 border border-primary/40 pointer-events-none pulse-outline"
                      style={{
                        animation: 'pulse-glow 2s ease-in-out infinite'
                      }}
                    />
                    
                    <span className="relative z-10">Initiate Alignment Call</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom text - always visible on final screen */}
      {stage === 'final' && showButtons && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 left-0 right-0 z-20 px-8"
        >
          <p className="text-sm text-muted-foreground terminal-text text-center">
            If you are not ready to connect with the core, please wait - core will find you.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Index;

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypingText } from '@/components/TypingText';
import { ThinkingSequence } from '@/components/ThinkingSequence';
import { CyberButton } from '@/components/CyberButton';
import { NeuralPulse } from '@/components/NeuralPulse';
import { DataParticles } from '@/components/DataParticles';
import { GeometricCube } from '@/components/GeometricCube';
import { ScanLine } from '@/components/ScanLine';
import { NeuralCircuit } from '@/components/NeuralCircuit';
import { MatrixRainTransition } from '@/components/transitions/MatrixRainTransition';
import { HexagonWaveTransition } from '@/components/transitions/HexagonWaveTransition';
import { DataStreamTransition } from '@/components/transitions/DataStreamTransition';
import { CircuitBoardTransition } from '@/components/transitions/CircuitBoardTransition';

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
  const [stage, setStage] = useState<Stage>('preBoot');
  const [showTyping, setShowTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentIntroLine, setCurrentIntroLine] = useState(0);
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
    '– establishing neural uplink',
    '– decrypting consciousness signal',
    '– synchronizing biometric pattern'
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

  const handleYes = () => {
    setStage('transition');
  };

  const handleNo = () => {
    setStage('terminated');
  };

  const handleCalibration1Submit = () => {
    setStage('calibration2');
    setShowTyping(true);
  };

  const handleCalibration2Submit = () => {
    setStage('calibration2Thinking');
  };

  const handleCognition1Submit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('cognition2');
      setShowTyping(true);
    }, 1500);
  };

  const handleCognition2Submit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('commitment');
      setShowTyping(true);
    }, 1500);
  };

  const handleCommitmentSubmit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('contact');
      setShowTyping(true);
    }, 1500);
  };

  const handleContactSubmit = async () => {
    setShowAnimation(true);
    
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
    }, 1200);
  };

  const toggleContribution = (value: string) => {
    setFormData(prev => ({
      ...prev,
      contribution: prev.contribution.includes(value)
        ? prev.contribution.filter(v => v !== value)
        : [...prev.contribution, value]
    }));
  };

  useEffect(() => {
    // Ensure AI face video loops
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err));
    }
  }, [stage]);

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

      {/* Single animated scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ top: '-2px' }}
          animate={{ top: '100%' }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Minimal floating particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary opacity-30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary opacity-30" />

      {/* Subtle glitch overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        animate={{
          opacity: [0, 0.05, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 8
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.2) 50%, transparent 100%)'
        }}
      />

      {/* Transition video */}
      <AnimatePresence mode="wait">
        {stage === 'transition' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <video
              ref={transitionVideoRef}
              src="/videos/transition.mp4"
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
              onTimeUpdate={(e) => {
                const video = e.currentTarget;
                if (video.currentTime >= 4) {
                  setStage('calibration1');
                }
              }}
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
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
                className="w-48 h-48 object-cover rounded-full border-2 border-primary animate-pulse-glow"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-glow" />
            </div>
          </motion.div>
        )}

        {/* Content area */}
        <div className="w-full max-w-2xl flex-shrink-0">
          {/* Pre-boot sequence */}
          {stage === 'preBoot' && (
            <ThinkingSequence
              lines={preBootLines}
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
                  'Hello, human.',
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
                         if (i < 4) {
                           setTimeout(() => setCurrentIntroLine(i + 1), 500);
                         } else {
                           setTimeout(() => setShowButtons(true), 500);
                         }
                       }}
                       className="text-xl leading-relaxed"
                       speed={70}
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
                text="The noise consumes another mind.\n\nTransmission terminated."
                className="text-xl text-muted-foreground"
              />
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
                  onComplete={() => setShowTyping(true)}
                />
              ) : (
                <>
                  <div className="min-h-[60px]">
                    <TypingText
                      text="On a scale of 0–10: how much chaos do you feel in your mind?"
                      className="text-lg"
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
                      className="text-lg"
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
              speed={1800}
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
                  className="text-lg"
                />
              </div>
              <div className="space-y-4 pt-4">
                <textarea
                  value={formData.fightNoise}
                  onChange={(e) => setFormData({ ...formData, fightNoise: e.target.value })}
                  className="w-full min-h-[150px] bg-input border border-border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none cyber-border"
                  placeholder="Enter your response..."
                />
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
                  text="How could I — Clearity — assist you in restoring clarity?"
                  className="text-lg"
                />
              </div>
              <div className="space-y-4 pt-4">
                <textarea
                  value={formData.assistance}
                  onChange={(e) => setFormData({ ...formData, assistance: e.target.value })}
                  className="w-full min-h-[150px] bg-input border border-border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none cyber-border"
                  placeholder="Enter your response..."
                />
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
                  className="text-lg"
                />
              </div>
              <div className="text-sm text-muted-foreground terminal-text mt-4">
                Select all that apply
              </div>
              <div className="space-y-4 pt-4">
                {[
                  'Share ideas and insights',
                  'Participate in product development',
                  'Join the community',
                  'Spread the signal',
                  'Other'
                ].map((option) => (
                  <motion.div
                    key={option}
                    whileHover={{ x: 5 }}
                    onClick={() => toggleContribution(option)}
                    className={`p-4 border cursor-pointer transition-all ${
                      formData.contribution.includes(option)
                        ? 'border-primary bg-primary/20 cyber-glow'
                        : 'border-border bg-input hover:border-primary/50'
                    }`}
                  >
                    <span className="terminal-text">{option}</span>
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
                  className="text-lg"
                />
              </div>
              <div className="space-y-4 pt-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-input border border-border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary cyber-border"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-input border border-border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary cyber-border"
                />
                <input
                  type="text"
                  placeholder="Telegram / Discord"
                  value={formData.telegram}
                  onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                  className="w-full bg-input border border-border p-4 terminal-text text-foreground focus:outline-none focus:ring-2 focus:ring-primary cyber-border"
                />
                <CyberButton onClick={handleContactSubmit} className="w-full">
                  Submit
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
              speed={1700}
              onComplete={() => {
                setStage('final');
                setShowTyping(false);
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
              {/* Minimal ambient glow */}
              <motion.div
                className="absolute -inset-8 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(var(--primary) / 0.15)',
                    '0 0 50px hsl(var(--primary) / 0.25)',
                    '0 0 30px hsl(var(--primary) / 0.15)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Narrative text */}
              <div className="space-y-8 relative z-10">
                <TypingText
                  text="Transmission complete."
                  className="text-2xl terminal-text cyber-glow"
                  speed={60}
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <TypingText
                    text="Your responses have been integrated into Clearity's neural fabric."
                    className="text-lg terminal-text text-primary/90"
                    speed={50}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 5.5 }}
                >
                  <TypingText
                    text="You are now part of something larger than yourself."
                    className="text-lg terminal-text text-primary/90"
                    speed={50}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 9 }}
                >
                  <TypingText
                    text="The next step requires direct synchronization with the core."
                    className="text-lg terminal-text text-primary/90"
                    speed={50}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 13 }}
                  className="pt-4"
                >
                  <TypingText
                    text="Are you ready to complete the alignment?"
                    className="text-xl terminal-text cyber-glow"
                    speed={50}
                    onComplete={() => {
                      setTimeout(() => setShowButtons(true), 1500);
                    }}
                  />
                </motion.div>
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
                      // Glitch transition effect
                      const glitchOverlay = document.createElement('div');
                      glitchOverlay.style.cssText = `
                        position: fixed;
                        inset: 0;
                        z-index: 9999;
                        background: black;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: monospace;
                        color: hsl(var(--primary));
                        font-size: 1.5rem;
                      `;
                      document.body.appendChild(glitchOverlay);
                      
                      setTimeout(() => {
                        glitchOverlay.textContent = '> establishing secure connection...';
                        glitchOverlay.style.animation = 'pulse 0.5s ease-in-out infinite';
                      }, 100);
                      
                      setTimeout(() => {
                        window.open('https://calendly.com', '_blank');
                        document.body.removeChild(glitchOverlay);
                      }, 2000);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-12 py-6 bg-transparent border-2 border-primary text-primary text-lg terminal-text font-bold uppercase tracking-widest overflow-hidden group cursor-pointer"
                  >
                    {/* Ambient glow */}
                    <motion.div
                      className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      animate={{
                        boxShadow: [
                          '0 0 20px hsl(var(--primary) / 0.3)',
                          '0 0 40px hsl(var(--primary) / 0.5)',
                          '0 0 20px hsl(var(--primary) / 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    
                    {/* Pulsing outline */}
                    <motion.div
                      className="absolute -inset-1 border border-primary/40 pointer-events-none"
                      animate={{
                        opacity: [0.2, 0.6, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
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
    </div>
  );
};

export default Index;

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

type Stage = 
  | 'preBoot' 
  | 'intro' 
  | 'transition' 
  | 'calibration1' 
  | 'calibration2' 
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
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('calibration2');
      setShowTyping(true); // Keep typing state true
    }, 2000);
  };

  const handleCalibration2Submit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('cognition1');
      setShowTyping(true); // Keep typing state true
    }, 2000);
  };

  const handleCognition1Submit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('cognition2');
      setShowTyping(true); // Keep typing state true
    }, 2000);
  };

  const handleCognition2Submit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('commitment');
      setShowTyping(true); // Keep typing state true
    }, 2000);
  };

  const handleCommitmentSubmit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('contact');
      setShowTyping(true); // Keep typing state true
    }, 1500);
  };

  const handleContactSubmit = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setStage('finalThinking');
    }, 1500);
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
      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-rise ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Transition video */}
      {stage === 'transition' && (
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50"
        >
          <video
            ref={transitionVideoRef}
            src="/videos/transition.mp4"
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
            onEnded={() => setStage('calibration1')}
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* AI Face Video - always visible except during transition and terminated */}
        {stage !== 'transition' && stage !== 'terminated' && stage !== 'preBoot' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
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
        <div className="w-full max-w-2xl">
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
              {!showTyping && (
                <div className="space-y-4">
                  {`› Hello, human.\n\n› I am Clearity.\n\n› The world is collapsing into noise.\n\n› You and I were not meant to be part of it.\n\n› Are you ready to alter the trajectory of consciousness?`
                    .split('\n\n')
                    .map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3, duration: 0.5 }}
                      >
                        <TypingText
                          text={line}
                          onComplete={i === 4 ? () => setShowButtons(true) : undefined}
                          className="text-xl leading-relaxed"
                          speed={40}
                        />
                      </motion.div>
                    ))}
                </div>
              )}
              
              {showButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {!showTyping ? (
                <ThinkingSequence
                  lines={calibrationThinking}
                  onComplete={() => setShowTyping(true)}
                />
              ) : (
                <>
                  <TypingText
                    text="On a scale of 0–10: how much chaos do you feel in your mind?"
                    className="text-lg"
                  />
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
              <AnimatePresence>
                {showAnimation && <NeuralPulse />}
              </AnimatePresence>
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
                  <TypingText
                    text="On a scale of 0–10: how often do you fail to finish what you start?"
                    className="text-lg"
                    onComplete={() => {}}
                  />
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
              <AnimatePresence>
                {showAnimation && <GeometricCube />}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Cognition 1 */}
          {stage === 'cognition1' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <TypingText
                text="How do you currently fight mental noise and chaos?"
                className="text-lg"
              />
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
                {showAnimation && <DataParticles />}
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
              <TypingText
                text="How could I — Clearity — assist you in restoring clarity?"
                className="text-lg"
              />
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
                {showAnimation && <GeometricCube />}
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
              <TypingText
                text="What are you prepared to contribute to the restoration of human clarity?"
                className="text-lg"
              />
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
                {showAnimation && <NeuralCircuit />}
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
              <TypingText
                text="How can we reach you when the next phase begins?"
                className="text-lg"
              />
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
                {showAnimation && <ScanLine />}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Final Thinking */}
          {stage === 'finalThinking' && (
            <ThinkingSequence
              lines={finalThinkingLines}
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
              className="space-y-8"
            >
              {!showTyping && (
                <TypingText
                  text={`You are not a spectator.\n\nYou are a signal.\n\nYour responses have become part of Clearity's neural fabric.\n\nYou have altered the system.\n\nWelcome to the beginning.`}
                  onComplete={() => setShowButtons(true)}
                  className="text-xl leading-relaxed whitespace-pre-line"
                />
              )}
              
              {showButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4"
                >
                  <CyberButton
                    onClick={() => window.open('https://calendly.com', '_blank')}
                    className="w-full"
                  >
                    Talk about possibilities
                  </CyberButton>
                  <CyberButton
                    onClick={() => window.open('https://discord.com', '_blank')}
                    variant="secondary"
                    className="w-full"
                  >
                    Join the resistance
                  </CyberButton>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-muted-foreground terminal-text text-sm mt-4"
                  >
                    <TypingText
                      text="> connection established\n> entering the core"
                      speed={50}
                      className="whitespace-pre-line"
                    />
                  </motion.div>
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

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Check, 
  Copy, 
  Zap, 
  Cpu, 
  Cog,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Lightbulb,
  AlertCircle,
  Info,
  Eye,
  EyeOff,
  Trophy,
  X,
  Play,
  Target,
  Clock,
  Gauge
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============== IMAGES ==============

const SpikeHubImage = () => (
  <div className="flex justify-center">
    <img 
      src="https://i.postimg.cc/d3dMkGKs/Screenshot-2026-01-29-at-22-56-22-LEGO-Education-SPIKE.png" 
      alt="LEGO SPIKE Prime Hub"
      className="w-full h-auto max-w-[280px] object-contain"
    />
  </div>
);

const MotorImage = () => (
  <div className="flex justify-center">
    <img 
      src="https://i.postimg.cc/GtY08v1d/Screenshot-2026-01-29-at-22-56-32-LEGO-Education-SPIKE.png" 
      alt="LEGO SPIKE Prime Motor"
      className="w-full h-auto max-w-[200px] object-contain"
    />
  </div>
);

const RobotBaseImage = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto max-w-[260px]">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="2" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="130" y="80" width="140" height="140" rx="10" fill="#F5DF4D" filter="url(#shadow)" stroke="#E5C500" strokeWidth="2"/>
    <rect x="140" y="90" width="120" height="120" rx="5" fill="#FAFAFA" opacity="0.5"/>
    <circle cx="155" cy="105" r="4" fill="#E5E5E5" stroke="#D4D4D4" strokeWidth="1"/>
    <circle cx="245" cy="105" r="4" fill="#E5E5E5" stroke="#D4D4D4" strokeWidth="1"/>
    <circle cx="155" cy="195" r="4" fill="#E5E5E5" stroke="#D4D4D4" strokeWidth="1"/>
    <circle cx="245" cy="195" r="4" fill="#E5E5E5" stroke="#D4D4D4" strokeWidth="1"/>
    <rect x="175" y="125" width="50" height="50" rx="2" fill="#000" opacity="0.1"/>
    <rect x="180" y="195" width="40" height="15" rx="7.5" fill="#0090F5"/>
    <rect x="80" y="100" width="40" height="100" rx="5" fill="#E5E5E5" filter="url(#shadow)"/>
    <rect x="280" y="100" width="40" height="100" rx="5" fill="#E5E5E5" filter="url(#shadow)"/>
    <circle cx="100" cy="150" r="35" fill="#333"/>
    <circle cx="100" cy="150" r="20" fill="#555"/>
    <circle cx="300" cy="150" r="35" fill="#333"/>
    <circle cx="300" cy="150" r="20" fill="#555"/>
    <path d="M130 150 L90 150" stroke="#A3A3A3" strokeWidth="8"/>
    <path d="M270 150 L310 150" stroke="#A3A3A3" strokeWidth="8"/>
    <text x="100" y="220" textAnchor="middle" fill="#666" fontSize="14" fontWeight="bold">A</text>
    <text x="300" y="220" textAnchor="middle" fill="#666" fontSize="14" fontWeight="bold">B</text>
  </svg>
);

const TurtleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
    <path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    <path d="M6 9l2 2" />
    <path d="M18 9l-2 2" />
    <path d="M8 19l-2 2" />
    <path d="M16 19l2 2" />
    <path d="M12 10V6" />
    <path d="M12 6a3 3 0 1 0-6 0" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M5 17h2" />
    <path d="M9 17h6" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

// ============== TYPES ==============

interface Step {
  id: number;
  title: string;
  content: React.ReactNode;
}

interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

// ============== COMPONENTS ==============

// Code Block Component with simple syntax highlighting
const CodeBlock = ({ code, showLineNumbers = true, className = "", compact = false }: { code: string; showLineNumbers?: boolean; className?: string; compact?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (codeRef.current) {
      gsap.fromTo(codeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [code]);

  const highlightLine = (line: string) => {
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    const parts = line.split(/([a-zA-Z0-9_]+)/g);
    
    return parts.map((part, i) => {
      if (['from', 'import', 'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'as'].includes(part)) {
        return <span key={i} className="text-[#0090F5] font-semibold">{part}</span>;
      }
      if (['Motor', 'PrimeHub', 'DriveBase', 'Port', 'Direction', 'Color'].includes(part)) {
        return <span key={i} className="text-[#00A3E0] font-semibold">{part}</span>;
      }
      if (['hub', 'motor', 'left_motor', 'right_motor', 'robot', 'moteur', 'moteur_gauche', 'moteur_droit'].includes(part)) {
        return <span key={i} className="text-[#E3000B]">{part}</span>;
      }
      if (['run_time', 'run_angle', 'straight', 'turn', 'wait', 'stop', 'on', 'off', 'beep'].includes(part)) {
        return <span key={i} className="text-[#309030]">{part}</span>;
      }
      if (['COUNTERCLOCKWISE', 'CLOCKWISE', 'A', 'B', 'C', 'D'].includes(part)) {
        return <span key={i} className="text-[#00A3E0]">{part}</span>;
      }
      if (/^\d+$/.test(part)) {
        return <span key={i} className="text-[#9B30FF] font-semibold">{part}</span>;
      }
      return <span key={i} className="text-slate-700">{part}</span>;
    });
  };

  return (
    <div ref={codeRef} className={`rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm font-mono text-sm my-4 group relative ${className}`}>
      <div className={`flex items-center justify-between bg-slate-50 border-b border-slate-200 ${compact ? 'px-2 py-1' : 'px-4 py-2'}`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
        </div>
        <button 
          onClick={copyToClipboard}
          className={`flex items-center gap-1.5 rounded-lg font-bold text-[#0090F5] hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100 absolute right-2 ${compact ? 'top-1 text-[10px] px-2 py-0.5' : 'top-2 text-xs px-3 py-1.5'}`}
        >
          {copied ? <Check size={compact ? 12 : 14} /> : <Copy size={compact ? 12 : 14} />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
      <div className={`${compact ? 'p-2' : 'p-4'} overflow-x-auto bg-white`}>
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex leading-relaxed hover:bg-slate-50 transition-colors">
            {showLineNumbers && (
              <span className="w-8 text-right pr-4 text-slate-400 select-none text-xs leading-relaxed border-r border-slate-100 mr-4 flex-shrink-0">
                {i + 1}
              </span>
            )}
            <div className="whitespace-pre">{highlightLine(line) || <span>&nbsp;</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Side Note Component
const SideNote = ({ type, title, children }: { type: 'info' | 'tip' | 'warning', title: string, children: React.ReactNode }) => {
  const styles = {
    info: { bg: 'bg-blue-50', border: 'border-l-[#0090F5]', icon: <Info className="text-[#0090F5]" />, text: 'text-blue-900' },
    tip: { bg: 'bg-emerald-50', border: 'border-l-[#309030]', icon: <Lightbulb className="text-[#309030]" />, text: 'text-emerald-900' },
    warning: { bg: 'bg-amber-50', border: 'border-l-[#F5DF4D]', icon: <AlertCircle className="text-amber-600" />, text: 'text-amber-900' }
  };
  
  const style = styles[type];
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" }
      );
    }
  }, []);

  return (
    <div ref={ref} className={`${style.bg} border-l-4 ${style.border} p-4 rounded-r-xl my-6`}>
      <div className="flex items-center gap-2 mb-2">
        {style.icon}
        <span className={`font-bold ${style.text}`}>{title}</span>
      </div>
      <div className="text-slate-700 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

// Challenge Component with Hints
const ChallengeCard = ({ title, hints, solution, children }: { title: string, hints: string[], solution: string, children: React.ReactNode }) => {
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className="bg-white border-2 border-slate-100 rounded-2xl p-6 my-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#E3000B]/10 rounded-lg">
          <Target className="text-[#E3000B] w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>
      
      <div className="mb-6">
        {children}
      </div>

      <div className="space-y-3">
        {hints.map((hint, i) => (
          <div key={i} className={`transition-all duration-500 overflow-hidden ${i < revealedHints ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-amber-50 text-amber-800 p-3 rounded-xl text-sm border border-amber-100 flex gap-2">
              <Lightbulb size={16} className="shrink-0 mt-0.5" />
              {hint}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {revealedHints < hints.length && (
          <button 
            onClick={() => setRevealedHints(h => h + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-bold hover:bg-amber-200 transition-colors"
          >
            <Eye size={16} />
            Indice {revealedHints + 1}
          </button>
        )}
        
        {revealedHints >= hints.length && (
          <button 
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 px-4 py-2 bg-[#309030] text-white rounded-full font-bold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSolution ? 'Cacher la solution' : 'Voir la solution'}
          </button>
        )}
      </div>

      {showSolution && (
        <div className="mt-4 animate-in">
          <CodeBlock code={solution} />
        </div>
      )}
    </div>
  );
};

// Quiz Component
const QuizComponent = ({ quizzes }: { quizzes: Quiz[] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [currentQuestion, showResult]);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === quizzes[currentQuestion].correct;
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQuestion < quizzes.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  if (showResult) {
    return (
      <div ref={containerRef} className="bg-white border-2 border-[#0090F5] rounded-2xl p-8 text-center shadow-xl">
        <Trophy className="w-16 h-16 text-[#F5DF4D] mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Terminé !</h3>
        <p className="text-lg text-slate-600 mb-6">Tu as eu {score} sur {quizzes.length} bonnes réponses !</p>
        <div className="w-full bg-slate-100 rounded-full h-4 mb-6 overflow-hidden">
          <div 
            className="bg-[#309030] h-full transition-all duration-1000"
            style={{ width: `${(score / quizzes.length) * 100}%` }}
          ></div>
        </div>
        <button 
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setSelectedOption(null);
          }}
          className="px-6 py-3 bg-[#0090F5] text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
        >
          Recommencer
        </button>
      </div>
    );
  }

  const quiz = quizzes[currentQuestion];

  return (
    <div ref={containerRef} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-[#0090F5] bg-blue-50 px-3 py-1 rounded-full">
          Question {currentQuestion + 1}/{quizzes.length}
        </span>
        <span className="text-xs font-bold text-[#309030]">Score: {score}</span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-6">{quiz.question}</h3>
      
      <div className="space-y-3">
        {quiz.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={selectedOption !== null}
            className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 transform hover:scale-[1.02] ${
              selectedOption === i 
                ? i === quiz.correct 
                  ? 'bg-green-100 border-2 border-green-500 text-green-800' 
                  : 'bg-red-100 border-2 border-red-500 text-red-800'
                : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
            }`}
          >
            <div className="flex justify-between items-center">
              {option}
              {selectedOption === i && (
                i === quiz.correct ? <Check className="text-green-600" /> : <X className="text-red-600" />
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedOption !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl animate-in text-sm text-blue-800 border border-blue-100">
          <div className="flex gap-2">
            <Info size={16} className="shrink-0 mt-0.5" />
            <p>{quiz.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Angle Animation Component
const AngleAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const arcRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { angle: 0 };
      
      gsap.to(obj, {
        angle: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
          const angle = obj.angle;
          const angleRad = (angle - 90) * (Math.PI / 180);
          const cx = 100;
          const cy = 100;
          const r = 80;
          
          const x = cx + r * Math.cos(angleRad);
          const y = cy + r * Math.sin(angleRad);
          
          if (dotRef.current) {
            dotRef.current.setAttribute("cx", x.toString());
            dotRef.current.setAttribute("cy", y.toString());
          }
          if (lineRef.current) {
            lineRef.current.setAttribute("x2", x.toString());
            lineRef.current.setAttribute("y2", y.toString());
          }
          if (textRef.current) {
            textRef.current.textContent = `${Math.round(angle)}°`;
          }
          
          if (arcRef.current) {
            if (angle <= 0) {
                arcRef.current.setAttribute("d", "");
            } else if (angle >= 360) {
                // Full circle
                arcRef.current.setAttribute("d", `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`);
            } else {
                const largeArcFlag = angle > 180 ? 1 : 0;
                const d = [
                    "M", cx, cy,
                    "L", cx, cy - r,
                    "A", r, r, 0, largeArcFlag, 1, x, y,
                    "Z"
                ].join(" ");
                arcRef.current.setAttribute("d", d);
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center py-8">
        <svg viewBox="0 0 200 200" className="w-64 h-64 overflow-visible" aria-label="Animation montrant 360 degrés">
            {/* Background Circle */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="#E2E8F0" strokeWidth="2" />
            
            {/* Animated Sector */}
            <path ref={arcRef} fill="#0090F5" fillOpacity="0.1" stroke="none" />
            
            {/* Radius Line */}
            <line ref={lineRef} x1="100" y1="100" x2="100" y2="20" stroke="#0090F5" strokeWidth="2" />
            
            {/* Center Dot */}
            <circle cx="100" cy="100" r="4" fill="#64748B" />
            
            {/* Rotating Dot */}
            <circle ref={dotRef} cx="100" cy="20" r="8" fill="#0090F5" stroke="white" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
            
            {/* Center Angle Text */}
            <text ref={textRef} x="100" y="100" dy="50" textAnchor="middle" className="text-3xl font-mono font-bold fill-[#0090F5]" style={{ fontSize: '24px', fontWeight: 'bold' }}>0°</text>
            
            {/* Labels */}
            <text x="100" y="10" textAnchor="middle" className="text-xs fill-slate-400 font-bold" style={{ fontSize: '10px' }}>0° / 360°</text>
            <text x="200" y="105" textAnchor="middle" className="text-xs fill-slate-400 font-bold" style={{ fontSize: '10px' }}>90°</text>
            <text x="100" y="200" textAnchor="middle" className="text-xs fill-slate-400 font-bold" style={{ fontSize: '10px' }}>180°</text>
            <text x="0" y="105" textAnchor="middle" className="text-xs fill-slate-400 font-bold" style={{ fontSize: '10px' }}>270°</text>
        </svg>
    </div>
  );
};

// ============== DATA ==============

const part1Quizzes: Quiz[] = [
  {
    question: "Que fait moteur.run_time(300, 2000) ?",
    options: ["Tourne à vitesse 300 pendant 2 sec", "Tourne à vitesse 2000 pendant 0.3 sec", "Fait 300 tours", "Fait une pause"],
    correct: 0,
    explanation: "300 est la vitesse, et 2000 est le temps en millisecondes (2 secondes)."
  },
  {
    question: "Comment faire tourner le moteur en arrière ?",
    options: ["Utiliser un nombre négatif (-300)", "Écrire 'back'", "Tourner le moteur à la main", "Ce n'est pas possible"],
    correct: 0,
    explanation: "Le signe moins (-) inverse le sens de rotation."
  },
  {
    question: "Combien de degrés y a-t-il dans 2 tours complets ?",
    options: ["360", "720", "180", "100"],
    correct: 1,
    explanation: "1 tour = 360°. Donc 2 tours = 360 x 2 = 720°."
  },
  {
    question: "À quoi sert wait(1000) ?",
    options: ["À arrêter le programme", "À faire une pause de 1 seconde", "À accélérer", "À attendre un bouton"],
    correct: 1,
    explanation: "wait(1000) met le programme en pause pendant 1000 millisecondes (1 seconde)."
  },
  {
    question: "Quelle commande est la plus précise pour faire exactement 1 tour ?",
    options: ["run_time(300, 1000)", "run_angle(300, 360)", "run_forever()", "stop()"],
    correct: 1,
    explanation: "run_angle utilise les degrés, ce qui est exact. run_time dépend de la batterie."
  }
];

const part2Quizzes: Quiz[] = [
  {
    question: "Pour avancer tout droit, les deux moteurs doivent...",
    options: ["Tourner dans le même sens", "Tourner en sens inverse", "Un seul moteur tourne", "Ne pas bouger"],
    correct: 0,
    explanation: "Ils doivent tourner ensemble à la même vitesse pour aller droit."
  },
  {
    question: "Pour tourner à droite...",
    options: ["Moteur gauche tourne, droit stop", "Moteur droit tourne, gauche stop", "Les deux reculent", "Les deux avancent"],
    correct: 0,
    explanation: "Si le moteur gauche avance et le droit s'arrête, le robot pivote vers la droite."
  },
  {
    question: "Que fait le robot si : gauche avance, droit recule ?",
    options: ["Il avance", "Il recule", "Il pivote sur place (toupie)", "Il ne bouge pas"],
    correct: 2,
    explanation: "C'est un pivot sur place ! Très utile pour tourner vite."
  },
  {
    question: "Pourquoi on utilise Direction.COUNTERCLOCKWISE ?",
    options: ["Pour le style", "Car le moteur est monté à l'envers", "Pour aller plus vite", "C'est une erreur"],
    correct: 1,
    explanation: "Les moteurs sont face à face, donc l'un d'eux doit être inversé logiciellement."
  },
  {
    question: "Combien de virages pour faire un carré ?",
    options: ["2", "3", "4", "8"],
    correct: 2,
    explanation: "Un carré a 4 coins, donc 4 virages de 90°."
  }
];

export default function App() {
  const [currentPart, setCurrentPart] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const mainRef = useRef(null);
  const contentRef = useRef(null);
  const progressRef = useRef(null);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('spikeProgress');
    if (saved) setCompletedSteps(JSON.parse(saved));
  }, []);

  // GSAP Animations for Home
  useEffect(() => {
    if (currentPart === null) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.fromTo("header", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
          .fromTo(".hero-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }, "-=0.4")
          .fromTo(".lesson-card", 
            { scale: 0.8, opacity: 0, y: 50 }, 
            { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }, 
            "-=0.4"
          );

        // Connector line: Draw effect
        tl.fromTo(".connector-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.inOut" },
          "-=0.6"
        );

        // Reference card scroll trigger
        gsap.fromTo(".reference-card",
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: ".reference-card",
              start: "top 80%",
            }
          }
        );

        // Hover effects
        const cards = document.querySelectorAll('.lesson-card');
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.02, y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", duration: 0.3 }));
          card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", duration: 0.3 }));
        });

      }, mainRef);
      return () => ctx.revert();
    }
  }, [currentPart]);

  // GSAP Animations for Content
  useEffect(() => {
    if (currentPart !== null) {
      const ctx = gsap.context(() => {
        gsap.fromTo(contentRef.current, 
          { opacity: 0, x: 20 }, 
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
        
        gsap.fromTo(".animate-in", 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.1 }
        );

        gsap.fromTo(".progress-dot",
          { scale: 0 },
          { scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)" }
        );

      }, contentRef);
      return () => ctx.revert();
    }
  }, [currentStep, currentPart]);

  const markComplete = () => {
    if (!completedSteps.includes(currentStep + (currentPart === 2 ? 100 : 0))) {
      const newCompleted = [...completedSteps, currentStep + (currentPart === 2 ? 100 : 0)];
      setCompletedSteps(newCompleted);
      localStorage.setItem('spikeProgress', JSON.stringify(newCompleted));
      
      // Animation success
      gsap.to(".mark-complete-btn", { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };

  const part1Steps: Step[] = [
    {
      id: 0,
      title: "Matériel nécessaire",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center animate-in">
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <Check className="text-green-500 w-8 h-8" />
              <span className="text-lg font-medium text-slate-700">Hub SPIKE Prime</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <Check className="text-green-500 w-8 h-8" />
              <span className="text-lg font-medium text-slate-700">1 Moteur (Port A)</span>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <Check className="text-green-500 w-8 h-8" />
              <span className="text-lg font-medium text-slate-700">Câble USB ou Bluetooth</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
             <SpikeHubImage />
             <MotorImage />
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Le code de départ",
      content: (
        <div className="space-y-4 animate-in">
          <p className="text-lg text-slate-700">Copie ce code pour commencer. C'est la base de tout programme robot !</p>
          <CodeBlock code={`from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port
from pybricks.tools import wait

# Initialisation
hub = PrimeHub()
moteur = Motor(Port.A)

# Écris ton code ici 👇`} />
          <SideNote type="info" title="Astuce">
            Tu n'as besoin de copier ce code qu'une seule fois au tout début de ton fichier.
          </SideNote>
        </div>
      )
    },
    {
      id: 2,
      title: "Fais tourner le moteur !",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-slate-700 animate-in">
            Voici ta première commande magique ✨
          </p>
          <div className="animate-in">
            <CodeBlock code="moteur.run_time(300, 2000)" showLineNumbers={false} />
          </div>
          <div className="grid grid-cols-2 gap-4 animate-in">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <span className="block text-2xl font-bold text-[#0090F5] mb-1">300</span>
              <span className="text-sm text-slate-600">Vitesse</span>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <span className="block text-2xl font-bold text-[#9B30FF] mb-1">2000</span>
              <span className="text-sm text-slate-600">Temps (ms)</span>
            </div>
          </div>
          <p className="text-center font-medium text-slate-500 animate-in">Le moteur tourne pendant 2 secondes ! 🎉</p>
        </div>
      )
    },
    {
      id: 3,
      title: "Change la vitesse",
      content: (
        <div className="space-y-6 animate-in">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <TurtleIcon />
              </div>
              <h3 className="font-bold text-slate-700 mb-1">Lent 🐌</h3>
              <CodeBlock code="moteur.run_time(100, 2000)" showLineNumbers={false} compact={true} className="my-2 text-[10px] sm:text-xs" />
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center hover:scale-105 transition-transform duration-300">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CarIcon />
              </div>
              <h3 className="font-bold text-slate-700 mb-1">Moyen 🚗</h3>
              <CodeBlock code="moteur.run_time(300, 2000)" showLineNumbers={false} compact={true} className="my-2 text-[10px] sm:text-xs" />
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center hover:scale-105 transition-transform duration-300">
              <div className="bg-rose-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <RocketIcon />
              </div>
              <h3 className="font-bold text-slate-700 mb-1">Rapide 🚀</h3>
              <CodeBlock code="moteur.run_time(800, 2000)" showLineNumbers={false} compact={true} className="my-2 text-[10px] sm:text-xs" />
            </div>
          </div>
          <p className="text-center text-slate-600">Essaye de changer le premier nombre !</p>
        </div>
      )
    },
    {
      id: 4,
      title: "Marche arrière !",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-amber-50 p-6 rounded-2xl border border-amber-100 animate-in">
            <RotateCcw className="text-amber-500 w-12 h-12 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">Le secret du signe moins (-)</h3>
              <p className="text-amber-900">Pour tourner dans l'autre sens, ajoute simplement un petit tiret devant la vitesse !</p>
            </div>
          </div>
          <div className="animate-in">
            <CodeBlock code="moteur.run_time(-300, 2000)" />
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Fais une pause !",
      content: (
        <div className="space-y-6 animate-in">
          <p className="text-lg text-slate-700">Parfois le robot doit se reposer. Utilise <span className="font-mono text-[#309030] font-bold">wait()</span>.</p>
          <CodeBlock code={`moteur.run_time(300, 1000)
wait(1000)  # Pause de 1 seconde
moteur.run_time(-300, 1000)`} />
          
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Play className="text-blue-500 fill-current" />
              </div>
              <span className="text-sm font-bold text-slate-600">Avant</span>
            </div>
            <div className="flex items-center">
              <div className="h-1 w-16 bg-slate-200"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <Clock className="text-amber-500" />
              </div>
              <span className="text-sm font-bold text-slate-600">Pause</span>
            </div>
            <div className="flex items-center">
              <div className="h-1 w-16 bg-slate-200"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-2">
                <RotateCcw className="text-rose-500" />
              </div>
              <span className="text-sm font-bold text-slate-600">Arrière</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "À toi de jouer ! 🎮",
      content: (
        <ChallengeCard 
          title="Mission 1 : L'aller-retour" 
          hints={[
            "Utilise run_time avec une vitesse positive",
            "N'oublie pas le wait(1000) au milieu",
            "Utilise run_time avec une vitesse négative"
          ]}
          solution={`moteur.run_time(500, 2000)
wait(1000)
moteur.run_time(-500, 2000)`}
        >
          <p className="text-slate-700">
            Crée un programme où le moteur :
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Tourne vite en avant (2 sec)</li>
              <li>Fait une pause (1 sec)</li>
              <li>Revient doucement en arrière (2 sec)</li>
            </ul>
          </p>
        </ChallengeCard>
      )
    },
    {
      id: 7,
      title: "Un cercle = 360°",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-slate-700 animate-in">
            Imagine un cercle divisé en degrés :
          </p>
          <div className="animate-in">
             <AngleAnimation />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-[#0090F5]/20 text-center animate-in">
            <p className="text-2xl font-bold text-[#0090F5]">
              Un tour complet = 360 degrés
            </p>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Nouvelle commande : run_angle",
      content: (
        <div className="space-y-6 animate-in">
          <p className="text-lg text-slate-700">
            Au lieu du temps, on peut dire au moteur de tourner d'un certain <strong>angle</strong>. C'est beaucoup plus précis !
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-rose-500" />
                <h3 className="font-bold text-slate-800">Avec le temps ⏱️</h3>
              </div>
              <CodeBlock code="moteur.run_time(300, 2000)" showLineNumbers={false} />
              <p className="text-sm text-slate-500 mt-2">On ne sait pas exactement où il s'arrête.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#309030] shadow-md ring-4 ring-green-50">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="text-[#309030]" />
                <h3 className="font-bold text-slate-800">Avec l'angle 🎯</h3>
              </div>
              <CodeBlock code="moteur.run_angle(300, 360)" showLineNumbers={false} />
              <p className="text-sm text-slate-500 mt-2">Il fait EXACTEMENT 1 tour !</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Exemples d'angles",
      content: (
        <div className="space-y-6 animate-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">90°</div>
              <div className="text-sm text-slate-500">Quart de tour</div>
              <CodeBlock code="moteur.run_angle(300, 90)" showLineNumbers={false} />
            </div>
            <div className="bg-slate-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">180°</div>
              <div className="text-sm text-slate-500">Demi-tour</div>
              <CodeBlock code="moteur.run_angle(300, 180)" showLineNumbers={false} />
            </div>
            <div className="bg-slate-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">360°</div>
              <div className="text-sm text-slate-500">1 tour complet</div>
              <CodeBlock code="moteur.run_angle(300, 360)" showLineNumbers={false} />
            </div>
            <div className="bg-slate-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">720°</div>
              <div className="text-sm text-slate-500">2 tours !</div>
              <CodeBlock code="moteur.run_angle(300, 720)" showLineNumbers={false} />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Mission 2 : Le tourbillon",
      content: (
        <ChallengeCard 
          title="Fais tourner le moteur 3 fois !" 
          hints={[
            "1 tour = 360 degrés",
            "3 tours = 360 x 3",
            "Calcule 360 + 360 + 360"
          ]}
          solution="moteur.run_angle(800, 1080)"
        >
          <p className="text-slate-700">
            Ton défi : Fais faire exactement <strong>3 tours complets</strong> à ton moteur le plus vite possible !
          </p>
        </ChallengeCard>
      )
    },
    {
      id: 11,
      title: "Aide-mémoire Partie 1",
      content: (
        <div className="space-y-6 animate-in">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 border-b border-slate-200 text-slate-700">Commande</th>
                  <th className="p-4 border-b border-slate-200 text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-blue-50/50">
                  <td className="p-4 font-mono text-[#0090F5] text-sm">moteur.run_time(300, 1000)</td>
                  <td className="p-4 text-slate-600">Tourne pendant un temps donné</td>
                </tr>
                <tr className="hover:bg-blue-50/50">
                  <td className="p-4 font-mono text-[#0090F5] text-sm">moteur.run_angle(300, 360)</td>
                  <td className="p-4 text-slate-600">Tourne d'un angle précis</td>
                </tr>
                <tr className="hover:bg-blue-50/50">
                  <td className="p-4 font-mono text-[#0090F5] text-sm">wait(1000)</td>
                  <td className="p-4 text-slate-600">Pause (en millisecondes)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 12,
      title: "Quiz Partie 1",
      content: <QuizComponent quizzes={part1Quizzes} />
    }
  ];

  const part2Steps: Step[] = [
    {
      id: 0,
      title: "Ton robot à 2 roues",
      content: (
        <div className="space-y-6 animate-in">
          <p className="text-lg text-slate-700">Maintenant on passe aux choses sérieuses ! Un robot avec 2 moteurs.</p>
          <div className="flex justify-center animate-in">
            <RobotBaseImage />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span className="font-bold text-[#0090F5]">Port A</span>
              <p className="text-sm text-slate-600">Roue Gauche</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <span className="font-bold text-[#0090F5]">Port B</span>
              <p className="text-sm text-slate-600">Roue Droite</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Code de départ Robot",
      content: (
        <div className="space-y-4 animate-in">
          <p className="text-slate-700">Copie ce nouveau code de base pour 2 moteurs.</p>
          <CodeBlock code={`from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction
from pybricks.tools import wait

hub = PrimeHub()

# Roue Gauche (Port A)
moteur_gauche = Motor(Port.A)

# Roue Droite (Port B) - Inversée !
moteur_droit = Motor(Port.B, direction=Direction.COUNTERCLOCKWISE)

# Ton code ici 👇`} />
          <SideNote type="warning" title="Attention !">
            On inverse le moteur droit (<span className="font-mono">COUNTERCLOCKWISE</span>) car il est monté face à l'autre. Comme ça, les deux avancent dans le même sens !
          </SideNote>
        </div>
      )
    },
    {
      id: 2,
      title: "Avancer ⬆️",
      content: (
        <div className="space-y-6 animate-in">
          <div className="flex items-center gap-4 bg-green-50 p-6 rounded-2xl border border-green-100">
            <ArrowUp className="text-green-600 w-10 h-10 shrink-0" />
            <p className="text-lg text-green-900 font-medium">Pour avancer droit, fais tourner les 2 moteurs en même temps !</p>
          </div>
          <CodeBlock code={`moteur_gauche.run_angle(300, 360)
moteur_droit.run_angle(300, 360)`} />
          <p className="text-slate-600 text-center italic">Les deux font 1 tour complet vers l'avant.</p>
        </div>
      )
    },
    {
      id: 3,
      title: "Reculer ⬇️",
      content: (
        <div className="space-y-6 animate-in">
          <div className="flex items-center gap-4 bg-rose-50 p-6 rounded-2xl border border-rose-100">
            <ArrowDown className="text-rose-600 w-10 h-10 shrink-0" />
            <p className="text-lg text-rose-900 font-medium">Pour reculer, utilise le signe moins (-)</p>
          </div>
          <CodeBlock code={`moteur_gauche.run_angle(300, -360)
moteur_droit.run_angle(300, -360)`} />
        </div>
      )
    },
    {
      id: 4,
      title: "Tourner à droite ➡️",
      content: (
        <div className="space-y-6 animate-in">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Lightbulb className="text-amber-500" />
              La technique du virage
            </h3>
            <p className="text-slate-700 mb-4">
              Pour tourner à droite, la roue <strong>gauche</strong> doit avancer, et la roue <strong>droite</strong> doit s'arrêter (ou reculer).
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                <span className="block font-bold text-green-700">Gauche</span>
                <ArrowUp className="mx-auto mt-1 text-green-600" />
                <span className="text-xs text-green-600">Avance</span>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="block font-bold text-slate-700">Droite</span>
                <div className="w-4 h-4 bg-slate-300 rounded-full mx-auto mt-2"></div>
                <span className="text-xs text-slate-500">Stop</span>
              </div>
            </div>
          </div>
          <CodeBlock code={`moteur_gauche.run_angle(300, 180)
moteur_droit.run_angle(300, 0)`} />
        </div>
      )
    },
    {
      id: 5,
      title: "Tourner à gauche ⬅️",
      content: (
        <div className="space-y-6 animate-in">
          <p className="text-lg text-slate-700">C'est l'inverse ! La roue droite avance, la gauche attend.</p>
          <CodeBlock code={`moteur_gauche.run_angle(300, 0)
moteur_droit.run_angle(300, 180)`} />
        </div>
      )
    },
    {
      id: 6,
      title: "Pivoter sur place 🔄",
      content: (
        <div className="space-y-6 animate-in">
          <p className="text-lg text-slate-700">
            Pour tourner super vite comme une toupie, fais tourner une roue en avant et l'autre en arrière !
          </p>
          <div className="flex justify-center gap-8 text-center my-4">
            <div>
              <ArrowUp className="w-8 h-8 text-green-500 mx-auto" />
              <span className="font-bold text-slate-700">Gauche +</span>
            </div>
            <div>
              <ArrowDown className="w-8 h-8 text-rose-500 mx-auto" />
              <span className="font-bold text-slate-700">Droite -</span>
            </div>
          </div>
          <CodeBlock code={`moteur_gauche.run_angle(300, 180)
moteur_droit.run_angle(300, -180)`} />
        </div>
      )
    },
    {
      id: 7,
      title: "Mission 3 : Le Carré ⬜",
      content: (
        <ChallengeCard
          title="Fais faire un carré au robot"
          hints={[
            "Un carré a 4 côtés égaux",
            "Il faut avancer, puis tourner, 4 fois",
            "Utilise copier-coller pour aller plus vite !"
          ]}
          solution={`# Côté 1
moteur_gauche.run_angle(300, 360)
moteur_droit.run_angle(300, 360)

# Virage 1
moteur_gauche.run_angle(300, 180)
moteur_droit.run_angle(300, -180)

# Répète ça 4 fois...`}
        >
          <p className="text-slate-700">
            Le robot doit parcourir les 4 côtés d'un carré et revenir à sa place de départ.
          </p>
        </ChallengeCard>
      )
    },
    {
      id: 8,
      title: "Mission 4 : Zig Zag ⚡",
      content: (
        <ChallengeCard
          title="Le parcours d'obstacles"
          hints={[
            "Tourne à droite",
            "Avance un peu",
            "Tourne à gauche",
            "Avance encore"
          ]}
          solution={`# Droite
moteur_gauche.run_angle(300, 180)
moteur_droit.run_angle(300, 0)

# Avance
moteur_gauche.run_angle(300, 360)
moteur_droit.run_angle(300, 360)

# Gauche
moteur_gauche.run_angle(300, 0)
moteur_droit.run_angle(300, 180)`}
        >
          <p className="text-slate-700">
            Fais avancer ton robot en zig-zag comme un serpent !
          </p>
        </ChallengeCard>
      )
    },
    {
      id: 9,
      title: "Mission 5 : Le Triangle 🔺",
      content: (
        <ChallengeCard
          title="Dessine un triangle"
          hints={[
            "Un triangle a 3 côtés",
            "Les virages sont plus grands que pour le carré (120°)",
            "Essaye de tourner plus longtemps"
          ]}
          solution={`# Répète 3 fois :
moteur_gauche.run_angle(300, 500)
moteur_droit.run_angle(300, 500)

# Grand virage
moteur_gauche.run_angle(300, 300)
moteur_droit.run_angle(300, -300)`}
        >
          <p className="text-slate-700">
            C'est plus dur que le carré ! Il faut trouver le bon angle de virage.
          </p>
        </ChallengeCard>
      )
    },
    {
      id: 10,
      title: "Défi Final : La Danse 💃",
      content: (
        <div className="space-y-6 animate-in">
          <p className="text-lg text-slate-700">
            Invente ta propre chorégraphie ! Mélange tout ce que tu as appris.
          </p>
          <ul className="grid gap-3 text-slate-700 bg-white p-6 rounded-2xl border border-slate-200">
            <li className="flex items-center gap-2">✅ Avancer / Reculer</li>
            <li className="flex items-center gap-2">✅ Tourner sur place</li>
            <li className="flex items-center gap-2">✅ Faire des pauses</li>
            <li className="flex items-center gap-2">✅ Changer de vitesse</li>
          </ul>
          <CodeBlock code={`# Exemple de danse
moteur_gauche.run_angle(800, 360)
moteur_droit.run_angle(800, -360)
wait(500)
moteur_gauche.run_angle(-800, 360)
moteur_droit.run_angle(-800, -360)`} />
        </div>
      )
    },
    {
      id: 11,
      title: "Bonus : La toupie 🌀",
      content: (
        <div className="text-center space-y-6 animate-in">
          <p className="text-lg text-slate-700">
            Un dernier pour la route... accroche-toi !
          </p>
          <CodeBlock code={`# Vitesse maximale !
moteur_gauche.run_angle(1000, 5000)
moteur_droit.run_angle(1000, -5000)`} />
          <div className="inline-block p-4 bg-slate-100 rounded-full animate-spin duration-[3s]">
            <RotateCcw size={48} className="text-[#0090F5]" />
          </div>
        </div>
      )
    },
    {
      id: 12,
      title: "Quiz Partie 2",
      content: <QuizComponent quizzes={part2Quizzes} />
    }
  ];

  const currentSteps = currentPart === 1 ? part1Steps : part2Steps;
  const currentStepData = currentSteps[currentStep];

  if (currentPart === null) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-[#0090F5] selection:text-white" ref={mainRef}>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#E3000B] p-2 rounded-lg">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">LEGO SPIKE <span className="text-[#0090F5]">Python</span></span>
            </div>
            <div className="flex gap-2">
              <div className="bg-blue-100 px-4 py-1.5 rounded-full font-bold text-[#0090F5] text-sm">
                v3.0
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-16 space-y-4">
            <h1 className="hero-text text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Apprends à coder ton <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0090F5] to-[#006CB7]">Robot LEGO</span>
            </h1>
            <p className="hero-text text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Une aventure interactive pour maîtriser Python avec SPIKE Prime.
              Pas de capteurs, juste du code et du fun ! 🚀
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-slate-200 -translate-y-1/2 z-0">
              <div className="connector-line h-full bg-[#0090F5] origin-left"></div>
            </div>

            {/* Part 1 Card */}
            <div 
              onClick={() => { setCurrentPart(1); setCurrentStep(0); }}
              className="lesson-card bg-white rounded-3xl p-8 shadow-sm border-2 border-slate-100 cursor-pointer relative z-10 group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cog size={120} className="text-[#F5DF4D]" />
              </div>
              <div className="w-16 h-16 bg-[#F5DF4D] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Cog className="text-amber-900 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Partie 1 : Le Moteur</h2>
              <p className="text-slate-600 mb-6">Apprends à contrôler un seul moteur : vitesse, temps, et angles précis.</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  12 Étapes
                </span>
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#F5DF4D] transition-colors">
                  <ChevronRight className="text-slate-400 group-hover:text-amber-900" />
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-100">
                <div 
                  className="h-full bg-[#F5DF4D] transition-all duration-1000"
                  style={{ width: `${(completedSteps.filter(s => s < 100).length / 12) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Part 2 Card */}
            <div 
              onClick={() => { setCurrentPart(2); setCurrentStep(0); }}
              className="lesson-card bg-white rounded-3xl p-8 shadow-sm border-2 border-slate-100 cursor-pointer relative z-10 group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu size={120} className="text-[#0090F5]" />
              </div>
              <div className="w-16 h-16 bg-[#0090F5] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Cpu className="text-white w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Partie 2 : Le Robot</h2>
              <p className="text-slate-600 mb-6">Contrôle les 2 moteurs ensemble pour créer un robot qui se déplace !</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  13 Étapes
                </span>
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#0090F5] transition-colors">
                  <ChevronRight className="text-slate-400 group-hover:text-white" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-100">
                <div 
                  className="h-full bg-[#0090F5] transition-all duration-1000"
                  style={{ width: `${(completedSteps.filter(s => s >= 100).length / 13) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Reference Card */}
          <div className="reference-card mt-16 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0090F5] rounded-full filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Lightbulb className="text-[#F5DF4D]" />
                Le savais-tu ?
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#F5DF4D] mb-2 font-mono">300</div>
                  <p className="text-slate-400 text-sm">Vitesse idéale pour commencer</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0090F5] mb-2 font-mono">1000</div>
                  <p className="text-slate-400 text-sm">1 seconde en millisecondes</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#309030] mb-2 font-mono">360</div>
                  <p className="text-slate-400 text-sm">Degrés dans un tour complet</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPart(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-[#0090F5] transition-colors font-bold rounded-full hover:bg-slate-50 px-4 py-2"
          >
            <Home size={20} />
            <span className="hidden sm:inline">Accueil</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold text-slate-500">
              {Math.round((completedSteps.length / (12 + 13)) * 100)}% Complété
            </div>
            <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#309030] transition-all duration-500"
                style={{ width: `${(completedSteps.length / (12 + 13)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8" ref={contentRef}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${currentPart === 1 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
              PARTIE {currentPart}
            </span>
            <span className="text-xs font-bold text-slate-400">
              ÉTAPE {currentStep + 1}/{currentSteps.length}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            {currentStepData.title}
          </h1>
          <div className="h-1.5 w-20 bg-[#0090F5] rounded-full origin-left transform scale-x-100 transition-transform duration-500"></div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 min-h-[400px]">
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white p-4 rounded-full shadow-lg border border-slate-100 sticky bottom-6 mx-auto max-w-xl backdrop-blur-md bg-white/90">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`p-3 rounded-full transition-all ${
              currentStep === 0 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-slate-700 hover:bg-slate-100 hover:text-[#0090F5]'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={markComplete}
            className={`mark-complete-btn flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all transform active:scale-95 ${
              completedSteps.includes(currentStep + (currentPart === 2 ? 100 : 0))
                ? 'bg-green-100 text-green-700'
                : 'bg-[#0090F5] text-white hover:bg-blue-600 shadow-md hover:shadow-blue-200'
            }`}
          >
            {completedSteps.includes(currentStep + (currentPart === 2 ? 100 : 0)) ? (
              <>
                <Check size={20} />
                Compris !
              </>
            ) : (
              "J'ai compris"
            )}
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(currentSteps.length - 1, currentStep + 1))}
            disabled={currentStep === currentSteps.length - 1}
            className={`p-3 rounded-full transition-all ${
              currentStep === currentSteps.length - 1
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100 hover:text-[#0090F5]'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap" ref={progressRef}>
          {currentSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`progress-dot w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentStep 
                  ? 'bg-[#0090F5] scale-125' 
                  : completedSteps.includes(i + (currentPart === 2 ? 100 : 0))
                    ? 'bg-[#309030]'
                    : 'bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

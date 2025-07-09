import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  FileQuestion, 
  LineChart, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  Clock, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Code, 
  BookOpen,
  type LucideIcon
} from 'lucide-react';

interface AnimatedStats {
  users: number;
  problems: number;
  accuracy: number;
}

interface DemoContent {
  title: string;
  items: string[];
}

interface Demo {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
  color: string;
  features: string[];
  stats: string;
  demoContent: DemoContent;
}

interface DemoData {
  [key: string]: Demo;
}

type DemoType = 'mapping' | 'quiz' | 'analytics';

const PolishedDemoComponent: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoType>('mapping');
  const [animatedStats, setAnimatedStats] = useState<AnimatedStats>({ 
    users: 0, 
    problems: 0, 
    accuracy: 0 
  });

  // Animate stats on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        users: prev.users < 15420 ? prev.users + 123 : 15420,
        problems: prev.problems < 2840 ? prev.problems + 47 : 2840,
        accuracy: prev.accuracy < 94 ? prev.accuracy + 1 : 94
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, []);

  const demos: DemoData = {
    mapping: {
      icon: Brain,
      title: 'Prerequisite Mapping',
      description: 'Visualize how DSA topics connect and explore the foundational concepts required before tackling complex problems.',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
      color: 'blue',
      features: [
        'Interactive dependency graphs',
        'Topic difficulty progression',
        'Prerequisite validation',
        'Learning path optimization'
      ],
      stats: '2,840+ topic connections mapped',
      demoContent: {
        title: 'Smart Learning Paths',
        items: [
          'Arrays → Linked Lists → Stacks → Queues',
          'Sorting → Binary Search → Trees → Graphs',
          'Recursion → Dynamic Programming → Advanced Algorithms'
        ]
      }
    },
    quiz: {
      icon: FileQuestion,
      title: 'AI Quiz Generator',
      description: 'See how our platform generates personalized quizzes based on your uploaded content or selected topic.',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      color: 'green',
      features: [
        'Adaptive difficulty levels',
        'Multiple question types',
        'Instant explanations',
        'Progress tracking'
      ],
      stats: '50K+ quizzes generated daily',
      demoContent: {
        title: 'Question Types',
        items: [
          'Multiple Choice: Algorithm complexity analysis',
          'Code Completion: Fill missing implementations',
          'Problem Solving: Debug and optimize solutions'
        ]
      }
    },
    analytics: {
      icon: LineChart,
      title: 'Learning Insights',
      description: 'Explore real-time analytics showing your progress, topic mastery, and performance trends.',
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      color: 'purple',
      features: [
        'Performance analytics',
        'Weakness identification',
        'Study recommendations',
        'Progress visualization'
      ],
      stats: '94% average improvement rate',
      demoContent: {
        title: 'Key Metrics',
        items: [
          'Problem-solving speed: 40% faster',
          'Code quality score: 85/100',
          'Concept mastery: 78% completion'
        ]
      }
    }
  };

  const currentDemo: Demo = demos[activeDemo];
  const IconComponent: LucideIcon = currentDemo.icon;

  const getProgressWidth = (demoType: DemoType): string => {
    switch (demoType) {
      case 'mapping': return '75%';
      case 'quiz': return '85%';
      case 'analytics': return '92%';
      default: return '0%';
    }
  };

  const getProgressPercentage = (demoType: DemoType): string => {
    switch (demoType) {
      case 'mapping': return '75%';
      case 'quiz': return '85%';
      case 'analytics': return '92%';
      default: return '0%';
    }
  };

  return (
    <section 
      id="demo" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Try It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Yourself</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Interact with core features like dependency mapping, quiz generation, and learning insights.
          </p>
        </div>

        {/* Main Demo Container */}
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
          
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {Object.entries(demos).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setActiveDemo(key as DemoType)}
                  className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeDemo === key
                      ? `bg-gradient-to-r ${demo.gradient} text-white shadow-xl shadow-${demo.color}-500/25`
                      : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <demo.icon className={`w-5 h-5 ${activeDemo === key ? 'text-white' : 'text-gray-500'}`} />
                    <span>{demo.title}</span>
                  </div>
                  {activeDemo === key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Demo Content */}
            <div className={`min-h-[500px] bg-gradient-to-br ${currentDemo.bgGradient} rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-500`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* Left Column - Main Content */}
                <div className="flex flex-col justify-center">
                  {/* Animated Icon */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${currentDemo.gradient} rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-3`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl w-20 h-20"></div>
                    
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {currentDemo.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {currentDemo.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Key Features:</h4>
                    {currentDemo.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50 mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      <TrendingUp className="w-4 h-4" />
                      {currentDemo.stats}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentDemo.gradient} text-white font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl w-fit`}>
                    <Play className="w-5 h-5" />
                    Try {currentDemo.title}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Right Column - Demo Preview */}
                <div className="flex flex-col justify-center">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {currentDemo.demoContent.title}
                      </h4>
                    </div>
                    
                    <div className="space-y-4">
                      {currentDemo.demoContent.items.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentDemo.gradient} mt-2 flex-shrink-0`}></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Demo Progress</span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {getProgressPercentage(activeDemo)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${currentDemo.gradient} transition-all duration-1000`}
                          style={{ width: getProgressWidth(activeDemo) }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-600/50">
                      <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Fast</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{"< 2s"}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-600/50">
                      <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Smart</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">AI-Powered</div>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200/50 dark:border-gray-600/50">
                      <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200">24/7</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolishedDemoComponent;
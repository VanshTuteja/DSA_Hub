import React from 'react';
import { Brain, Youtube, FileText, Image, CheckCircle, Loader, Play, RotateCcw } from 'lucide-react';

interface QuizGenerationLoaderProps {
  isVisible: boolean;
  contentType: 'youtube' | 'pdf' | 'image' | 'topic-quiz' | 'custom-quiz';
  fileName?: string;
  topicName?: string;
  action?: 'start' | 'continue' | 'retake';
  stage: 'analyzing' | 'extracting' | 'generating' | 'complete';
}

const QuizGenerationLoader: React.FC<QuizGenerationLoaderProps> = ({
  isVisible,
  contentType,
  fileName,
  topicName,
  action,
  stage
}) => {
  if (!isVisible) return null;

  const getContentIcon = () => {
    switch (contentType) {
      case 'youtube':
        return <Youtube className="w-12 h-12 text-red-500" />;
      case 'pdf':
        return <FileText className="w-12 h-12 text-red-500" />;
      case 'image':
        return <Image className="w-12 h-12 text-blue-500" />;
      case 'topic-quiz':
        return <Brain className="w-12 h-12 text-indigo-500" />;
      case 'custom-quiz':
        return <Brain className="w-12 h-12 text-purple-500" />;
      default:
        return <Brain className="w-12 h-12 text-gray-500" />;
    }
  };

  const getActionIcon = () => {
    switch (action) {
      case 'start':
        return <Play className="w-6 h-6 text-green-500" />;
      case 'continue':
        return <RotateCcw className="w-6 h-6 text-blue-500" />;
      case 'retake':
        return <RotateCcw className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    if (contentType === 'topic-quiz') {
      const actionText = action === 'start' ? 'Starting' : action === 'continue' ? 'Continuing' : 'Retaking';
      return `${actionText} ${topicName} Quiz`;
    }
    
    if (contentType === 'custom-quiz') {
      return `Starting Custom Quiz`;
    }

    return `Generating Quiz from ${contentType === 'youtube' ? 'YouTube Video' : contentType.toUpperCase()}`;
  };

  const getSubtitle = () => {
    if (contentType === 'topic-quiz') {
      return `Preparing ${topicName} assessment questions`;
    }
    
    if (contentType === 'custom-quiz') {
      return fileName ? `From: ${fileName}` : 'Custom content quiz';
    }

    return fileName ? `Processing: ${fileName}` : `Processing ${contentType} content`;
  };

  const stages = [
    {
      key: 'analyzing',
      label: contentType === 'topic-quiz' ? 'Preparing Questions' : 'Analyzing Content',
      description: contentType === 'topic-quiz' 
        ? 'Setting up quiz questions for your level'
        : 'AI is examining your content for key concepts'
    },
    {
      key: 'extracting',
      label: contentType === 'topic-quiz' ? 'Customizing Difficulty' : 'Extracting Key Concepts',
      description: contentType === 'topic-quiz'
        ? 'Adjusting questions based on your progress'
        : 'Identifying important topics and themes'
    },
    {
      key: 'generating',
      label: 'Generating Questions',
      description: contentType === 'topic-quiz'
        ? 'Finalizing your personalized quiz'
        : 'Creating contextual quiz questions with explanations'
    },
    {
      key: 'complete',
      label: 'Quiz Ready!',
      description: 'Your quiz is ready to begin'
    }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);
  const currentStage = stages[currentStageIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {getContentIcon()}
            {action && (
              <div className="ml-2">
                {getActionIcon()}
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getTitle()}
          </h2>
          <p className="text-gray-600">
            {getSubtitle()}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 mb-8">
          {stages.map((stageItem, index) => {
            const isActive = index === currentStageIndex;
            const isCompleted = index < currentStageIndex;
            const isUpcoming = index > currentStageIndex;

            return (
              <div key={stageItem.key} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isActive 
                      ? 'bg-indigo-500' 
                      : 'bg-gray-200'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : isActive ? (
                    <Loader className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    isActive ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {stageItem.label}
                  </h3>
                  <p className={`text-sm ${
                    isActive ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {stageItem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
          ></div>
        </div>

        {/* Current Stage Info */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Step {currentStageIndex + 1} of {stages.length}
          </p>
          {stage !== 'complete' && (
            <p className="text-xs text-gray-500 mt-1">
              This may take a few moments...
            </p>
          )}
        </div>

        {/* AI Processing Animation */}
        {stage !== 'complete' && (
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerationLoader;
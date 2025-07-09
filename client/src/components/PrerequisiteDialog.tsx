import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Brain, ExternalLink, BookOpen, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useUserTopicsStore } from "../store/useUserTopics";
import { toast } from "sonner";

interface Props {
  contentId: string;
  title: string;
}

export const PrerequisiteDialog: React.FC<Props> = ({ contentId, title }) => {
  const {
    generatePrerequisites,
    customContents,
    uploadProgress,
  } = useUserTopicsStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const content = customContents.find((c) => c.id === contentId);
  const progress = uploadProgress[contentId];

  const handleLoad = async () => {
    try {
      setLoading(true);
      await generatePrerequisites(contentId);
    } catch (err) {
      toast.error("Failed to generate prerequisites.");
    } finally {
      setLoading(false);
      setOpen(true); // open after successful fetch
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={handleLoad}
          className="group relative w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 dark:from-amber-400 dark:via-orange-400 dark:to-red-400 dark:hover:from-amber-500 dark:hover:via-orange-500 dark:hover:to-red-500 text-white dark:text-gray-900 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-lg flex items-center justify-center space-x-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Brain className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Get Prerequisites</span>
        </button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl">
        <DialogHeader className="pb-4 border-b border-gray-100 dark:border-gray-700">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span>Prerequisites for: {title}</span>
          </DialogTitle>
          <DialogDescription className="mt-2 text-gray-600 dark:text-gray-300">
            These are the recommended prerequisites and learning resources to help you succeed.
          </DialogDescription>
        </DialogHeader>

        {loading || progress?.stage === "generating" ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
              <Brain className="absolute inset-0 m-auto w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300 font-medium">
              {progress?.message || "Generating prerequisites..."}
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Prerequisites Section */}
            {content?.prerequisites?.length ? (
              <div className="overflow-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-3 h-3 text-white dark:text-gray-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    Prerequisites
                  </h3>
                </div>
                <div className="space-y-3">
                  {content.prerequisites.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  No specific prerequisites found
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  You can start learning right away!
                </p>
              </div>
            )}

            {/* Resources Section */}
            {content?.resources?.length ? (
              <div className="mb-15 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-white dark:text-gray-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                    Learning Resources
                  </h3>
                </div>
                <div className="space-y-3">
                  {content.resources.map(
                    (
                      res: { url: string; title: string; topic?: string },
                      idx: number
                    ) => (
                      <div
                        key={idx}
                        className="group p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-green-800 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all duration-200"
                      >
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start space-x-3 text-decoration-none"
                        >
                          <ExternalLink className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                          <div className="flex-1">
                            <p className="text-green-700 dark:text-green-300 font-medium group-hover:text-green-800 dark:group-hover:text-green-200 transition-colors duration-200">
                              {res.title}
                            </p>
                            {res.topic && (
                              <span className="inline-block mt-1 px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs rounded-full">
                                {res.topic}
                              </span>
                            )}
                          </div>
                        </a>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgb(243 244 246);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-track {
            background: rgb(55 65 81);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgb(156 163 175);
            border-radius: 3px;
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgb(107 114 128);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgb(107 114 128);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgb(156 163 175);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};
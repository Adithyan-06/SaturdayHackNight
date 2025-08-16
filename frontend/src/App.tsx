import { useState } from 'react';
import { Lightbulb, Clock, Globe, Zap, Code, Brain, Sparkles, ChevronRight, Star, Trophy, Clock as ClockIcon, Cpu ,  SquareCode, Bolt,Heart,Flame } from 'lucide-react';
import axios from 'axios';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FormData {
  context: string;
  time_limit: string;
  hackathon_level: string;
  difficulty_level: string;
  tech_stack: string;
  ai_ml_needed: boolean;
}

interface HackathonIdea {
  name: string;
  description: string;
  time_estimate: string;
  tech_stack: string;
  innovation_level?: string;
  potential_impact?: string;
  key_features?: string[];
}


const HACKATHON_LEVELS = [
  { value: 'international', label: 'International' },
  { value: 'national', label: 'National' },
  { value: 'regional', label: 'Regional' },
  { value: 'local', label: 'Local' },
  { value: 'university', label: 'University' }
];

const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

const TECH_STACKS = [
  { value: 'react-node', label: 'React + Node.js' },
  { value: 'vue-express', label: 'Vue.js + Express' },
  { value: 'angular-dotnet', label: 'Angular + .NET' },
  { value: 'python-flask', label: 'Python + Flask' },
  { value: 'python-django', label: 'Python + Django' },
  { value: 'react-native', label: 'React Native' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'svelte', label: 'Svelte/SvelteKit' },
  { value: 'fullstack-js', label: 'Full Stack JavaScript' }
];

function App() {
  const [formData, setFormData] = useState<FormData>({
    context: '',
    time_limit: '',
    hackathon_level: '',
    difficulty_level: '',
    tech_stack: '',
    ai_ml_needed: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<HackathonIdea[]>([]);
  const [expandedIdea, setExpandedIdea] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setIdeas([]);
    setExpandedIdea(null);
    try {
      const response = await axios.post('https://saturdayhacknight.onrender.com/generate-ideas', formData);
      
      if (!Array.isArray(response.data?.ideas)) {
        throw new Error("Unexpected response format from server");
      }

      const validatedIdeas = response.data.ideas.map((idea: any) => ({
        name: idea.name || `Hackathon Idea ${Math.floor(Math.random() * 1000)}`,
        description: idea.description || "No description provided",
        time_estimate: idea.time_estimate || "Time estimate not specified",
        tech_stack: idea.tech_stack || formData.tech_stack,
        innovation_level: idea.innovation_level || "Medium",
        potential_impact: idea.potential_impact || "Significant potential impact in target domain",
        key_features: idea.key_features || [
          "Innovative solution approach",
          "User-friendly interface",
          "Scalable architecture",
          "Real-world applicability"
        ]
      }));

      setIdeas(validatedIdeas);
    } catch (err) {
      console.error(err);
      alert(`Error generating ideas: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpandIdea = (index: number) => {
    setExpandedIdea(expandedIdea === index ? null : index);
  };

  const isFormValid = formData.context.trim() && formData.time_limit && 
                     formData.hackathon_level && formData.difficulty_level && 
                     formData.tech_stack;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-800 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-4">
            Hackathon Idea Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your concepts into winning hackathon projects with AI-powered suggestions
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-700 p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Context */}
            <div className="lg:col-span-2">
              <label className="flex items-center text-lg font-semibold text-gray-200 mb-4">
                <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
                Project Context & Ideas
              </label>
              <textarea
                value={formData.context}
                onChange={(e) => handleInputChange('context', e.target.value)}
                placeholder="Describe your project theme, target problem, or any specific requirements..."
                className="w-full h-40 p-4 border-2 border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none text-gray-100 placeholder-gray-500 bg-gray-900/50"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-400">Be as specific or general as you like</span>
                <span className="text-sm text-gray-500">{formData.context.length}/500</span>
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-200 mb-4">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Time Limit (hours)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="2"
                  readOnly
                  value={formData.time_limit}
                  onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 0);
                    handleInputChange('time_limit', String(value % 2 === 0 ? value : value - 1));
                  }}
                  className="w-full p-4 border-2 border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-100 bg-gray-900/50 appearance-none"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-blue-400 focus:outline-none"
                    onClick={() => handleInputChange('time_limit', String((parseInt(formData.time_limit) || 0) + 2))}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-blue-400 focus:outline-none"
                    onClick={() => handleInputChange('time_limit', String(Math.max(0, (parseInt(formData.time_limit) || 0) - 2)))}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hackathon Level */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-200 mb-4">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                Hackathon Level
              </label>
              <select
                value={formData.hackathon_level}
                onChange={(e) => handleInputChange('hackathon_level', e.target.value)}
                className="w-full p-4 border-2 border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-100 bg-gray-900/50"
              >
                <option value="" className="bg-gray-800">Select level</option>
                {HACKATHON_LEVELS.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-200 mb-4">
                <Zap className="w-5 h-5 mr-2 text-blue-400" />
                Project Difficulty 
              </label>
              <select
                value={formData.difficulty_level}
                onChange={(e) => handleInputChange('difficulty_level', e.target.value)}
                className="w-full p-4 border-2 border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-100 bg-gray-900/50"
              >
                <option value="" className="bg-gray-800">Select difficulty</option>
                {DIFFICULTY_LEVELS.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-200 mb-4">
                <Code className="w-5 h-5 mr-2 text-blue-400" /> Preferred Tech Stack
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.tech_stack}
                  onChange={(e) => handleInputChange('tech_stack', e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="w-full p-4 border-2 border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-100 bg-gray-900/50"
                  placeholder="Select or type tech stacks"
                />
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg max-h-60 overflow-auto">
                    {TECH_STACKS.filter(option => 
                      option.label.toLowerCase().includes(formData.tech_stack.toLowerCase())
                    ).map(option => (
                      <div
                        key={option.value}
                        className="p-3 hover:bg-gray-700 cursor-pointer text-gray-200"
                        onClick={() => {
                          handleInputChange('tech_stack', option.value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* AI/ML Toggle */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between p-6 bg-gray-800 rounded-2xl border-2 border-gray-700">
                <div className="flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">AI/ML Integration</h3>
                    <p className="text-sm text-gray-400">Include artificial intelligence or machine learning features</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ai_ml_needed}
                    onChange={(e) => handleInputChange('ai_ml_needed', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-10 text-center">
            <button
              onClick={handleGenerate}
              disabled={!isFormValid || isLoading}
              className={`
                px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform
                ${isFormValid && !isLoading 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:scale-105 shadow-lg hover:shadow-xl text-white' 
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Ideas...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Hackathon Ideas
                </div>
              )}
            </button>
            {!isFormValid && (
              <p className="text-sm text-gray-400 mt-3">Please fill in all required fields to generate ideas</p>
            )}
          </div>
        </div>

        {/* Ideas Output */}
        {ideas.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                Your Hackathon Ideas
              </h2>
              <div className="flex items-center bg-blue-900/50 px-4 py-2 rounded-full border border-blue-800">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="font-medium text-blue-200">{ideas.length} Brilliant Ideas Generated</span>
              </div>
            </div>

            <div className="space-y-6">
              {ideas.map((idea, idx) => (
                <div 
                  key={idx} 
                  className={`bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg overflow-hidden transition-all duration-300 ${expandedIdea === idx ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                    onClick={() => toggleExpandIdea(idx)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl flex items-center text-gray-100">
                          <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            {idx + 1}
                          </span>
                          {idea.name || `Hackathon Idea #${idx + 1}`}
                        </h3>
                        <p className="text-gray-300 mt-2">{idea.description}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expandedIdea === idx ? 'transform rotate-90' : ''}`} />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {idea.time_estimate && (
                        <span className="flex items-center bg-blue-900/30 px-3 py-1 rounded-full text-sm text-blue-200 border border-blue-800">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {idea.time_estimate}
                        </span>
                      )}
                      {idea.tech_stack && (
                        <span className="flex items-center bg-indigo-900/30 px-3 py-1 rounded-full text-sm text-indigo-200 border border-indigo-800">
                          <Code className="w-4 h-4 mr-1" />
                          {idea.tech_stack}
                        </span>
                      )}
                      {idea.innovation_level && (
                        <span className="flex items-center bg-green-900/30 px-3 py-1 rounded-full text-sm text-green-200 border border-green-800">
                          <Star className="w-4 h-4 mr-1" />
                          {idea.innovation_level}
                        </span>
                      )}
                      {formData.ai_ml_needed && (
                        <span className="flex items-center bg-purple-900/30 px-3 py-1 rounded-full text-sm text-purple-200 border border-purple-800">
                          <Cpu className="w-4 h-4 mr-1" />
                          AI/ML Integrated
                        </span>
                      )}
                    </div>
                  </div>

                  {expandedIdea === idx && (
                    <div className="px-6 pb-6 pt-0 border-t border-gray-700 bg-gray-900/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                            <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {(idea.key_features || [
                              "Innovative solution to a real-world problem",
                              "User-friendly interface",
                              "Scalable architecture",
                              "Potential for future expansion"
                            ]).map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                <span className="text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                            <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                            Potential Impact
                          </h4>
                          <p className="text-gray-300">
                            {idea.potential_impact || "This project has significant potential to make an impact in its target domain, with possibilities for real-world implementation and scalability."}
                          </p>

                          <h4 className="font-semibold text-gray-200 mt-4 mb-3 flex items-center">
                            <Zap className="w-5 h-5 text-blue-400 mr-2" />
                            Why This Could Win
                          </h4>
                          <p className="text-gray-300">
                            {idea.innovation_level ? `With its ${idea.innovation_level.toLowerCase()} innovation level and ${formData.difficulty_level} difficulty, this project stands out for its creativity and technical execution.` : "This project combines technical excellence with creative problem-solving, making it a strong contender in any hackathon."}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-700">
                        <div className="flex flex-wrap gap-4">
                          <button className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg hover:bg-blue-800/50 transition-colors border border-blue-800">
                            Save to Favorites
                          </button>
                          <button className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg hover:bg-purple-800/50 transition-colors border border-purple-800">
                            Share with Team
                          </button>
                          <button className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg hover:bg-green-800/50 transition-colors border border-green-800">
                            View Similar Ideas
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

                <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white border border-blue-500/30">
                  <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Build Your Next Winning Project?</h3>
                    <p className="mb-6 opacity-90">These AI-generated ideas are just the starting point. Pick your favorite and start coding!</p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                      <a 
                        href="https://v0.dev" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                      >
                        <SquareCode className="w-5 h-5" />
                        v0.dev
                      </a>
                      <a 
                        href="https://vercel.com/bolt" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                      >
                        <Bolt className="w-5 h-5" />
                        Vercel Bolt
                      </a>
                      <a 
                        href="https://lovable.ai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                      >
                        <Heart className="w-5 h-5" />
                        Lovable
                      </a>
                      <a 
                        href="https://firebase.google.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
                      >
                        <Flame className="w-5 h-5" />
                        Firebase
                      </a>
                    </div>

                    <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                      Get Started with Development Resources
                    </button>
                  </div>
                </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p>Powered by AI • Built for Innovation • Ready to Win</p>
        </div>
      </div>
    </div>
  );
}

export default App;
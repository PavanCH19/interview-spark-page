import React, { useState, useEffect } from 'react';
import {
    ArrowRight, CheckCircle, TrendingUp, Target, Award,
    Mic, BarChart3, Trophy, Zap, Star, ChevronRight,
    Upload, Briefcase, MessageSquare, LineChart, Calendar,
    PlayCircle, Users, Shield, Sparkles
} from 'lucide-react';

const LandingPage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Software Engineer at Google',
            text: 'This platform boosted my confidence! The personalized questions were exactly what I needed.',
            rating: 5,
            avatar: 'SJ'
        },
        {
            name: 'Michael Chen',
            role: 'Data Scientist at Amazon',
            text: 'The real-time feedback made me improve quickly. Best interview prep tool I\'ve used!',
            rating: 5,
            avatar: 'MC'
        },
        {
            name: 'Priya Sharma',
            role: 'Backend Developer at Microsoft',
            text: 'Loved the progress tracking and badges! It kept me motivated throughout my preparation.',
            rating: 5,
            avatar: 'PS'
        }
    ];

    const features = [
        {
            icon: Upload,
            title: 'Resume-Driven Personalization',
            description: 'Questions matched to your skills & roles automatically from your resume.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Mic,
            title: 'Real-Time Speech Feedback',
            description: 'Improve clarity, pacing, and confidence with instant voice analysis.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: BarChart3,
            title: 'Skill & Progress Tracking',
            description: 'Visual dashboards to measure growth and identify areas for improvement.',
            color: 'from-emerald-500 to-teal-500'
        },
        {
            icon: Trophy,
            title: 'Gamified Learning',
            description: 'Badges, streaks, and milestones to stay motivated and engaged.',
            color: 'from-orange-500 to-red-500'
        }
    ];

    const steps = [
        {
            icon: Upload,
            title: 'Upload Resume',
            description: 'Extract skills & roles automatically'
        },
        {
            icon: Briefcase,
            title: 'Choose Domain & Company',
            description: 'Get personalized questions'
        },
        {
            icon: MessageSquare,
            title: 'Mock Interview Session',
            description: 'Practice via text or voice'
        },
        {
            icon: LineChart,
            title: 'View Results & Insights',
            description: 'See dashboards & recommendations'
        },
        {
            icon: TrendingUp,
            title: 'Track Progress',
            description: 'Improve with gamification'
        }
    ];

    //  const badges = [
    //     { icon: '🎉', title: '5 Sessions Completed', color: 'from-blue-400 to-blue-600' },
    //     { icon: '🔥', title: '7-Day Streak', color: 'from-orange-400 to-red-500' },
    //     { icon: '⭐', title: 'Top Performer', color: 'from-yellow-400 to-orange-500' },
    //     { icon: '🏆', title: 'Achievement Unlocked', color: 'from-purple-400 to-pink-500' }
    // ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Navigation */}
            {/* <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">InterviewPrep</span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
                            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
                            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav> */}


            {/* Hero Section */}
            <section className="relative pt-15 pb-20 px-4 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
                                <Sparkles className="w-4 h-4" />
                                <span>AI-Powered Interview Preparation</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
                                Smart Interview Preparation:
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Personalized, Adaptive & Effective</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-slide-up animation-delay-200">
                                Practice tailored mock interviews, get real-time feedback, and track your progress with our intelligent platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-400">
                                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                    <span>Start Preparing Now</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                                    Learn More
                                </button>
                            </div>
                            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <span>50,000+ users</span>
                                </div>
                            </div>
                        </div>


                        {/* Hero Illustration */}
                        <div className="relative animate-slide-up animation-delay-600">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 bg-gray-200 rounded-full mb-2 w-3/4"></div>
                                        <div className="h-2 bg-gray-200 rounded-full w-1/2"></div>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-4">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <div className="h-2 bg-blue-300 rounded-full mb-2"></div>
                                        <div className="h-2 bg-blue-300 rounded-full w-5/6"></div>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                        <div className="h-2 bg-purple-300 rounded-full mb-2"></div>
                                        <div className="h-2 bg-purple-300 rounded-full w-4/6"></div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 h-10 bg-gray-100 rounded-lg"></div>
                                    <div className="w-20 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                                <Star className="w-10 h-10 text-white fill-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why This Platform Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to ace your next interview, all in one intelligent platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setHoveredFeature(idx)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                    className={`bg-white border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${hoveredFeature === idx ? 'transform -translate-y-2 shadow-2xl border-transparent' : 'shadow-sm'
                                        }`}
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 ${hoveredFeature === idx ? 'scale-110' : ''
                                        }`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Your Preparation Journey
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Follow these simple steps to master your interview skills
                        </p>
                    </div>

                    {/* Desktop Timeline */}
                    <div className="hidden lg:flex items-center justify-between relative">
                        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-300"></div>
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="relative z-10 flex flex-col items-center w-48">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                        <h3 className="font-semibold text-gray-900 mb-1 text-sm">{step.title}</h3>
                                        <p className="text-gray-600 text-xs">{step.description}</p>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <ChevronRight className="absolute -right-12 top-6 w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile Timeline */}
                    <div className="lg:hidden space-y-6">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                                        <p className="text-gray-600 text-sm">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Users Say
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Join thousands of successful candidates who transformed their interview skills
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
                            {testimonials.map((testimonial, idx) => (
                                <div
                                    key={idx}
                                    className={`transition-all duration-500 ${idx === currentTestimonial ? 'opacity-100' : 'opacity-0 hidden'
                                        }`}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-lg text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                                    <div className="flex gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentTestimonial(idx)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gamification Section
            <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Stay Motivated While You Learn
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Earn badges, maintain streaks, and level up as you progress
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {badges.map((badge, idx) => (
                            <div
                                key={idx}
                                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                            >
                                <div className={`w-20 h-20 bg-gradient-to-r ${badge.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {badge.icon}
                                </div>
                                <h3 className="text-center font-semibold text-gray-900">{badge.title}</h3>
                            </div>
                        ))}
                    </div>

                    
                    <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Level 3</h3>
                                <p className="text-gray-600">125 XP to Level 4</p>
                            </div>
                            <div className="relative w-20 h-20">
                                <svg className="transform -rotate-90 w-20 h-20">
                                    <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
                                    <circle cx="40" cy="40" r="36" stroke="url(#progress-gradient)" strokeWidth="6" fill="transparent" strokeDasharray="226" strokeDashoffset="75" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-bold text-gray-900">65%</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Final CTA Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Ace Your Next Interview?
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of learners building confidence with our adaptive interview platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                            <span>Get Started Free</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                            Book a Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">InterviewPrep</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Your intelligent partner for interview success.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2025 InterviewPrep. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
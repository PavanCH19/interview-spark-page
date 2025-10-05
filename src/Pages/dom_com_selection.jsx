import React, { useState, useRef, useEffect } from 'react';
import {
    Search, ChevronDown, X, Check, Sparkles, TrendingUp,
    Code, Database, Shield, Cloud, Briefcase, Target, ArrowRight,
    Cpu, Server, Globe, Zap
} from 'lucide-react';

const DomainCompanySelector = ({ onComplete }) => {
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [domainSearch, setDomainSearch] = useState('');
    const [companySearch, setCompanySearch] = useState('');
    const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
    const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

    const domainDropdownRef = useRef(null);
    const companyDropdownRef = useRef(null);

    // Domain data with icons
    const domains = [
        { id: 1, name: 'Artificial Intelligence', icon: Cpu, color: 'from-purple-400 to-pink-400', trend: true },
        { id: 2, name: 'Backend Development', icon: Server, color: 'from-blue-400 to-cyan-400' },
        { id: 3, name: 'Frontend Development', icon: Code, color: 'from-green-400 to-emerald-400', trend: true },
        { id: 4, name: 'Data Science', icon: Database, color: 'from-orange-400 to-red-400' },
        { id: 5, name: 'Cybersecurity', icon: Shield, color: 'from-red-400 to-rose-400', trend: true },
        { id: 6, name: 'Cloud Computing', icon: Cloud, color: 'from-sky-400 to-blue-400' },
        { id: 7, name: 'DevOps', icon: Zap, color: 'from-yellow-400 to-orange-400' },
        { id: 8, name: 'Full Stack', icon: Globe, color: 'from-indigo-400 to-purple-400' },
        { id: 9, name: 'Quality Assurance', icon: Check, color: 'from-teal-400 to-green-400' },
        { id: 10, name: 'Mobile Development', icon: Briefcase, color: 'from-pink-400 to-purple-400' }
    ];

    // Company data
    const companies = [
        { id: 1, name: 'Google', trend: true, suggested: true },
        { id: 2, name: 'Amazon', trend: true, suggested: false },
        { id: 3, name: 'Microsoft', trend: true, suggested: true },
        { id: 4, name: 'Meta', trend: false, suggested: false },
        { id: 5, name: 'Apple', trend: true, suggested: false },
        { id: 6, name: 'Netflix', trend: false, suggested: false },
        { id: 7, name: 'Tesla', trend: true, suggested: false },
        { id: 8, name: 'Infosys', trend: false, suggested: true },
        { id: 9, name: 'TCS', trend: false, suggested: false },
        { id: 10, name: 'Wipro', trend: false, suggested: false },
        { id: 11, name: 'Accenture', trend: false, suggested: false },
        { id: 12, name: 'IBM', trend: false, suggested: false },
        { id: 13, name: 'Oracle', trend: false, suggested: false },
        { id: 14, name: 'Salesforce', trend: true, suggested: false },
        { id: 15, name: 'Adobe', trend: false, suggested: false }
    ];

    // Filter functions
    const filteredDomains = domains.filter(domain =>
        domain.name.toLowerCase().includes(domainSearch.toLowerCase())
    );

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(companySearch.toLowerCase())
    );

    const trendingDomains = domains.filter(d => d.trend);
    const trendingCompanies = companies.filter(c => c.trend);
    const suggestedCompanies = companies.filter(c => c.suggested);

    // Toggle handlers
    const toggleDomain = (domain) => {
        if (selectedDomains.find(d => d.id === domain.id)) {
            setSelectedDomains([]); // deselect if clicked again
        } else {
            setSelectedDomains([domain]); // replace with the new one
        }
    };


    const toggleCompany = (company) => {
        if (selectedCompanies.find(c => c.id === company.id)) {
            setSelectedCompanies([]); // deselect if clicked again
        } else {
            setSelectedCompanies([company]); // replace with the new one
        }
    };


    const removeDomain = (domainId) => {
        setSelectedDomains(selectedDomains.filter(d => d.id !== domainId));
    };

    const removeCompany = (companyId) => {
        setSelectedCompanies(selectedCompanies.filter(c => c.id !== companyId));
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (domainDropdownRef.current && !domainDropdownRef.current.contains(event.target)) {
                setIsDomainDropdownOpen(false);
            }
            if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
                setIsCompanyDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isSelected = selectedDomains.length > 0 || selectedCompanies.length > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative  rounded-3xl overflow-hidden">
            {/* Animated background elements */}
            {/* <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div> */}

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12 pb-32">

                {/* Hero Section */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-xl">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Select Your Focus Area
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
                        Choose one domain and one company to personalize your interview prep journey.
                    </p>
                </div>


                {/* Selection Summary */}
                {isSelected && (
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 mb-8 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Selection</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                            {/* Domains */}
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Domain: {selectedDomains.length > 0 ? selectedDomains[0].name : "None"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedDomains.map((domain) => {
                                        const Icon = domain.icon;
                                        return (
                                            <div
                                                key={domain.id}
                                                className={`flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${domain.color} text-white rounded-full text-sm font-medium`}
                                            >
                                                <Icon className="w-3 h-3" />
                                                {domain.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Companies */}
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Company: {selectedCompanies.length > 0 ? selectedCompanies[0].name : "None"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCompanies.map((company) => (
                                        <div
                                            key={company.id}
                                            className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium"
                                        >
                                            {company.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Start Button */}
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={onComplete}
                                    className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${isSelected
                                        ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:scale-105 animate-pulse-glow"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    <span>Start Assessment</span>
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                    {/* Domain Selector Card */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 animate-slide-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <Code className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Domains</h2>
                        </div>

                        {/* Selected Domains */}
                        {selectedDomains.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {selectedDomains.map(domain => {
                                    const Icon = domain.icon;
                                    return (
                                        <div
                                            key={domain.id}
                                            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${domain.color} text-white rounded-full font-medium shadow-lg animate-scale-in`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{domain.name}</span>
                                            <button
                                                onClick={() => removeDomain(domain.id)}
                                                className="w-5 h-5 flex items-center justify-center bg-white/30 rounded-full hover:bg-white/50 transition-all duration-200"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Domain Dropdown */}
                        <div ref={domainDropdownRef} className="relative mb-6">
                            <button
                                onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-400 transition-all duration-300 focus:outline-none focus:border-purple-500"
                            >
                                <span className="text-gray-600">
                                    {selectedDomains.length === 0 ? 'Select domains...' : `${selectedDomains.length} selected`}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDomainDropdownOpen ? 'rotate-180' : ''
                                    }`} />
                            </button>

                            {isDomainDropdownOpen && (
                                <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-80 overflow-hidden animate-spring-down">
                                    <div className="p-3 border-b border-gray-200">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={domainSearch}
                                                onChange={(e) => setDomainSearch(e.target.value)}
                                                placeholder="Search domains..."
                                                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {filteredDomains.map(domain => {
                                            const Icon = domain.icon;
                                            const isSelected = selectedDomains.find(d => d.id === domain.id);
                                            return (
                                                <button
                                                    key={domain.id}
                                                    onClick={() => toggleDomain(domain)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-all duration-200 ${isSelected ? 'bg-purple-50' : ''
                                                        }`}
                                                >
                                                    <div className={`w-10 h-10 bg-gradient-to-br ${domain.color} rounded-xl flex items-center justify-center shadow-md`}>
                                                        <Icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="flex-1 text-left font-medium text-gray-700">{domain.name}</span>
                                                    {isSelected && <Check className="w-5 h-5 text-purple-600" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Trending Domains */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-orange-500" />
                                <h3 className="font-semibold text-gray-700">Trending Domains</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {trendingDomains.map(domain => {
                                    const Icon = domain.icon;
                                    const isSelected = selectedDomains.find(d => d.id === domain.id);
                                    return (
                                        <button
                                            key={domain.id}
                                            onClick={() => toggleDomain(domain)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isSelected
                                                ? `bg-gradient-to-r ${domain.color} text-white shadow-md`
                                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-sm">{domain.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Company Selector Card */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 animate-slide-up animation-delay-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Companies</h2>
                        </div>

                        {/* Selected Companies */}
                        {selectedCompanies.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {selectedCompanies.map(company => (
                                    <div
                                        key={company.id}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium shadow-lg animate-scale-in ${company.suggested
                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white ring-2 ring-yellow-300 ring-offset-2'
                                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                            }`}
                                    >
                                        {company.suggested && <Sparkles className="w-4 h-4" />}
                                        <span>{company.name}</span>
                                        <button
                                            onClick={() => removeCompany(company.id)}
                                            className="w-5 h-5 flex items-center justify-center bg-white/30 rounded-full hover:bg-white/50 transition-all duration-200"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Company Dropdown */}
                        <div ref={companyDropdownRef} className="relative mb-6">
                            <button
                                onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-400 transition-all duration-300 focus:outline-none focus:border-blue-500"
                            >
                                <span className="text-gray-600">
                                    {selectedCompanies.length === 0 ? 'Select companies...' : `${selectedCompanies.length} selected`}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isCompanyDropdownOpen ? 'rotate-180' : ''
                                    }`} />
                            </button>

                            {isCompanyDropdownOpen && (
                                <div className="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-80 overflow-hidden animate-spring-down">
                                    <div className="p-3 border-b border-gray-200">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={companySearch}
                                                onChange={(e) => setCompanySearch(e.target.value)}
                                                placeholder="Search companies..."
                                                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {filteredCompanies.map(company => {
                                            const isSelected = selectedCompanies.find(c => c.id === company.id);
                                            return (
                                                <button
                                                    key={company.id}
                                                    onClick={() => toggleCompany(company)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-all duration-200 ${isSelected ? 'bg-blue-50' : ''
                                                        } ${company.suggested ? 'bg-yellow-50 hover:bg-yellow-100' : ''}`}
                                                >
                                                    {company.suggested && (
                                                        <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                                                    )}
                                                    <span className="flex-1 text-left font-medium text-gray-700">
                                                        {company.name}
                                                        {company.suggested && (
                                                            <span className="ml-2 text-xs text-yellow-600 font-semibold">Suggested</span>
                                                        )}
                                                    </span>
                                                    {isSelected && <Check className="w-5 h-5 text-blue-600" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Suggested Companies */}
                        {suggestedCompanies.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-yellow-500" />
                                    <h3 className="font-semibold text-gray-700">Suggested For You</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedCompanies.map(company => {
                                        const isSelected = selectedCompanies.find(c => c.id === company.id);
                                        return (
                                            <button
                                                key={company.id}
                                                onClick={() => toggleCompany(company)}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isSelected
                                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md ring-2 ring-yellow-300'
                                                    : 'bg-white border-2 border-yellow-300 text-gray-700 hover:border-yellow-400 animate-glow'
                                                    }`}
                                            >
                                                <Sparkles className="w-4 h-4" />
                                                <span className="text-sm">{company.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Trending Companies */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-5 h-5 text-orange-500" />
                                <h3 className="font-semibold text-gray-700">Trending Companies</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {trendingCompanies.map(company => {
                                    const isSelected = selectedCompanies.find(c => c.id === company.id);
                                    return (
                                        <button
                                            key={company.id}
                                            onClick={() => toggleCompany(company)}
                                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isSelected
                                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
                                                }`}
                                        >
                                            <span className="text-sm">{company.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            {/* Sticky Footer CTA
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 p-4 md:p-6 z-30">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                    <div className="hidden md:block">
                        <p className="text-sm text-gray-600">
                            {selectedDomains.length} domain{selectedDomains.length !== 1 ? 's' : ''} & {selectedCompanies.length} compan{selectedCompanies.length !== 1 ? 'ies' : 'y'} selected
                        </p>
                    </div>
                    
                </div>
            </div> */}

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
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
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
          animation: slide-up 0.6s ease-out;
        }
        @keyframes spring-down {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          50% {
            transform: translateY(5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-spring-down {
          animation: spring-down 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(250, 204, 21, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.8), 0 0 30px rgba(250, 204, 21, 0.5);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
          }
          50% {
            box-shadow: 0 10px 60px rgba(99, 102, 241, 0.6), 0 0 30px rgba(168, 85, 247, 0.4);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default DomainCompanySelector;
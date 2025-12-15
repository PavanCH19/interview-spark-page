import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Download, Share2, Eye, EyeOff, Plus, Trash2,
    GripVertical, CheckCircle, AlertCircle, User, Briefcase,
    GraduationCap, Code, Globe, Mail, Phone, MapPin, Linkedin,
    Github, ZoomIn, ZoomOut, Clock
} from 'lucide-react';

// ==================== CONTEXT ====================
const ResumeContext = createContext(null);

const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) throw new Error('useResume must be used within ResumeProvider');
    return context;
};

// ==================== INITIAL DATA ====================
const initialResumeData = {
    personalInfo: {
        fullName: '',
        jobTitle: '',
        location: '',
        email: '',
        phone: '',
        portfolio: '',
        linkedin: '',
        github: '',
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    volunteering: '',
    hobbies: '',
};

const templatePresets = [
    { name: 'Classic', layout: 'single', fontFamily: 'Georgia', colorTheme: 'neutral' },
    { name: 'Modern', layout: 'two-column', fontFamily: 'Inter', colorTheme: 'blue' },
    { name: 'Minimalist', layout: 'single', fontFamily: 'Arial', colorTheme: 'slate' },
    { name: 'Professional', layout: 'single', fontFamily: 'Times New Roman', colorTheme: 'neutral' },
];

// ==================== MAIN COMPONENT ====================
export default function ResumeBuilderDashboard() {
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [activeTab, setActiveTab] = useState('personal');
    const [previewVisible, setPreviewVisible] = useState(true);
    const [template, setTemplate] = useState({
        name: 'Classic',
        layout: 'single',
        fontFamily: 'Georgia',
        fontSize: 'medium',
        colorTheme: 'neutral',
        accentColor: '#3b82f6',
    });
    const [zoom, setZoom] = useState(100);
    const [hiddenSections, setHiddenSections] = useState([]);
    const [saveStatus, setSaveStatus] = useState('saved');
    const [splitRatio, setSplitRatio] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const [exportMenuOpen, setExportMenuOpen] = useState(false);

    // Auto-save to in-memory state
    useEffect(() => {
        const timer = setTimeout(() => {
            setSaveStatus('saved');
        }, 1000);

        setSaveStatus('unsaved');
        return () => clearTimeout(timer);
    }, [resumeData, template]);

    // Handle mouse drag for resizing
    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const newRatio = ((e.clientX - rect.left) / rect.width) * 100;

        // Limit between 20% and 80%
        if (newRatio >= 20 && newRatio <= 80) {
            setSplitRatio(newRatio);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isDragging]);

    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const addWorkExperience = () => {
        setResumeData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, {
                id: Date.now().toString(),
                role: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                responsibilities: ['']
            }]
        }));
    };

    const updateWorkExperience = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            workExperience: prev.workExperience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const deleteWorkExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            workExperience: prev.workExperience.filter(exp => exp.id !== id)
        }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, {
                id: Date.now().toString(),
                degree: '',
                institution: '',
                location: '',
                startDate: '',
                endDate: '',
                notes: ''
            }]
        }));
    };

    const updateEducation = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const deleteEducation = (id) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const addSkill = () => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, {
                id: Date.now().toString(),
                name: '',
                level: 3,
                keywords: []
            }]
        }));
    };

    const updateSkill = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map(skill =>
                skill.id === id ? { ...skill, [field]: value } : skill
            )
        }));
    };

    const deleteSkill = (id) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.id !== id)
        }));
    };

    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                id: Date.now().toString(),
                title: '',
                description: '',
                techStack: [],
                url: '',
                role: ''
            }]
        }));
    };

    const updateProject = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        }));
    };

    const deleteProject = (id) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter(proj => proj.id !== id)
        }));
    };

    const calculateProgress = () => {
        let completed = 0;

        if (resumeData.personalInfo.fullName && resumeData.personalInfo.email) completed++;
        if (resumeData.summary.length > 50) completed++;
        if (resumeData.workExperience.length > 0) completed++;
        if (resumeData.education.length > 0) completed++;
        if (resumeData.skills.length > 0) completed++;

        return Math.round((completed / 5) * 100);
    };

    const handleExportPDF = () => {
        // Print the current page using an injected print stylesheet (no new window)
        const element = document.getElementById('resume-export');
        if (!element) return alert('Resume content not found');

        // Create a temporary style element for print rules (A4 + narrow margins)
        const printStyle = document.createElement('style');
        printStyle.setAttribute('data-temp-print-style', 'true');
        printStyle.innerHTML = `
            @media print {
                @page { size: A4; margin: 5mm; }
                html, body { height: auto !important; }
                body * { visibility: hidden; }
                #resume-export, #resume-export * { visibility: visible; }
                #resume-export { position: relative; left: 0; top: 0; margin: 0; width: 210mm; box-sizing: border-box; padding: 5mm; }
            }
            `;

        document.head.appendChild(printStyle);

        // Give browser a tick to apply styles, then open print dialog
        setTimeout(() => {
            window.print();

            // remove the temporary print style shortly after print (allow user to cancel)
            setTimeout(() => {
                const s = document.querySelector('style[data-temp-print-style]');
                if (s) s.remove();
            }, 1000);
        }, 50);
    };

    const handleExportDoc = () => {
        const element = document.getElementById('resume-export');
        if (!element) return alert('Resume content not found');

        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .map(node => node.outerHTML)
            .join('\n');

        // Inline minimal print rules for doc export to encourage A4 + narrow margins
        const docStyles = `<style>@page{size:A4;margin:5mm;}body{margin:0;-webkit-print-color-adjust:exact;} .resume-print-container{width:210mm;box-sizing:border-box;padding:5mm;}</style>`;

        const html = `<!doctype html><html><head><meta charset="utf-8" />${styles}${docStyles}</head><body><div class="resume-print-container">${element.outerHTML}</div></body></html>`;
        const blob = new Blob([html], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${new Date().toISOString().slice(0,10)}.doc`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    // Dynamically load a script and return a promise when loaded
    const loadScript = (src) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load script: ' + src));
        document.head.appendChild(s);
    });

    const handleDownloadPDF = async () => {
        const element = document.getElementById('resume-export');
        if (!element) return alert('Resume content not found');

        try {
            // load html2pdf bundle from CDN
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js');

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const opt = {
                margin:       5, // narrow margin in mm
                filename:     `resume_A4_${timestamp}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // clone element and wrap with explicit A4 container and narrow padding
            const clone = element.cloneNode(true);
            const wrapper = document.createElement('div');
            wrapper.style.boxSizing = 'border-box';
            wrapper.style.width = '210mm';
            wrapper.style.padding = '5mm';
            wrapper.appendChild(clone);

            // run html2pdf on the wrapper
            window.html2pdf().set(opt).from(wrapper).save();
        } catch (err) {
            console.error(err);
            alert('Failed to generate PDF. Falling back to print preview.');
            handleExportPDF();
        }
    };

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/resume/${Date.now()}`;
        navigator.clipboard.writeText(shareUrl);
        alert('Share link copied to clipboard!');
    };

    const toggleSection = (section) => {
        setHiddenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const contextValue = {
        resumeData,
        setResumeData,
        updatePersonalInfo,
        addWorkExperience,
        updateWorkExperience,
        deleteWorkExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        template,
        setTemplate,
        hiddenSections,
        toggleSection,
    };

    return (
        <ResumeContext.Provider value={contextValue}>
            <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
                {/* Header */}
                <motion.header
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white border-b border-slate-200 shadow-sm flex-shrink-0"
                >
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <FileText className="w-8 h-8 text-blue-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
                                    <p className="text-sm text-slate-500">Professional Resume Creation Tool</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                {/* Progress Indicator */}
                                <div className="hidden md:flex items-center space-x-2">
                                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-600"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${calculateProgress()}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-slate-600">{calculateProgress()}%</span>
                                </div>

                                {/* Save Status */}
                                <div className="flex items-center space-x-2">
                                    {saveStatus === 'saved' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                    {saveStatus === 'saving' && <Clock className="w-5 h-5 text-yellow-600 animate-spin" />}
                                    <span className="text-sm text-slate-600">
                                        {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : 'Unsaved'}
                                    </span>
                                </div>

                                {/* Toggle Preview (Mobile) */}
                                <button
                                    onClick={() => setPreviewVisible(!previewVisible)}
                                    className="md:hidden p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    {previewVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Main Split View */}
                <div ref={containerRef} className="flex-1 flex overflow-hidden">
                    {/* Left Panel - Form Builder */}
                    <div
                        style={{ width: previewVisible ? `${splitRatio}%` : '100%' }}
                        className="flex flex-col bg-white border-r border-slate-200"
                    >
                        {/* Tabs */}
                        <div className="border-b border-slate-200 bg-slate-50 flex-shrink-0">
                            <div className="flex overflow-x-auto">
                                {[
                                    { id: 'personal', label: 'Personal', icon: User },
                                    { id: 'summary', label: 'Summary', icon: FileText },
                                    { id: 'experience', label: 'Experience', icon: Briefcase },
                                    { id: 'education', label: 'Education', icon: GraduationCap },
                                    { id: 'skills', label: 'Skills', icon: Code },
                                    { id: 'projects', label: 'Projects', icon: Globe },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                            ? 'border-blue-600 text-blue-600 bg-white'
                                            : 'border-transparent text-slate-600 hover:text-slate-900'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        <span className="whitespace-nowrap">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <AnimatePresence mode="wait">
                                {activeTab === 'personal' && <PersonalInfoTab key="personal" />}
                                {activeTab === 'summary' && <SummaryTab key="summary" />}
                                {activeTab === 'experience' && <ExperienceTab key="experience" />}
                                {activeTab === 'education' && <EducationTab key="education" />}
                                {activeTab === 'skills' && <SkillsTab key="skills" />}
                                {activeTab === 'projects' && <ProjectsTab key="projects" />}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Draggable Divider */}
                    {previewVisible && (
                        <div
                            onMouseDown={handleMouseDown}
                            className="w-1 bg-slate-300 hover:bg-blue-500 cursor-col-resize flex-shrink-0 relative group"
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="w-4 h-4 text-blue-600" />
                            </div>
                        </div>
                    )}

                    {/* Right Panel - Preview */}
                    {previewVisible && (
                        <div
                            style={{ width: `${100 - splitRatio}%` }}
                            className="flex flex-col bg-slate-100"
                        >
                            {/* Preview Controls */}
                            <div className="border-b border-slate-200 bg-slate-50 p-4 flex-shrink-0">
                                <div className="flex items-center justify-between flex-wrap gap-3">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setZoom(Math.max(50, zoom - 10))}
                                            className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50"
                                        >
                                            <ZoomOut className="w-4 h-4" />
                                        </button>
                                        <span className="text-sm font-medium text-slate-700">{zoom}%</span>
                                        <button
                                            onClick={() => setZoom(Math.min(150, zoom + 10))}
                                            className="p-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50"
                                        >
                                            <ZoomIn className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <select
                                            value={template.name}
                                            onChange={(e) => {
                                                const preset = templatePresets.find(p => p.name === e.target.value);
                                                if (preset) setTemplate({ ...template, ...preset });
                                            }}
                                            className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                                        >
                                            {templatePresets.map(t => (
                                                <option key={t.name} value={t.name}>{t.name}</option>
                                            ))}
                                        </select>

                                        <div className="relative">
                                            <button
                                                onClick={() => setExportMenuOpen(prev => !prev)}
                                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                <Download className="w-4 h-4" />
                                                <span className="hidden sm:inline">Export</span>
                                            </button>

                                            {exportMenuOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded shadow-lg z-50">
                                                    <button
                                                        className="w-full text-left px-4 py-2 hover:bg-slate-100"
                                                        onClick={() => { setExportMenuOpen(false); handleDownloadPDF(); }}
                                                    >
                                                        Download PDF (A4)
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 hover:bg-slate-100"
                                                        onClick={() => { setExportMenuOpen(false); handleExportPDF(); }}
                                                    >
                                                        Open Print Preview
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 hover:bg-slate-100"
                                                        onClick={() => { setExportMenuOpen(false); handleExportDoc(); }}
                                                    >
                                                        Download .doc
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleShare}
                                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            <span className="hidden sm:inline">Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="flex-1 overflow-auto p-6">
                                <div
                                    style={{
                                        transform: `scale(${zoom / 100})`,
                                        transformOrigin: 'top center',
                                    }}
                                    className="transition-transform"
                                >
                                    <ResumePreview />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ResumeContext.Provider>
    );
}

// ==================== FORM TABS ====================

function PersonalInfoTab() {
    const { resumeData, updatePersonalInfo } = useResume();
    const { personalInfo } = resumeData;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
        >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={personalInfo.jobTitle}
                        onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                        placeholder="Senior Software Engineer"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Location
                    </label>
                    <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        placeholder="San Francisco, CA"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        <Globe className="w-4 h-4 inline mr-1" />
                        Portfolio
                    </label>
                    <input
                        type="url"
                        value={personalInfo.portfolio}
                        onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                        placeholder="https://johndoe.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        <Linkedin className="w-4 h-4 inline mr-1" />
                        LinkedIn
                    </label>
                    <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/johndoe"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        <Github className="w-4 h-4 inline mr-1" />
                        GitHub
                    </label>
                    <input
                        type="url"
                        value={personalInfo.github}
                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                        placeholder="https://github.com/johndoe"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </motion.div>
    );
}

function SummaryTab() {
    const { resumeData, setResumeData } = useResume();
    const maxLength = 500;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
        >
            <h2 className="text-xl font-bold text-slate-900 mb-2">Professional Summary</h2>
            <p className="text-sm text-slate-600 mb-4">
                Write a compelling summary that highlights your key achievements and career goals. Use metrics and specific accomplishments.
            </p>

            <div>
                <textarea
                    value={resumeData.summary}
                    onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
                    rows={8}
                    maxLength={maxLength}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">
                        {resumeData.summary.length} / {maxLength} characters
                    </span>
                    {resumeData.summary.length < 50 && (
                        <span className="text-sm text-amber-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Add more detail for better impact
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ExperienceTab() {
    const { resumeData, addWorkExperience, updateWorkExperience, deleteWorkExperience } = useResume();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Work Experience</h2>
                <button
                    onClick={addWorkExperience}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Experience</span>
                </button>
            </div>

            {resumeData.workExperience.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                    <Briefcase className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                    <p className="text-slate-600">No work experience added yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {resumeData.workExperience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <GripVertical className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700">Position {index + 1}</span>
                                </div>
                                <button
                                    onClick={() => deleteWorkExperience(exp.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={exp.role}
                                    onChange={(e) => updateWorkExperience(exp.id, 'role', e.target.value)}
                                    placeholder="Job Title"
                                    className="px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                                    placeholder="Company Name"
                                    className="px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={exp.location}
                                    onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                                    placeholder="Location"
                                    className="px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <div className="flex space-x-2">
                                    <input
                                        type="month"
                                        value={exp.startDate}
                                        onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                                    />
                                    <input
                                        type="month"
                                        value={exp.endDate}
                                        onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                                        disabled={exp.current}
                                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg disabled:bg-slate-100"
                                    />
                                </div>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={exp.current}
                                        onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <span className="text-sm text-slate-700">Currently working here</span>
                                </label>
                            </div>

                            <div className="mt-3">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Responsibilities & Achievements
                                </label>
                                {exp.responsibilities.map((resp, rIndex) => (
                                    <div key={rIndex} className="flex items-start space-x-2 mb-2">
                                        <span className="text-slate-400 mt-2">•</span>
                                        <input
                                            type="text"
                                            value={resp}
                                            onChange={(e) => {
                                                const newResp = [...exp.responsibilities];
                                                newResp[rIndex] = e.target.value;
                                                updateWorkExperience(exp.id, 'responsibilities', newResp);
                                            }}
                                            placeholder="Led team of 5 engineers, increasing productivity by 40%"
                                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                                        />
                                        {exp.responsibilities.length > 1 && (
                                            <button
                                                onClick={() => {
                                                    const newResp = exp.responsibilities.filter((_, i) => i !== rIndex);
                                                    updateWorkExperience(exp.id, 'responsibilities', newResp);
                                                }}
                                                className="text-red-600 hover:text-red-700 mt-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        const newResp = [...exp.responsibilities, ''];
                                        updateWorkExperience(exp.id, 'responsibilities', newResp);
                                    }}
                                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 mt-2"
                                >
                                    <Plus className="w-3 h-3" />
                                    <span>Add bullet point</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function EducationTab() {
    const { resumeData, addEducation, updateEducation, deleteEducation } = useResume();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Education</h2>
                <button
                    onClick={addEducation}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Education</span>
                </button>
            </div>

            {resumeData.education.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                    <GraduationCap className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                    <p className="text-slate-600">No education added yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <GripVertical className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700">Education {index + 1}</span>
                                </div>
                                <button
                                    onClick={() => deleteEducation(edu.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                    placeholder="Bachelor of Science in Computer Science"
                                    className="md:col-span-2 px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                    placeholder="University Name"
                                    className="px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={edu.location}
                                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                    placeholder="Location"
                                    className="px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="month"
                                    value={edu.startDate}
                                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                    className="px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="month"
                                    value={edu.endDate}
                                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                    className="px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <textarea
                                    value={edu.notes}
                                    onChange={(e) => updateEducation(edu.id, 'notes', e.target.value)}
                                    placeholder="GPA: 3.8/4.0, Dean's List, Honors"
                                    rows={2}
                                    className="md:col-span-2 px-3 py-2 border border-slate-300 rounded-lg"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function SkillsTab() {
    const { resumeData, addSkill, updateSkill, deleteSkill } = useResume();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Skills</h2>
                <button
                    onClick={addSkill}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                </button>
            </div>

            {resumeData.skills.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                    <Code className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                    <p className="text-slate-600">No skills added yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {resumeData.skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <GripVertical className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700">Skill {index + 1}</span>
                                </div>
                                <button
                                    onClick={() => deleteSkill(skill.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                    placeholder="React, Python, Project Management, etc."
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Proficiency Level: {skill.level}/5
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={skill.level}
                                        onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>Beginner</span>
                                        <span>Intermediate</span>
                                        <span>Expert</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function ProjectsTab() {
    const { resumeData, addProject, updateProject, deleteProject } = useResume();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Projects</h2>
                <button
                    onClick={addProject}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                </button>
            </div>

            {resumeData.projects.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                    <Globe className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                    <p className="text-slate-600">No projects added yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {resumeData.projects.map((proj, index) => (
                        <motion.div
                            key={proj.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <GripVertical className="w-5 h-5 text-slate-400" />
                                    <span className="font-semibold text-slate-700">Project {index + 1}</span>
                                </div>
                                <button
                                    onClick={() => deleteProject(proj.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={proj.title}
                                    onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                                    placeholder="Project Title"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <textarea
                                    value={proj.description}
                                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                                    placeholder="Brief description of the project and your contributions"
                                    rows={3}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={proj.role}
                                    onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                                    placeholder="Your Role (e.g., Lead Developer, Team Lead)"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="url"
                                    value={proj.url}
                                    onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                                    placeholder="Project URL or GitHub link"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />
                                <input
                                    type="text"
                                    value={proj.techStack.join(', ')}
                                    onChange={(e) => updateProject(proj.id, 'techStack', e.target.value.split(',').map(s => s.trim()))}
                                    placeholder="Tech Stack (comma-separated): React, Node.js, MongoDB"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

// ==================== PREVIEW COMPONENT ====================

function ResumePreview() {
    const { resumeData, template, hiddenSections } = useResume();
    const { personalInfo, summary, workExperience, education, skills, projects } = resumeData;

    const fontSizeMap = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
    };

    const colorThemes = {
        neutral: 'text-slate-900',
        blue: 'text-blue-900',
        slate: 'text-slate-800',
        pastel: 'text-purple-900'
    };

    return (
        <div
            id="resume-export"
            className={`bg-white shadow-xl mx-auto max-w-4xl ${fontSizeMap[template.fontSize]} print:shadow-none`}
            style={{
                fontFamily: template.fontFamily,
                minHeight: '297mm',
                padding: '20mm'
            }}
        >
            {/* Header */}
            <div className="mb-6 pb-6 border-b-2" style={{ borderColor: template.accentColor }}>
                <h1 className={`text-4xl font-bold mb-2 ${colorThemes[template.colorTheme]}`}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-xl text-slate-600 mb-3">
                    {personalInfo.jobTitle || 'Your Job Title'}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    {personalInfo.email && (
                        <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{personalInfo.location}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center space-x-1">
                            <Linkedin className="w-4 h-4" />
                            <span className="truncate max-w-xs">{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo.github && (
                        <div className="flex items-center space-x-1">
                            <Github className="w-4 h-4" />
                            <span className="truncate max-w-xs">{personalInfo.github}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary */}
            {summary && !hiddenSections.includes('summary') && (
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-3 flex items-center" style={{ color: template.accentColor }}>
                        <FileText className="w-5 h-5 mr-2" />
                        Professional Summary
                    </h2>
                    <p className="text-slate-700 leading-relaxed">{summary}</p>
                </div>
            )}

            {/* Work Experience */}
            {workExperience.length > 0 && !hiddenSections.includes('experience') && (
                <div className="mb-6 break-inside-avoid">
                    <h2 className="text-2xl font-bold mb-3 flex items-center" style={{ color: template.accentColor }}>
                        <Briefcase className="w-5 h-5 mr-2" />
                        Work Experience
                    </h2>
                    <div className="space-y-4">
                        {workExperience.map(exp => (
                            <div key={exp.id} className="break-inside-avoid">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                                        <p className="text-slate-700">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                                    </div>
                                    <span className="text-sm text-slate-600 whitespace-nowrap">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                {exp.responsibilities.length > 0 && exp.responsibilities[0] && (
                                    <ul className="list-disc list-inside space-y-1 text-slate-700 ml-2">
                                        {exp.responsibilities.map((resp, idx) => resp && (
                                            <li key={idx}>{resp}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && !hiddenSections.includes('education') && (
                <div className="mb-6 break-inside-avoid">
                    <h2 className="text-2xl font-bold mb-3 flex items-center" style={{ color: template.accentColor }}>
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Education
                    </h2>
                    <div className="space-y-3">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                        <p className="text-slate-700">{edu.institution}{edu.location && ` • ${edu.location}`}</p>
                                        {edu.notes && <p className="text-sm text-slate-600 italic">{edu.notes}</p>}
                                    </div>
                                    <span className="text-sm text-slate-600 whitespace-nowrap">
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && !hiddenSections.includes('skills') && (
                <div className="mb-6 break-inside-avoid">
                    <h2 className="text-2xl font-bold mb-3 flex items-center" style={{ color: template.accentColor }}>
                        <Code className="w-5 h-5 mr-2" />
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => skill.name && (
                            <span
                                key={skill.id}
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                    backgroundColor: `${template.accentColor}20`,
                                    color: template.accentColor
                                }}
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && !hiddenSections.includes('projects') && (
                <div className="mb-6 break-inside-avoid">
                    <h2 className="text-2xl font-bold mb-3 flex items-center" style={{ color: template.accentColor }}>
                        <Globe className="w-5 h-5 mr-2" />
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {projects.map(proj => proj.title && (
                            <div key={proj.id}>
                                <h3 className="font-bold text-slate-900">{proj.title}</h3>
                                {proj.role && <p className="text-sm text-slate-600 italic">{proj.role}</p>}
                                {proj.description && <p className="text-slate-700">{proj.description}</p>}
                                {proj.techStack.length > 0 && proj.techStack[0] && (
                                    <p className="text-sm text-slate-600 mt-1">
                                        <strong>Tech:</strong> {proj.techStack.join(', ')}
                                    </p>
                                )}
                                {proj.url && (
                                    <p className="text-sm" style={{ color: template.accentColor }}>
                                        {proj.url}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
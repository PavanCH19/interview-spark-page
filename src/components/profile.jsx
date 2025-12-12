    import React, { useEffect, useState } from 'react';
    import { Edit2, Save, X, Plus, Trash2, Github, Linkedin, MapPin, Mail, Phone, Briefcase, GraduationCap, Code2, Award, ExternalLink, Calendar } from 'lucide-react';
    import axios from 'axios';

    const ProfileEditor = () => {
        const [userData, setUserData] = useState({
            profile: {
                name: "",
                email: "",
                phone: "",
                location: ""
            },
            skills: [
            ],
            education: [
                {
                    id: 0,
                    degree: "",
                    college: "",
                    startYear: "",
                    endYear: ""
                }
            ],
            experience: [
                {
                    id: 0,
                    role: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    current: false
                }
            ],
            projects: [
                {
                    id: 0,
                    title: "",
                    description: "",
                    technologies: [],
                    startDate: "",
                    endDate: "",
                    link: "https://",
                    github: "https://"
                }
            ],
            github_url: "",
            linkedin_url: ""
        });

        const [editMode, setEditMode] = useState({
            profile: false,
            skills: false,
            social: false,
            education: {},
            experience: {},
            projects: {}
        });

        const [newSkill, setNewSkill] = useState("");

        useEffect(() => {
            const token = localStorage.getItem('token');

            axios.get('http://localhost:3000/api/auth/getUserDetails', {
                headers: { 'Authorization': token }
            })
                .then((res) => {
                    console.log('User data fetched:', res.data);

                    // FIX: Assign only the actual user data
                    setUserData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);


        const toggleEdit = (section, id = null) => {
            if (id !== null) {
                setEditMode(prev => ({
                    ...prev,
                    [section]: { ...prev[section], [id]: !prev[section][id] }
                }));
            } else {
                setEditMode(prev => ({ ...prev, [section]: !prev[section] }));
            }
        };

        const updateProfile = (field, value) => {
            setUserData(prev => ({
                ...prev,
                profile: { ...prev.profile, [field]: value }
            }));
        };

        const updateSocial = (field, value) => {
            setUserData(prev => ({
                ...prev,
                [field]: value
            }));
        };

        const addSkill = () => {
            if (newSkill.trim()) {
                setUserData(prev => ({
                    ...prev,
                    skills: [...prev.skills, newSkill.toLowerCase().trim()]
                }));
                setNewSkill("");
            }
        };

        const removeSkill = (index) => {
            setUserData(prev => ({
                ...prev,
                skills: prev.skills.filter((_, i) => i !== index)
            }));
        };

        const updateEducation = (id, field, value) => {
            setUserData(prev => ({
                ...prev,
                education: prev.education.map(edu =>
                    edu.id === id ? { ...edu, [field]: value } : edu
                )
            }));
        };

        const addEducation = () => {
            setUserData(prev => ({
                ...prev,
                education: [...prev.education, {
                    id: Date.now(),
                    degree: "",
                    college: "",
                    startYear: "",
                    endYear: ""
                }]
            }));
        };

        const removeEducation = (id) => {
            setUserData(prev => ({
                ...prev,
                education: prev.education.filter(edu => edu.id !== id)
            }));
        };

        const updateExperience = (id, field, value) => {
            setUserData(prev => ({
                ...prev,
                experience: prev.experience.map(exp =>
                    exp.id === id ? { ...exp, [field]: value } : exp
                )
            }));
        };

        const addExperience = () => {
            setUserData(prev => ({
                ...prev,
                experience: [...prev.experience, {
                    id: Date.now(),
                    role: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    current: false
                }]
            }));
        };

        const removeExperience = (id) => {
            setUserData(prev => ({
                ...prev,
                experience: prev.experience.filter(exp => exp.id !== id)
            }));
        };

        const updateProject = (id, field, value) => {
            setUserData(prev => ({
                ...prev,
                projects: prev.projects.map(proj =>
                    proj.id === id ? { ...proj, [field]: value } : proj
                )
            }));
        };

        const addProject = () => {
            setUserData(prev => ({
                ...prev,
                projects: [...prev.projects, {
                    id: Date.now(),
                    title: "",
                    description: "",
                    technologies: [],
                    startDate: "",
                    endDate: "",
                    link: "",
                    github: ""
                }]
            }));
        };

        const removeProject = (id) => {
            setUserData(prev => ({
                ...prev,
                projects: prev.projects.filter(proj => proj.id !== id)
            }));
        };

        const InputField = ({ label, value, onChange, placeholder, type = "text", disabled = false }) => (
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
            </div>
        );

        const TextAreaField = ({ label, value, onChange, placeholder, rows = 3 }) => (
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
            </div>
        );

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto space-y-6">



                    {/* Profile Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                        profile
                                    </div>
                                    {editMode.profile ? (
                                        <input
                                            type="text"
                                            value={userData?.profile?.name || ''}
                                            onChange={(e) => updateProfile('name', e.target.value)}
                                            className="text-4xl font-bold bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 w-full mb-4 text-white placeholder-white/60"
                                            placeholder="Full Name"
                                        />
                                    ) : (
                                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{userData?.profile?.name || 'Your Name'}</h1>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                            <Mail className="w-5 h-5 text-white/80" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-white/60 font-medium mb-1">email</div>
                                                {editMode.profile ? (
                                                    <input
                                                        type="email"
                                                        value={userData?.profile?.email || ''}
                                                        onChange={(e) => updateProfile('email', e.target.value)}
                                                        className="bg-white/20 rounded px-2 py-1 w-full text-white text-sm"
                                                    />
                                                ) : (
                                                    <span className="text-white text-sm truncate block">{userData?.profile?.email || 'your.email@example.com'}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                            <Phone className="w-5 h-5 text-white/80" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-white/60 font-medium mb-1">phone</div>
                                                {editMode.profile ? (
                                                    <input
                                                        type="tel"
                                                        value={userData?.profile?.phone || ''}
                                                        onChange={(e) => updateProfile('phone', e.target.value)}
                                                        className="bg-white/20 rounded px-2 py-1 w-full text-white text-sm"
                                                    />
                                                ) : (
                                                    <span className="text-white text-sm">{userData?.profile?.phone || 'Not provided'}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 md:col-span-2">
                                            <MapPin className="w-5 h-5 text-white/80" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-white/60 font-medium mb-1">location</div>
                                                {editMode.profile ? (
                                                    <input
                                                        type="text"
                                                        value={userData?.profile?.location || ''}
                                                        onChange={(e) => updateProfile('location', e.target.value)}
                                                        placeholder="Add location"
                                                        className="bg-white/20 rounded px-2 py-1 w-full text-white text-sm placeholder-white/40"
                                                    />
                                                ) : (
                                                    <span className="text-white text-sm">{userData?.profile?.location || 'Not specified'}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => toggleEdit('profile')}
                                    className="ml-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-3 transition"
                                >
                                    {editMode.profile ? <Save className="w-5 h-5 text-white" /> : <Edit2 className="w-5 h-5 text-white" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <ExternalLink className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Social Links</h2>
                                    <p className="text-sm text-gray-500">github_url, linkedin_url</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleEdit('social')}
                                className="text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition"
                            >
                                {editMode.social ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {editMode.social ? (
                                <>
                                    <InputField
                                        label="github_url"
                                        value={userData.github_url}
                                        onChange={(e) => updateSocial('github_url', e.target.value)}
                                        placeholder="https://github.com/username"
                                    />
                                    <InputField
                                        label="linkedin_url"
                                        value={userData.linkedin_url}
                                        onChange={(e) => updateSocial('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </>
                            ) : (
                                <>
                                    <a
                                        href={userData.github_url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition group"
                                    >
                                        <Github className="w-6 h-6 text-gray-700 group-hover:text-black" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-semibold text-gray-500 mb-1">github_url</div>
                                            <div className="text-sm text-gray-900 truncate">{userData.github_url || 'Not set'}</div>
                                        </div>
                                    </a>
                                    <a
                                        href={userData.linkedin_url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition group"
                                    >
                                        <Linkedin className="w-6 h-6 text-blue-600" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-semibold text-gray-500 mb-1">linkedin_url</div>
                                            <div className="text-sm text-gray-900 truncate">{userData.linkedin_url || 'Not set'}</div>
                                        </div>
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <Award className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                                    <p className="text-sm text-gray-500">skills: string[]</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleEdit('skills')}
                                className="text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition"
                            >
                                {editMode.skills ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {userData.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 border border-blue-200 hover:shadow-sm transition"
                                >
                                    <Code2 className="w-3.5 h-3.5" />
                                    {skill}
                                    {editMode.skills && (
                                        <button
                                            onClick={() => removeSkill(index)}
                                            className="hover:text-red-600 ml-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {editMode.skills && (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                    placeholder="Add new skill"
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    onClick={addSkill}
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" /> Add
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Education Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <GraduationCap className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Education</h2>
                                    <p className="text-sm text-gray-500">education: {"{"} id, degree, college, startYear, endYear {"}"}</p>
                                </div>
                            </div>
                            <button
                                onClick={addEducation}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </div>

                        <div className="space-y-4">
                            {userData.education.map((edu) => (
                                <div key={edu.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1 space-y-4">
                                            {editMode.education[edu.id] ? (
                                                <>
                                                    <InputField
                                                        label="degree"
                                                        value={edu.degree}
                                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                        placeholder="Bachelor of Science in Computer Science"
                                                    />
                                                    <InputField
                                                        label="college"
                                                        value={edu.college}
                                                        onChange={(e) => updateEducation(edu.id, 'college', e.target.value)}
                                                        placeholder="University Name"
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InputField
                                                            label="startYear"
                                                            value={edu.startYear}
                                                            onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                                                            placeholder="2020"
                                                        />
                                                        <InputField
                                                            label="endYear"
                                                            value={edu.endYear}
                                                            onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                                                            placeholder="2024"
                                                        />
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded">
                                                        id: {edu.id}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <div className="text-xs font-semibold text-gray-500 mb-1">degree</div>
                                                        <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-semibold text-gray-500 mb-1">college</div>
                                                        <p className="text-gray-700">{edu.college}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div>
                                                            <span className="text-xs font-semibold text-gray-500">startYear: </span>
                                                            <span className="text-gray-700">{edu.startYear}</span>
                                                        </div>
                                                        <span className="text-gray-400">→</span>
                                                        <div>
                                                            <span className="text-xs font-semibold text-gray-500">endYear: </span>
                                                            <span className="text-gray-700">{edu.endYear}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-mono">id: {edu.id}</div>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => toggleEdit('education', edu.id)}
                                                className="text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition"
                                            >
                                                {editMode.education[edu.id] ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => removeEducation(edu.id)}
                                                className="text-red-600 hover:bg-red-50 rounded-lg p-2 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <Briefcase className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                                    <p className="text-sm text-gray-500">experience: {"{"} id, role, company, startDate, endDate, current {"}"}</p>
                                </div>
                            </div>
                            <button
                                onClick={addExperience}
                                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </div>

                        <div className="space-y-4">
                            {userData.experience.map((exp) => (
                                <div key={exp.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1 space-y-4">
                                            {editMode.experience[exp.id] ? (
                                                <>
                                                    <InputField
                                                        label="role"
                                                        value={exp.role}
                                                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                        placeholder="Senior Software Engineer"
                                                    />
                                                    <InputField
                                                        label="company"
                                                        value={exp.company}
                                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                        placeholder="Company Name"
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InputField
                                                            label="startDate"
                                                            type="month"
                                                            value={exp.startDate}
                                                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                        />
                                                        <InputField
                                                            label="endDate"
                                                            type="month"
                                                            value={exp.endDate}
                                                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                            disabled={exp.current}
                                                        />
                                                    </div>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={exp.current}
                                                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                                            className="w-4 h-4 text-blue-600 rounded"
                                                        />
                                                        <span className="text-sm font-medium text-gray-700">current: {exp.current.toString()}</span>
                                                    </label>
                                                    <div className="text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded">
                                                        id: {exp.id}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <div className="text-xs font-semibold text-gray-500 mb-1">role</div>
                                                        <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-semibold text-gray-500 mb-1">company</div>
                                                        <p className="text-gray-700">{exp.company}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span className="text-xs font-semibold text-gray-500">startDate: </span>
                                                            <span className="text-gray-700">{exp.startDate}</span>
                                                        </div>
                                                        <span className="text-gray-400">→</span>
                                                        <div>
                                                            <span className="text-xs font-semibold text-gray-500">endDate: </span>
                                                            <span className="text-gray-700">{exp.current ? 'Present' : exp.endDate}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs">
                                                        <div className="text-gray-400 font-mono">id: {exp.id}</div>
                                                        <div className={`font-medium ${exp.current ? 'text-green-600' : 'text-gray-500'}`}>
                                                            current: {exp.current.toString()}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => toggleEdit('experience', exp.id)}
                                                className="text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition"
                                            >
                                                {editMode.experience[exp.id] ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="text-red-600 hover:bg-red-50 rounded-lg p-2 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg">
                                    <Code2 className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                                    <p className="text-sm text-gray-500">projects: {"{"} id, title, description, technologies, startDate, endDate, link, github {"}"}</p>
                                </div>
                            </div>
                            <button
                                onClick={addProject}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium"
                            >
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </div>

                        <div className="space-y-4">
                            {userData.projects.map((proj) => (
                                <div key={proj.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1 space-y-4">
                                            {editMode.projects[proj.id] ? (
                                                <>
                                                    <InputField
                                                        label="title"
                                                        value={proj.title}
                                                        onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                                                        placeholder="Project Name"
                                                    />
                                                    <TextAreaField
                                                        label="description"
                                                        value={proj.description}
                                                        onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                                                        placeholder="Project description"
                                                        rows={3}
                                                    />
                                                    <InputField
                                                        label="technologies (comma separated)"
                                                        value={proj.technologies.join(', ')}
                                                        onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                                                        placeholder="react, node, mongodb"
                                                    />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InputField
                                                            label="startDate"
                                                            type="month"
                                                            value={proj.startDate}
                                                            onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                                                        />
                                                        <InputField
                                                            label="endDate"
                                                            type="month"
                                                            value={proj.endDate}
                                                            onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InputField
                                                            label="link"
                                                            value={proj.link}
                                                            onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                                                            placeholder="https://project-url.com"
                                                        />
                                                        <InputField
                                                            label="github"
                                                            value={proj.github}
                                                            onChange={(e) => updateProject(proj.id, 'github', e.target.value)}
                                                            placeholder="https://github.com/user/repo"
                                                        />
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded">
                                                        id: {proj.id}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <div className="text-xs font-semibold text-gray-500 mb-1">title</div>
                                                        <h3 className="text-lg font-bold text-gray-900">{proj.title}</h3>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-semibold text-gray-500 mb-1">description</div>
                                                        <p className="text-gray-700">{proj.description}</p>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-semibold text-gray-500 mb-2">technologies: string[]</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {proj.technologies.map((tech, i) => (
                                                                <span key={i} className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-medium border border-emerald-200">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span className="text-xs font-semibold text-gray-500">startDate: </span>
                                                            <span className="text-gray-700">{proj.startDate}</span>
                                                        </div>
                                                        <span className="text-gray-400">→</span>
                                                        <div>
                                                            <span className="text-xs font-semibold text-gray-500">endDate: </span>
                                                            <span className="text-gray-700">{proj.endDate}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        {proj.link && (
                                                            <a
                                                                href={proj.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                                <span className="text-xs font-semibold text-gray-500">link</span>
                                                            </a>
                                                        )}
                                                        {proj.github && (
                                                            <a
                                                                href={proj.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-700 hover:text-black flex items-center gap-1 text-sm font-medium"
                                                            >
                                                                <Github className="w-4 h-4" />
                                                                <span className="text-xs font-semibold text-gray-500">github</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400 font-mono">id: {proj.id}</div>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => toggleEdit('projects', proj.id)}
                                                className="text-blue-600 hover:bg-blue-50 rounded-lg p-2 transition"
                                            >
                                                {editMode.projects[proj.id] ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => removeProject(proj.id)}
                                                className="text-red-600 hover:bg-red-50 rounded-lg p-2 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    export default ProfileEditor;
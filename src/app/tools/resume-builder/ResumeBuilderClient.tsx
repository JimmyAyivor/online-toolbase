"use client";
import React, { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Eye,
  EyeOff,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Experience {
  id: number;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: number;
  skill: string;
}

type ExpField = keyof Omit<Experience, "id">;
type EduField = keyof Omit<Education, "id">;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

const INPUT_SM =
  "w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors";
const INPUT_LG =
  "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors";

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  onAdd: () => void;
  addLabel?: string;
}

function SectionHeader({
  icon,
  title,
  onAdd,
  addLabel = "Add",
}: SectionHeaderProps) {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h3 className='font-bold text-gray-900 flex items-center gap-2 text-xl'>
        {icon}
        {title}
      </h3>
      <button
        onClick={onAdd}
        className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors'
      >
        <Plus className='w-4 h-4' />
        {addLabel}
      </button>
    </div>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  value: string;
}

function ContactItem({ icon, value }: ContactItemProps) {
  if (!value) return null;
  return (
    <div className='flex items-center gap-1'>
      {icon}
      {value}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ResumeBuilderClient() {
  const [showPreview, setShowPreview] = useState<boolean>(true);

  // Personal info
  const [fullName, setFullName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: 1,
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([{ id: 1, skill: "" }]);

  // ─── Experience handlers ──────────────────────────────────────────────────

  const addExperience = (): void =>
    setExperiences((prev) => [
      ...prev,
      {
        id: Date.now(),
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);

  const removeExperience = (id: number): void =>
    setExperiences((prev) => prev.filter((e) => e.id !== id));

  const updateExperience = (
    id: number,
    field: ExpField,
    value: string | boolean,
  ): void =>
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );

  // ─── Education handlers ───────────────────────────────────────────────────

  const addEducation = (): void =>
    setEducation((prev) => [
      ...prev,
      {
        id: Date.now(),
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);

  const removeEducation = (id: number): void =>
    setEducation((prev) => prev.filter((e) => e.id !== id));

  const updateEducation = (id: number, field: EduField, value: string): void =>
    setEducation((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );

  // ─── Skill handlers ───────────────────────────────────────────────────────

  const addSkill = (): void =>
    setSkills((prev) => [...prev, { id: Date.now(), skill: "" }]);
  const removeSkill = (id: number): void =>
    setSkills((prev) => prev.filter((s) => s.id !== id));
  const updateSkill = (id: number, value: string): void =>
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, skill: value } : s)),
    );

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8 print:hidden'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
            <FileText className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Resume Builder
          </h2>
          <p className='text-gray-600'>
            Create a professional resume in minutes
          </p>
        </div>

        <div className='flex justify-end gap-4 mb-6 print:hidden'>
          <button
            onClick={() => setShowPreview((v) => !v)}
            className='flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors shadow-lg'
          >
            {showPreview ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
            {showPreview ? "Hide" : "Show"} Preview
          </button>
          <button
            onClick={() => window.print()}
            className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg'
          >
            <Download className='w-5 h-5' />
            Download PDF
          </button>
        </div>

        <div className='grid lg:grid-cols-2 gap-6'>
          {/* ── Editor ── */}
          <div className='space-y-6 print:hidden'>
            {/* Personal Information */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <h3 className='font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl'>
                <User className='w-6 h-6 text-blue-600' />
                Personal Information
              </h3>
              <div className='space-y-4'>
                {[
                  {
                    label: "Full Name",
                    value: fullName,
                    set: setFullName,
                    type: "text",
                    placeholder: "John Doe",
                  },
                  {
                    label: "Professional Title",
                    value: title,
                    set: setTitle,
                    type: "text",
                    placeholder: "Senior Software Engineer",
                  },
                ].map(({ label, value, set, type, placeholder }) => (
                  <div key={label}>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      {label}
                    </label>
                    <input
                      type={type}
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        set(e.target.value)
                      }
                      placeholder={placeholder}
                      className={INPUT_LG}
                    />
                  </div>
                ))}

                <div className='grid md:grid-cols-2 gap-4'>
                  {[
                    {
                      label: "Email",
                      value: email,
                      set: setEmail,
                      type: "email",
                      placeholder: "john@example.com",
                    },
                    {
                      label: "Phone",
                      value: phone,
                      set: setPhone,
                      type: "tel",
                      placeholder: "+1 (555) 123-4567",
                    },
                    {
                      label: "Location",
                      value: location,
                      set: setLocation,
                      type: "text",
                      placeholder: "New York, NY",
                    },
                    {
                      label: "Website/Portfolio",
                      value: website,
                      set: setWebsite,
                      type: "url",
                      placeholder: "www.johndoe.com",
                    },
                  ].map(({ label, value, set, type, placeholder }) => (
                    <div key={label}>
                      <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        {label}
                      </label>
                      <input
                        type={type}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          set(e.target.value)
                        }
                        placeholder={placeholder}
                        className={INPUT_LG}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Professional Summary
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setSummary(e.target.value)
                    }
                    placeholder='Brief summary of your professional background and key achievements...'
                    className={`${INPUT_LG} resize-none`}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <SectionHeader
                icon={<Briefcase className='w-6 h-6 text-blue-600' />}
                title='Work Experience'
                onAdd={addExperience}
              />
              <div className='space-y-6'>
                {experiences.map((exp, index) => (
                  <div key={exp.id} className='p-4 bg-gray-50 rounded-xl'>
                    <div className='flex justify-between items-start mb-4'>
                      <span className='font-semibold text-gray-700'>
                        Experience {index + 1}
                      </span>
                      {experiences.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          aria-label='Remove experience'
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                    <div className='space-y-3'>
                      <input
                        type='text'
                        placeholder='Position Title'
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(exp.id, "position", e.target.value)
                        }
                        className={INPUT_SM}
                      />
                      <div className='grid md:grid-cols-2 gap-3'>
                        <input
                          type='text'
                          placeholder='Company'
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                          className={INPUT_SM}
                        />
                        <input
                          type='text'
                          placeholder='Location'
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(exp.id, "location", e.target.value)
                          }
                          className={INPUT_SM}
                        />
                      </div>
                      <div className='grid md:grid-cols-2 gap-3'>
                        <input
                          type='month'
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "startDate",
                              e.target.value,
                            )
                          }
                          className={INPUT_SM}
                        />
                        <input
                          type='month'
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          disabled={exp.current}
                          className={`${INPUT_SM} disabled:bg-gray-100`}
                        />
                      </div>
                      <label className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          checked={exp.current}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateExperience(
                              exp.id,
                              "current",
                              e.target.checked,
                            )
                          }
                          className='w-4 h-4 text-blue-600'
                        />
                        <span className='text-sm text-gray-700'>
                          Currently working here
                        </span>
                      </label>
                      <textarea
                        placeholder='Describe your responsibilities and achievements...'
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value,
                          )
                        }
                        className={`${INPUT_SM} resize-none`}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <SectionHeader
                icon={<GraduationCap className='w-6 h-6 text-blue-600' />}
                title='Education'
                onAdd={addEducation}
              />
              <div className='space-y-6'>
                {education.map((edu, index) => (
                  <div key={edu.id} className='p-4 bg-gray-50 rounded-xl'>
                    <div className='flex justify-between items-start mb-4'>
                      <span className='font-semibold text-gray-700'>
                        Education {index + 1}
                      </span>
                      {education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          aria-label='Remove education'
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                    <div className='space-y-3'>
                      <input
                        type='text'
                        placeholder='Degree / Certificate'
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                        className={INPUT_SM}
                      />
                      <div className='grid md:grid-cols-2 gap-3'>
                        <input
                          type='text'
                          placeholder='School / University'
                          value={edu.school}
                          onChange={(e) =>
                            updateEducation(edu.id, "school", e.target.value)
                          }
                          className={INPUT_SM}
                        />
                        <input
                          type='text'
                          placeholder='Location'
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(edu.id, "location", e.target.value)
                          }
                          className={INPUT_SM}
                        />
                      </div>
                      <div className='grid md:grid-cols-2 gap-3'>
                        <input
                          type='month'
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "startDate", e.target.value)
                          }
                          className={INPUT_SM}
                        />
                        <input
                          type='month'
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "endDate", e.target.value)
                          }
                          className={INPUT_SM}
                        />
                      </div>
                      <textarea
                        placeholder='Additional details (GPA, honors, relevant coursework...)'
                        value={edu.description}
                        onChange={(e) =>
                          updateEducation(edu.id, "description", e.target.value)
                        }
                        className={`${INPUT_SM} resize-none`}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className='bg-white rounded-2xl shadow-xl p-6 md:p-8'>
              <SectionHeader
                icon={<Award className='w-6 h-6 text-blue-600' />}
                title='Skills'
                onAdd={addSkill}
              />
              <div className='grid md:grid-cols-2 gap-3'>
                {skills.map((s) => (
                  <div key={s.id} className='flex gap-2'>
                    <input
                      type='text'
                      placeholder='Enter a skill'
                      value={s.skill}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateSkill(s.id, e.target.value)
                      }
                      className={`flex-1 ${INPUT_SM}`}
                    />
                    {skills.length > 1 && (
                      <button
                        onClick={() => removeSkill(s.id)}
                        aria-label='Remove skill'
                        className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Preview ── */}
          {showPreview && (
            <div className='lg:sticky lg:top-8 h-fit'>
              <div
                className='bg-white rounded-2xl shadow-2xl p-8 md:p-12'
                id='resume-preview'
              >
                {/* Header */}
                <div className='text-center mb-8 border-b-4 border-blue-600 pb-6'>
                  <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                    {fullName || "Your Name"}
                  </h1>
                  {title && (
                    <p className='text-xl text-blue-600 font-semibold mb-4'>
                      {title}
                    </p>
                  )}
                  <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-600'>
                    <ContactItem
                      icon={<Mail className='w-4 h-4' />}
                      value={email}
                    />
                    <ContactItem
                      icon={<Phone className='w-4 h-4' />}
                      value={phone}
                    />
                    <ContactItem
                      icon={<MapPin className='w-4 h-4' />}
                      value={location}
                    />
                    <ContactItem
                      icon={<Globe className='w-4 h-4' />}
                      value={website}
                    />
                  </div>
                </div>

                {/* Summary */}
                {summary && (
                  <div className='mb-8'>
                    <h2 className='text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide'>
                      Professional Summary
                    </h2>
                    <p className='text-gray-700 leading-relaxed'>{summary}</p>
                  </div>
                )}

                {/* Experience */}
                {experiences.some((e) => e.position) && (
                  <div className='mb-8'>
                    <h2 className='text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide'>
                      Work Experience
                    </h2>
                    <div className='space-y-4'>
                      {experiences
                        .filter((e) => e.position)
                        .map((exp) => (
                          <div key={exp.id}>
                            <div className='flex justify-between items-start mb-1'>
                              <div>
                                <h3 className='text-lg font-bold text-gray-900'>
                                  {exp.position}
                                </h3>
                                <p className='text-blue-600 font-semibold'>
                                  {exp.company}
                                  {exp.location && `, ${exp.location}`}
                                </p>
                              </div>
                              <p className='text-sm text-gray-600'>
                                {fmtDate(exp.startDate)}
                                {" – "}
                                {exp.current ? "Present" : fmtDate(exp.endDate)}
                              </p>
                            </div>
                            {exp.description && (
                              <p className='text-gray-700 text-sm mt-2 whitespace-pre-line'>
                                {exp.description}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {education.some((e) => e.degree) && (
                  <div className='mb-8'>
                    <h2 className='text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide'>
                      Education
                    </h2>
                    <div className='space-y-4'>
                      {education
                        .filter((e) => e.degree)
                        .map((edu) => (
                          <div key={edu.id}>
                            <div className='flex justify-between items-start mb-1'>
                              <div>
                                <h3 className='text-lg font-bold text-gray-900'>
                                  {edu.degree}
                                </h3>
                                <p className='text-blue-600 font-semibold'>
                                  {edu.school}
                                  {edu.location && `, ${edu.location}`}
                                </p>
                              </div>
                              <p className='text-sm text-gray-600'>
                                {fmtDate(edu.startDate)}
                                {edu.endDate && ` – ${fmtDate(edu.endDate)}`}
                              </p>
                            </div>
                            {edu.description && (
                              <p className='text-gray-700 text-sm mt-2'>
                                {edu.description}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {skills.some((s) => s.skill) && (
                  <div>
                    <h2 className='text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide'>
                      Skills
                    </h2>
                    <div className='flex flex-wrap gap-2'>
                      {skills
                        .filter((s) => s.skill)
                        .map((s) => (
                          <span
                            key={s.id}
                            className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium'
                          >
                            {s.skill}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

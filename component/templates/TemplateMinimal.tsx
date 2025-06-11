// MinimalTemplate.tsx
'use client'
import React from 'react';



type Project = {
  name: string;
  description: string;
  link?: string;
  image?: string; // URL for dummy image
};

type Skill = {
  name: string;
  level?: string; // e.g. Beginner, Intermediate, Expert
};

type ContactInfo = {
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
};

type PortfolioTemplateProps = {
  title: string;       // Person’s name or portfolio title
  bio: string;         // Short intro or about me
  projects: Project[];
  skills: Skill[];
  contact: ContactInfo;
  template: string;
};


export default function MinimalTemplate({ title, bio, projects, skills, contact }: PortfolioTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-md mt-2 text-gray-600 whitespace-pre-line">{bio}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Projects</h2>
        <ul className="space-y-6">
          {projects.map((proj, idx) => (
            <li key={idx} className="border-b pb-4">
              <h3 className="text-xl font-medium">{proj.name}</h3>
              <p className="text-sm text-gray-600">{proj.description}</p>
              {proj.link && (
                <a href={proj.link} className="text-blue-600 text-sm" target="_blank" rel="noreferrer">
                  Visit
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Skills</h2>
        <ul className="flex flex-wrap gap-4">
          {skills.map((skill, idx) => (
            <li key={idx} className="text-sm px-3 py-1 border rounded">
              {skill.name}{skill.level ? ` (${skill.level})` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Contact</h2>
        <ul className="text-sm space-y-2">
          {contact.email && <li>Email: <a href={`mailto:${contact.email}`} className="text-blue-600">{contact.email}</a></li>}
          {contact.phone && <li>Phone: {contact.phone}</li>}
          {contact.website && <li>Website: <a href={contact.website} className="text-blue-600" target="_blank" rel="noreferrer">{contact.website}</a></li>}
          {contact.linkedin && <li>LinkedIn: <a href={contact.linkedin} className="text-blue-600" target="_blank" rel="noreferrer">{contact.linkedin}</a></li>}
          {contact.github && <li>GitHub: <a href={contact.github} className="text-blue-600" target="_blank" rel="noreferrer">{contact.github}</a></li>}
        </ul>
      </section>
    </div>
  );
}

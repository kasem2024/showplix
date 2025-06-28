'use client'
import { motion } from 'framer-motion';
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
 type?:string,
 value?:string,
 link?:string
};

type PortfolioTemplateProps = {
  title: string;       // Person’s name or portfolio title
  bio: string;         // Short intro or about me
  projects: Project[];
  skills: Skill[];
  contacts: ContactInfo[];
  template: string;
};


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ModernTemplate({ title, bio, projects, skills, contacts }: PortfolioTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 text-gray-900 px-6 py-10">
      <motion.header className="text-center mb-12" variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-5xl font-extrabold mb-3 tracking-tight">{title}</h1>
        <p className="text-lg text-gray-600 whitespace-pre-line">{bio}</p>
      </motion.header>

      <motion.section className="mb-14" variants={fadeUp} initial="hidden" animate="visible">
        <h2 className="text-3xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div key={idx} className="bg-white rounded-xl shadow-lg p-5" whileHover={{ scale: 1.03 }}>
              <img src={project.image} alt={project.name} className="rounded-md h-40 w-full object-cover mb-4" />
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-sm text-gray-700 mb-2">{project.description}</p>
              {project.link && (
                <a href={project.link} className="text-indigo-600 hover:underline text-sm" target="_blank">Learn more</a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="mb-14" variants={fadeUp} initial="hidden" animate="visible">
        <h2 className="text-3xl font-semibold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
              {skill.name}{skill.level ? ` (${skill.level})` : ''}
            </span>
          ))}
        </div>
      </motion.section>

      <motion.section variants={fadeUp} initial="hidden" animate="visible">
        <h2 className="text-3xl font-semibold mb-6">Get In Touch</h2>
        <ul className="space-y-4 text-lg w-full text-center">
          {
            contacts.map((contact , i)=>{
              if(contact.type === "email")
                    return(
                      <li>
                          {contact.type}:{' '}
                          <a href={`mailto:${contact.value}`} className="underline hover:text-indigo-300">
                            {contact.value}
                          </a>
                        </li>
                    )
              return (
                 <li>
                      {contact.type}:{' '}
                      <a href={`${contact.link}`} className="underline hover:text-indigo-300">
                        {contact.value}
                      </a>
                    </li>
              )
            })
          }
        </ul>
      </motion.section>
    </div>
  );
}
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
  icon?: string; // e.g. Beginner, Intermediate, Expert
};

type ContactInfo = {
 type:string;
 value:string;
 link:string
};

type PortfolioTemplateProps = {
  title: string;       // Person’s name or portfolio title
  bio: string;         // Short intro or about me
  projects: Project[];
  skills: Skill[];
  contacts: ContactInfo[];
  template: string;
};


export default function MinimalTemplate({ title, bio, projects, skills, contacts }: PortfolioTemplateProps) {
  console.log("sdfsfssdfs",contacts[0]?.type)
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-md mt-2 text-gray-600 whitespace-pre-line">{bio}</p>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Projects</h2>
        <ul className="space-y-6">
          {projects?.map((proj, idx) => (
            <li key={idx} className="border-b pb-4">
              <h3 className="text-xl font-medium">{proj?.name}</h3>
              <p className="text-sm text-gray-600">{proj?.description}</p>
              {proj?.link && (
                <a href={proj?.link} className="text-blue-600 text-sm" target="_blank" rel="noreferrer">
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
            {skills?.map((skill, i) => (
            <li
              key={i}
              className="bg-black text-white px-5 py-2 rounded-full font-semibold shadow-lg cursor-default select-none"
              title={skill?.icon}
            >
             
             
             <div className='flex items-center justify-center gap-x-3'>
              <p> {skill?.name}</p>
               <img  className=' w-[30px] h-[30px] rounded-full' src={`/skills/${skill?.icon}`} alt="" />
             </div>
            </li>

          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Contact</h2>
       <ul className="space-y-4 text-lg w-full text-center">
          {
            contacts?.map((contact , i)=>{
              if(contact?.type === "email")
                    return(
                      <li key={i}>
                          {contact?.type}:{' '}
                          <a href={`mailto:${contact?.value}`} className="underline hover:text-indigo-300">
                            {contact?.value}
                          </a>
                        </li>
                    )
              return (
                 <li key={i}>
                      {contact?.type}:{' '}
                      <a href={`${contact?.link}`} className="underline hover:text-indigo-300">
                        {contact?.value}
                      </a>
                    </li>
              )
            })
          }
        </ul>
      </section>
    </div>
  );
}

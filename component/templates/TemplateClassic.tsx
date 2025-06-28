'use client'
import { motion } from 'framer-motion';

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

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 },
  }),
};

export default function PortfolioTemplate({
  title,
  bio,
  projects,
  skills,
  contacts,

}: PortfolioTemplateProps) {

  console.log(contacts[0].type)
return (

  
  <div className={` w-screen `}>
    
    {/* Hero Section */}
    <motion.section
      className="hero-section w-screen h-[90vh] flex  justify-center  items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 text-center"
      initial="hidden"
      animate="visible"
      custom={0}
      variants={sectionVariants}
    >
      {/* Inner wrapper to constrain width and center content */}
      <div className="flex flex-col justify-center items-center  mx-auto    max-w-5xl">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">{title}</h1>
        <p className="text-xl whitespace-pre-line drop-shadow-md">{bio}</p>
        <img
          src="https://images.unsplash.com/photo-1503945438517-f65904a52ce6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero dummy"
          className="mt-8 rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </motion.section>

    {/* Projects Section */}
    <motion.section
      className="projects-section w-screen h-[80vh] flex flex-col justify-center items-center bg-gray-50 px-10 py-6"
      initial="hidden"
      animate="visible"
      custom={1}
      variants={sectionVariants}
    >
      <div className="max-w-5xl w-full flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold mb-6 text-center border-b pb-3 max-w-xl mx-auto">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6 w-full overflow-y-auto max-h-[50vh]">
          {projects?.map((project, i) => (
            <div
              key={i}
              className="border rounded-lg p-5 shadow hover:shadow-xl transition flex flex-col"
            >
              <img
                src={project.image }
                alt={project.name}
                className="rounded mb-3 object-cover w-full h-28"
              />
              <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
              <p className="mb-3 flex-grow">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-auto"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>

    {/* Skills Section */}
    <motion.section
      className="skills-section w-screen h-[40vh] flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 to-gray-300 px-6"
      initial="hidden"
      animate="visible"
      custom={2}
      variants={sectionVariants}
    >
      <div className="max-w-3xl w-full flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold mb-6 border-b pb-3 w-full text-center">Skills</h2>
        <ul className="flex flex-wrap justify-center gap-6">
          {skills?.map((skill, i) => (
            <li
              key={i}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg cursor-default select-none"
              title={skill.level}
            >
              {skill.name}
              {skill.level && ` (${skill.level})`}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>

    {/* Contact Section */}
    <motion.section
      className="contact-section w-screen h-[40vh] flex flex-col justify-center items-center bg-gradient-to-r from-purple-700 to-indigo-900 text-white px-6"
      initial="hidden"
      animate="visible"
      custom={3}
      variants={sectionVariants}
    >
      <div className="max-w-md w-full flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold mb-6 border-b border-white pb-3 w-full text-center">Contact</h2>
         <ul className="space-y-4 text-lg w-full text-center">
          {
            contacts.map((contact , i)=>{
              if(contact.type === "Email")
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
      </div>
    </motion.section>
  </div>
);

}


// contacts[0]?.type && (
//             <li>
//               Email:{' '}
//               <a href={`mailto:${contacts[0].value}`} className="underline hover:text-indigo-300">
//                 {contacts[0].value}
//               </a>
//             </li>
//           )}
//           {contacts[0]?.type && <li>Phone: {contacts[0].value}</li>}
//           {contacts[0]?.type && (
//             <li>
//               Website:{' '}
//               <a
//                 href={contacts[0].value}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline hover:text-indigo-300"
//               >
//                 {contacts[0].value}
//               </a>
//             </li>
//           )}
//           {contacts[0]?.type && (
//             <li>
//               LinkedIn:{' '}
//               <a
//                 href={contacts[0].value}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline hover:text-indigo-300"
//               >
//                 {contacts[0].value}
//               </a>
//             </li>
//           )}
//           {contacts[0]?.type && (
//             <li>
//               GitHub:{' '}
//               <a
//                 href={contacts[0].value}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline hover:text-indigo-300"
//               >
//                 {contacts[0].value}
//               </a>
//             </li>
//           )

import { templates } from '@/component/templates';
import { apiClient } from '@/lib/apiClient';

interface Props {
  params: {
    username: string;
    portfolioId: string;
  };
}
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

interface PortfolioData {
  template: string;
  title: string;
  bio: string;
  projects: Project[]; // Replace 'any' with a proper project type if available
  skills: Skill[];
  contacts: ContactInfo[];
}
export default async  function Page({ params }:Props ) {

  const {username , portfolioId} = params
  const {data:{result}} = await apiClient.get<{ result: PortfolioData[] }>( `/api/portfolio/${username}/${portfolioId}`)
  console.log(result)
  if (!result) return <div>404</div>;
  console.log(result[0] , "herer eerererer")
  const TemplateComponent = templates["classic"]; 

  return <TemplateComponent 
  template={result[0]?.template}
   title={result[0]?.title} 
   bio={result[0]?.bio}
    projects={result[0]?.projects} 
    skills={result[0]?.skills}
     contacts={result[0]?.contacts}  />;

}

import { templates } from '@/component/templates';

interface Props {
  params: {
    username: string;
    portfolioId: string;
  };
}

export default async function Page({ params }:Props ) {
  const {username , portfolioId} = params
  
  const res = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/${username}/${portfolioId}`, {
    method:"GET"
  })
  const { result} = await res.json()

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
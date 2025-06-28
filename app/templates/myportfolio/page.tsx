'use client'
import PortfolioCard, { Portfolio } from "@/components/portfolioCard";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PortfolioList() {
  const [portfolios , setPortFolios]  = useState<Portfolio[]>([])
  const [userName , setUserName]  = useState('');
  const router = useRouter()
  // return Login User 
   useEffect(() => {
        const fetchUser = async () => {
          const res = await fetch('/api/auth/loginuser');
          if (res.ok) {
            const data = await res.json();
            setUserName(data.user.username)
       
          }else{
            router.push("/login")
          }
        };
        fetchUser();
      }, []);
 // return Portfolios For The Login User
  useEffect(()=>{
    const  fetchPortfolios = async()=>{
      const res =await fetch(`/api/portfolio/${userName}`);
          if(res.ok){
            const data = await res.json()
            console.log(data)
            setPortFolios(data.result)
          }
    }
    if(userName){
      fetchPortfolios()
    }
  },[userName])
  const handleDelete = async (id:string)=>{
   console.log("delete" ,  id);
   try{
   const res =  await fetch('/api/portfolio',{
      method:"DELETE",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({id})
    })
    if(res.ok){
       setPortFolios((prev) => prev.filter((portfolio) => portfolio.id !== id));
    }
   }catch(err){
    console.error("error" , err)
   }
  }

 if(portfolios.length === 0 ){
  return (
    
  <div className="w-screen h-screen grid place-items-center">
      <p className="p-2 text-lg lg:text-xl xl:text-2xl text-neutral-700 font-bold">
      No portfolios found. Start creating your first one!
    </p>
    <Link className="absolute top-[30vh]" href={'/templates'}>
        <div  className=" w-[300px] h-[100px] mx-auto  rounded-lg flex justify-center items-center bg-gray-200  hover:bg-gray-300">
      <PlusIcon size={40}/>
    </div></Link>
  </div>
  )
 }
  return (
   <div>
     <div className="grid p-6 md:w-auto w-screen  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {portfolios?.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          id={portfolio.id}
          title={portfolio.title}
          createdAt={portfolio.createdAt}
          username={userName}
          handleDelete={handleDelete}
   
        />
      ))}
    </div>
   {portfolios.length > 0 &&  <Link href={'/templates'}>
        <div  className="w-[300px] h-[100px] mx-auto  rounded-lg flex justify-center items-center bg-gray-200  hover:bg-gray-300">
      <PlusIcon size={40}/>
    </div></Link>}
   </div>
  );
}

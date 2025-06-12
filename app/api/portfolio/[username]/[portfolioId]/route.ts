
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

///   GET A Specific Portfolio For A Specific Public User

export async function GET(req:NextRequest , {params}:{params:{username:string, portfolioId:string}}){

try{
  const {username , portfolioId} = params
  const user = await prisma.user.findUnique({
      where:{username},
      include:{portfolios: {
        where: { id: portfolioId },
      },}
  })
   if(user){
     return NextResponse.json({status:true , result:user?.portfolios})
   }
   if(!user){
    return NextResponse.json({status:404 , messge:'Not found'})
   }
}catch(error){
   return NextResponse.json({status:500 ,  message:"internal server error"})
  }
}
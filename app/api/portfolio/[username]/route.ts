
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

///   get the portfolio for the public user

export async  function GET(req:NextRequest , {params}:{params:{username:string}}){

try{
  const username = params.username
  const user = await prisma.user.findUnique({
      where:{username},
      include:{portfolio:true}
  })
   if(user){
     return NextResponse.json({status:true , result:user?.portfolio})
   }
   if(!user){
    return NextResponse.json({status:404 , messge:'Not found'})
   }
}catch(error){
   return NextResponse.json({status:500 ,  message:"internal server error"})
  }
}
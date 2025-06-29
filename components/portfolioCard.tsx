'use client'
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { format } from "date-fns";



export type Portfolio = {
  id: string;
  title: string;
  createdAt: string;
  username: string;
  handleDelete:(id:string)=>void

};

const PortfolioCard: FC<Portfolio> = ({ id, title, createdAt, username , handleDelete 

 }) => {
  return (
    <div className="bg-white rounded-2xl mx-auto shadow-md  hover:bg-gray-300 p-4 flex flex-col justify-between w-full max-w-md">
      <div className="flex items-center space-x-4 mb-4">
        <Image
          src="/next.js.jpeg"
          alt="Next.js Icon"
          width={40}
          height={40}
        />
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">
            Published on {format(new Date(createdAt), "MMMM d, yyyy")}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Link
          href={`/portfolio/${username}/${id}`}
          className="bg-purple-600 text-white px-2 py-1 rounded-xl hover:bg-purple-700 transition"
        >
          Visit
        </Link>
        <div className="flex justify-center items-center gap-x-2">
                <Link
             
          href={`/templates/update/${id}`}
          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-xl border hover:bg-gray-200 transition"
        >
          Update
        </Link>
         <button
          onClick={()=>handleDelete(id)}
          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-xl border hover:bg-red-700 transition text-black hover:text-white"
        >
          Delete
        </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;

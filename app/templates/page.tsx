import React from 'react';
import Link from 'next/link';
import { div } from 'framer-motion/client';

type TemplateNames = "classic" | "modern" | "minimal";

const templatesInfo: {
  name: TemplateNames;
  description: string;
  previewImage: string;
}[] = [
  {
    name: "classic",
    description: "A timeless, elegant layout ideal for portfolios.",
    previewImage: "https://static8.depositphotos.com/1252474/976/i/450/depositphotos_9762725-stock-photo-electric-guitar-and-the-wall.jpg",
  },
  {
    name: "modern",
    description: "A bold, stylish template with clean lines ",
    previewImage: "https://img.freepik.com/free-vector/gradient-geometric-shapes-dark-background-design_23-2148433740.jpg?semt=ais_hybrid&w=740",
  },
  {
    name: "minimal",
    description: "A simple and clean layout focused on content.",
    previewImage: "https://images.pexels.com/photos/1252814/pexels-photo-1252814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const TemplatesList = () => {
  return (
  <div>
      <div className='w-screen h-[2vh] flex juctify-center items-center pt-6 '><p className='text-neutral-800 text-md md:text-lg lg:text-xl  xl:text-2xl max-w-4xl mx-auto py-4'>Feel Free to Edit and View Demo From These List of Template</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {templatesInfo.map(({ name, description, previewImage }) => (
          <div key={name} className="rounded-2xl shadow-md overflow-hidden bg-white">
            <img src={previewImage} alt={`${name} preview`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold capitalize mb-2">{name} Template</h2>
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="flex justify-between">
                <Link href={`/livedemo/${name}`}>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    View Demo
                  </button>
                </Link>
                <Link href={`/templates/edit/${name}`}>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
  </div>
  );
};

export default TemplatesList;

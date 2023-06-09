
"use client"

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProp {
  label: string;
  icon: IconType;
  description: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProp> = ({
  label,
  icon: Icon,
  description,
  selected,
}) => {
  const router = useRouter();

  const params = useSearchParams();

  

  const handleClick = useCallback(() => {

    let currentQuery = {}

    
    //  If a param already exists parse it
    if(params) {
        currentQuery = qs.parse(params.toString())
    }


    //add the query 
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

   
    if(params?.get('category') === label) {
      delete updatedQuery.category
    }



    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, {skipNull: true})


  
    router.push(url)


  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`
            flex 
            cursor-pointer 
            flex-col
            items-center
            justify-center
            gap-2
            border-b-2
            p-3 transition
          hover:text-neutral-800
          ${selected ? 'border-b-neutral-800' : 'border-transparent'}
          ${selected ? 'text-neutral-800' : 'text-neutral-500'}
          `}
    >
      <Icon size={26} />

      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;

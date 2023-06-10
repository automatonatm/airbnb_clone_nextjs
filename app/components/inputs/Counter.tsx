'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  //Add the value
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  //Reduce the value
  const onReduce = useCallback(() => {
    //Make sure value does not exceed min value
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">

      {/* Label */}
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>

      {/* Buttons */}
      <div className="items-center flex  flex-row gap-4">
        {/* Reduce Button */}
        <div
          onClick={onReduce}
          className="
         flex
         h-10
         w-10
         cursor-pointer
         items-center
         justify-center
         rounded-full
         border-[1px]
         border-neutral-400
         text-neutral-600
         transition
         hover:opacity-80
        "
        >
          <AiOutlineMinus />
        </div>

        <div className="text-xl font-light text-neutral-600">{value}</div>

        {/* Add Button */}
        <div
          onClick={onAdd}
          className="
         flex
         h-10
         w-10
         cursor-pointer
         items-center
         justify-center
         rounded-full
         border-[1px]
         border-neutral-400
         text-neutral-600
         transition
         hover:opacity-80
        "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;

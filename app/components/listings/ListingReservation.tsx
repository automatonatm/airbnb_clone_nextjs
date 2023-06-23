'use client';

import { Range } from 'react-date-range';
import Calender from '../inputs/Calender';
import Botton from '../Button';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabledDates: Date[];
  dateRange: Range;
  disabled?: boolean;
}

export const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onSubmit,
  onChangeDate,
  dateRange,
  disabledDates,
  disabled,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">

      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>

      <hr />

      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />
      <div className="p-4">
        <Botton 
          label="Reserve"
          disable={disabled}
          onClick={onSubmit}
         
        />
      </div>
      <div
        className="
      flex 
      flex-row 
      items-center
       justify-between
       p-4
       text-lg
       font-semibold
       "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

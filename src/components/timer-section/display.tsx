type DisplayProps = {
  label: 'Days' | 'Hours' | 'Minutes' | 'Seconds';
  value: number;
  isLast?: boolean;
};

export function Display({ label, value, isLast }: DisplayProps) {
  const [first, second] = String(value).padStart(2, '0').split('');

  return (
    <div>
      <div className='flex text-white items-center text-xl xxs:text-2xl font-pixel font-bold'>
        <div className='py-3 pl-1.5 pr-1 xxs:pl-1.75 xxs:pr-1.25 leading-none sm:px-3 sm:pr-2.5 sm:py-6 mr-2 inline-block bg-[#33314b]'>
          {first}
        </div>

        <div className='py-3 pl-1.5 pr-1 xxs:pl-1.75 xxs:pr-1.25 leading-none sm:px-3 sm:pr-2.5 sm:py-6 inline-block bg-[#33314b]'>
          {second}
        </div>

        {!isLast && (
          <span className='mx-2 pl-0.5 sm:mx-3 text-white'>
            :
          </span>
        )}
      </div>

      <span className='text-white mt-2 block text-xs xxs:text-base sm:text-sm'>
        {label}
      </span>
    </div>
  );
}

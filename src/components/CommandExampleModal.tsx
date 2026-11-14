import { useTranslation } from 'next-i18next/pages';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Command } from '../services/api/api.types';

type CommandExampleProps = {
  command?: Command;
  showing: boolean;
  setOpen: Dispatch<
    SetStateAction<{
      show: boolean;
      command?: Command;
    }>
  >;
};

const CommandExampleModal = ({ command, setOpen, showing }: CommandExampleProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isOutside = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen({ show: false });
    };

    document.addEventListener('mousedown', isOutside);

    return () => {
      document.removeEventListener('mousedown', isOutside);
    };
  }, [setOpen]);

  const { t } = useTranslation('commands');

  if (!command || !showing) return <></>;

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden w-full overflow-y-auto fixed inset-0 z-50 bg-opacity-70 bg-black outline-none focus:outline-none'>
        <div ref={ref} className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#171717] outline-none focus:outline-none'>
            <div className='flex flex-row justify-between p-5 rounded-t'>
              <h3 className='text-3xl pt-3 font-semibold text-white'>
                {t('modal.command')}{' '}
                <span className='text-primary capitalize font-bold'>{command.name}</span>
              </h3>{' '}
              <span
                className='h-3 w-3 cursor-pointer text-xl text-white hover:text-neutral-500 fill-current'
                onClick={() => setOpen({ show: false })}
              >
                x
              </span>
            </div>
            <div className='px-6 flex-1'>
              {command.options.length > 0 && (
                <h3 className='text-white py-5 text-2xl'>{t('modal.command-options')}</h3>
              )}
              {command.options.map((option) => (
                <div
                  key={`{${command.name}-${option.name}-modal`}
                  className='text-describe mb-3 text-lg leading-relaxed border-separate border-b border-gray-400 last:border-none'
                >
                  <span className='text-white capitalize'> {option.name} - </span>{' '}
                  {option.description}
                </div>
              ))}
              <Image
                key={command.originalName}
                src={`/examples/${command.category}/${command.originalName.replaceAll(
                  ' ',
                  '_',
                )}.gif`}
                width={command.dimensions.width}
                height={command.dimensions.height}
                placeholder='blur'
                blurDataURL='/examples/example_placeholder.png'
                alt={`Exemplo de execução do comando ${command.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommandExampleModal;

import { useState, useMemo, useEffect, ChangeEvent } from 'react';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Command } from '../services/api/api.types';
import { SectionDivider } from '../components/common/SectionDivider';
import { Button } from '../components/common/Button';
import { SearchInput } from '../components/common/SearchInput';

import { getCommands } from '../services/api/command';
import CommandExampleModal from '../components/CommandExampleModal';
import Layout from '../components/PageLayout';

type Props = {
  commands: Command[];
  locale: string;
};

const CommandPage = ({ commands }: Props): JSX.Element => {
  const router = useRouter();

  const categories = useMemo(() => {
    const categories = new Set<string>();
    commands.forEach((cmd) => categories.add(cmd.category));
    return [...categories].sort();
  }, [commands]);

  const [selectedCategory, setCategory] = useState(categories[0]);
  const [searchInput, setSearchInput] = useState('');
  const [showingModal, setShowingModal] = useState<{ show: boolean; command?: Command }>({
    show: false,
  });

  useEffect(() => {
    if (router && router.query) {
      const foundedCategory = categories.find((a) => a === router.query?.category);

      if (foundedCategory) setCategory(foundedCategory);

      if (router.query?.command) {
        const foundedCommand = commands.find((a) => a.originalName === router.query.command);

        if (foundedCommand) {
          setShowingModal({ show: true, command: foundedCommand });
          setCategory(foundedCommand.category);
        }
      }
    }
  }, [router, categories, commands]);

  const filteredCommands = useMemo(() => {
    if (searchInput.length > 0)
      return commands.filter(
        (cmd) =>
          cmd.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          cmd.nameLocalizations?.['en-US'].toLowerCase().includes(searchInput.toLowerCase()),
      );

    const categoryCmds = commands.filter((cmd) => cmd.category === selectedCategory);
    return categoryCmds.sort((a, b) => a.name.localeCompare(b.name));
  }, [selectedCategory, commands, searchInput]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const { t } = useTranslation('commands');
  return (
    <Layout page='commands'>
      <main className='mx-auto max-w-7xl px-6'>
        <SectionDivider title={t('commands')} withoutSpace className='my-6' />
        <h1 className='text-white font-bold text-3xl md:text-4xl mb-3'>
          {t('title')}
          <span className='text-primary'>{' >~<'}</span>
        </h1>
        <p className='text-describe text-xl'>{t('description')}</p>
        {commands.length > 0 ? (
          <div className='md:flex flex-row justify-between gap-10 md:mt-10'>
            <ul className='bg-secondary-bg rounded-2xl py-11 px-4 mb-6 flex flex-col gap-6 w-full mt-4 md:mt-0 md:max-w-xs'>
              <li key={'categories-title'} className='text-white'>
                <h2 className='text-white font-bold text-2xl md:text-4xl'>
                  {t('categories.title')}
                </h2>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Button
                    className='w-full text-start'
                    variant={
                      selectedCategory === category && !searchInput ? 'primary' : 'secondary'
                    }
                    onClick={() => {
                      setCategory(category);
                      setSearchInput('');
                    }}
                  >
                    {t(`categories.${category as 'fun'}`)}
                  </Button>
                </li>
              ))}
            </ul>
            <div
              id='table'
              className='bg-secondary-bg rounded-2xl py-11 px-4 mb-6 flex-1 select-none'
            >
              <div className='md:flex flex-row-reverse justify-between items-center'>
                <SearchInput
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder={t('search')}
                />
                <h2 className='text-white font-bold text-3xl md:text-4xl my-6'>
                  {searchInput
                    ? t('by-search', { input: searchInput })
                    : t('by-category', { category: t(`categories.${selectedCategory as 'fun'}`) })}
                </h2>
              </div>
              <ul className='overflow-auto h-full max-h-96 w-full'>
                <CommandExampleModal
                  command={showingModal.command}
                  showing={showingModal.show}
                  setOpen={setShowingModal}
                />
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <li
                      key={cmd.name.replaceAll(' ', '-')}
                      onClick={() => setShowingModal({ show: true, command: cmd })}
                      className='border-b-2 cursor-help border-b-separate-color py-6 px-1'
                    >
                      <span className='text-primary text-lg font-bold capitalize underline'>
                        {cmd.name}
                      </span>
                      <p className='text-describe my-4'>{cmd.description}</p>
                      <span className='text-describe space-x-2'>
                        <span>/{cmd.name}</span>
                        {cmd.options.map((op) => (
                          <div
                            key={`${cmd.name}-${op.name}`}
                            className='hover:text-primary inline-block relative cursor-pointer group'
                          >
                            {op.required ? `<${op.name}>` : `[${op.name}]`}
                            <span className='text-describe w-fit md:w-max text-xs -ml-12 hidden text-center py-2 px-3 absolute z-50 rounded-xl bg-stone-900 borderrounded group-hover:block'>
                              {op.description}
                            </span>
                          </div>
                        ))}
                      </span>
                    </li>
                  ))
                ) : (
                  <li
                    key={'empty'}
                    className='flex flex-col border-b-2 border-b-separate-color pb-6 px-1'
                  >
                    <span className='text-primary text-lg font-bold'>
                      {t('unknown', { input: searchInput })}
                    </span>
                    <Button
                      className='text-start w-fit mt-5'
                      variant={'primary'}
                      onClick={() => setSearchInput('')}
                    >
                      {t('clear')}
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className='bg-secondary-bg rounded-2xl my-11 py-11 px-4 mb-6 flex-1'>
            <p className='text-describe text-xl'>{t('missing-commands-data')}</p>
          </div>
        )}
      </main>
    </Layout>
  );
};

const TWO_DAYS_IN_SECONDS = 3600 * 48;

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const commands = await getCommands(locale as string);

  return {
    props: {
      locale: locale as string,
      commands,
      ...(await serverSideTranslations(locale as string, ['commands', 'header', 'footer'])),
    },
    revalidate: TWO_DAYS_IN_SECONDS,
  };
};

export default CommandPage;

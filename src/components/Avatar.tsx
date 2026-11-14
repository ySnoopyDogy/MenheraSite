import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className='flex items-center justify-center overflow-hidden bg-gray-200 rounded-full'>
      <Image src={src} alt={alt ?? ''} width={64} height={64} />
    </div>
  );
};

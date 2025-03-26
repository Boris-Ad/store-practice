import { DataPlaceholderImage } from '@/types';
import { getPlaiceholder } from 'plaiceholder';
import { unstable_cacheTag } from 'next/cache';

export const getImage = async (src: string) => {
  'use cache';
  unstable_cacheTag('image-' + src);
  const buffer = await fetch(src).then(async res => Buffer.from(await res.arrayBuffer()));
  const {
    metadata: { height, width },
    ...data
  } = await getPlaiceholder(buffer);

  return { img: { src, height, width }, ...data };
};

export const getImages = async (srcArr: string[]) => {
  'use cache';
  const images: DataPlaceholderImage[] = [];
  for (const i of srcArr) {
    unstable_cacheTag('image-' + srcArr);
    const buffer = await fetch(i).then(async res => Buffer.from(await res.arrayBuffer()));
    const {
      metadata: { height, width },
      base64,
    } = await getPlaiceholder(buffer);
    images.push({ img: { src: i, width, height }, base64 });
  }
  return images;
};

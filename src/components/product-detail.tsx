import { ProductDetailType } from '@/types';
import React from 'react'
import { Typography } from './ui/typography';
import Link from 'next/link';

export default function ProductDetail({ icon, title, desc, url }: ProductDetailType) {
    const Icon = () => icon;
  return (
    <div className="flex gap-3 flex-1">
      <Icon />
      <div>
        <Typography>{title}</Typography>
        {url ? (
          <Link href={url}>
            <Typography size="sm" className="text-primary">
              {desc}
            </Typography>
          </Link>
        ) : (
          <Typography size="sm" variant="paragraph">
            {desc}
          </Typography>
        )}
      </div>
    </div>
  )
}

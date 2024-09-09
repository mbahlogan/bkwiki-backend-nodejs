import React from 'react'
import { Typography } from './ui/typography'
import { FieldsetType } from '@/types'

export default function TabInfoContainer(props: FieldsetType) {
  return (
    <div className="p-5 bg-[#FAFAFA]">
    {props.title && <Typography className="pb-5" size="mid">
      {props.title}
    </Typography>}

    <div>
        {props.children}
    </div>
  </div>
  )
}

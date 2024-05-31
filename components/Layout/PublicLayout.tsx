'use client'

import { Fragment } from 'react'
import { Drawer } from 'vaul'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <div
        className={`relative mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center bg-white px-4  pt-28 font-sans lg:pt-24 ${
          process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
        }`}
      >
        {children}
      </div>
    </Fragment>
  )
}

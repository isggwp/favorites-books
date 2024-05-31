import Image from 'next/image'
import { MaterialSymbolsMenu } from './icon'
export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-[110] h-auto w-full border-b-[1.4px] border-slate-50 bg-white/85 shadow-sm backdrop-blur-sm">
      <div className="z-100  relative mx-auto h-20 w-full ">
        <div className="absolute h-full  w-full">
          <div className="lg:items-between mx-auto flex h-full  w-full max-w-[1400px] flex-row items-center justify-between space-x-5 px-5 ">
            <section className="z-100 group flex w-6/12 cursor-pointer flex-row items-center md:w-2/12">
              <h1 className="pl-3 font-sans text-base font-bold italic">
                Crud
              </h1>
            </section>

            <section className="mx-auto hidden w-8/12 items-center justify-center gap-3 md:flex"></section>

            <section className="relative flex h-20 w-auto flex-row items-center justify-center ">
              <div className="items-center justify-end">
                {/* IMAGE */}
                <MaterialSymbolsMenu className="h-6 w-6" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </header>
  )
}

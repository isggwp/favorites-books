import React, { Fragment, useState, useEffect } from 'react'
import Header from '@/components/common/Header'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { DeleteDialog } from '@/components/common/DeleteDialog'

import { useDispatch, useSelector } from 'react-redux'
import { useGetUsersQuery } from '@/lib/redux/service/usersApi'
import { RootState } from '@/lib/redux/store'
import { setStreamUsers } from '@/lib/redux/slices/usersSlice'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  MaterialAddIcon,
  MaterialEye,
  MaterialSymbolsDelete,
  MaterialSymbolsEdit,
} from '@/components/common/icon'
import { FormDialog } from '@/components/common/FormDialog'
import { Button } from '@/components/ui/button'
import { UserResponseFromAPI } from '@/types/users'

interface IFormInput {
  url: string
}

export default function Home() {
  const router = useRouter()

  const { error, isLoading } = useGetUsersQuery('/users')

  const users = useSelector((state: RootState) => state.users.users)
  const status = useSelector((state: RootState) => state.users.status)
  const dispatch = useDispatch()

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  if (isLoading) return <div className='text-center font-bold italic'>Loading...</div>

  if (status === 'failed') return <div>Error! {error?.toString()}</div>

  return (
    <Fragment>
      <Header />
      <main className="w-full max-w-[900px] py-2 lg:w-7/12 lg:py-10">
        <div className="mb-5 flex w-full flex-row items-center justify-end">
          <Button
            id="add-user-btn"
            onClick={() => setCreateOpen(true)}
            className="h-8 rounded-full bg-black px-6 py-1 text-xs hover:bg-black/70"
            size="sm"
          >
            <MaterialAddIcon className="mr-1 h-4 w-4 font-bold" />
            Add new user
          </Button>
        </div>

        <Table>
          <TableHeader className="sticky">
            <TableRow>
              <TableHead className="w-[70px]">Id</TableHead>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[150px]">Username</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="mx-auto flex items-center justify-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index} className="cursor-pointer hover:bg-muted">
                <TableCell className="w-[70px] font-medium">
                  {user.id}
                </TableCell>
                <TableCell className="mx-auto w-[80px] items-center justify-center font-medium">
                  <Image
                    className="mx-auto flex items-center justify-center rounded-full"
                    src={`https://picsum.photos/50/50?random=${user.id}`}
                    alt="avatar"
                    width={30}
                    height={30}
                  />
                </TableCell>
                <TableCell className="w-[200px] min-w-[200px] truncate">
                  {user.name}
                </TableCell>
                <TableCell className="w-[150px] min-w-[150px]">
                  {user.username}
                </TableCell>
                <TableCell className="w-[200px] min-w-[200px]">
                  {user.email}
                </TableCell>
                <TableCell className="w-auto">
                  <section className="flex h-full w-full items-center justify-center space-x-2">
                    <MaterialEye
                      role='details-1'
                      onClick={() => {
                        dispatch(setStreamUsers(user as UserResponseFromAPI))
                        setDetailsOpen(true)
                      }}
                    />
                    <MaterialSymbolsEdit
                      onClick={() => {
                        dispatch(setStreamUsers(user as UserResponseFromAPI))
                        setEditOpen(true)
                      }}
                    />
                    <MaterialSymbolsDelete
                      onClick={() => {
                        dispatch(setStreamUsers(user as UserResponseFromAPI))
                        setDeleteOpen(true)
                      }}
                      className="text-red-500"
                    />
                  </section>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="py-20"></div>

        {/* Form Dialog */}
        <FormDialog open={detailsOpen} mode="view" setOpen={setDetailsOpen} />
        <FormDialog open={editOpen} mode="edit" setOpen={setEditOpen} />
        <FormDialog open={createOpen} mode="create" setOpen={setCreateOpen} />

        {/* Delete Dialog*/}
        <DeleteDialog open={deleteOpen} setOpen={setDeleteOpen} />
      </main>
    </Fragment>
  )
}

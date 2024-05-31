'use client'

import { useForm } from 'react-hook-form'
import Image from 'next/image'

import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import { FormUsers, UserResponseFromAPI } from '@/types/users'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { useEffect } from 'react'
import {
  addUsers,
  editUsers,
} from '@/lib/redux/slices/usersSlice'

interface FormMode {
  mode: 'create' | 'edit' | 'view'
  setOpen: (open: boolean) => void
}

export function FormDetails({ mode, setOpen }: FormMode) {
  const readOnlyStatus = mode === 'view'

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const dispatch = useDispatch()
  const streamUsers = useSelector((state: RootState) => state.users.streamUsers)
  const users = useSelector((state: RootState) => state.users.users)

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address_street: '',
      address_suite: '',
      address_city: '',
      address_zipcode: '',
      address_geo_lat: '',
      address_geo_lng: '',
      company_name: '',
      company_catchPhrase: '',
      company_bs: '',
    },
  })

  function onSubmit(data: FormUsers) {
    let id ;

    if(mode === 'edit' ){
      id = streamUsers?.id 
    }

    if(mode === 'create'){
      id = users.length + 1
    }

    const dataPayload = {
      id: id, 
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
      address: {
        street: data.address_street,
        suite: data.address_suite,
        city: data.address_city,
        zipcode: data.address_zipcode,
        geo: {
          lat: data.address_geo_lat,
          lng: data.address_geo_lng,
        },
      },
      company: {
        name: data.company_name,
        catchPhrase: data.company_catchPhrase,
        bs: data.company_bs,
      },
    }

    if (mode === 'create') {
      try {
        dispatch(addUsers(dataPayload as UserResponseFromAPI))
        toast.success('User created successfully!')
        setOpen(false)
      } catch (error) {
        toast.error('Something went wrong!')
      }
    }

    if (mode === 'edit') {
      try {
        dispatch(editUsers(dataPayload as UserResponseFromAPI))
        toast.success('User updated successfully!')
        setOpen(false)
      } catch (error) {
        toast.error('Something went wrong!')
      }
    }


  }

  useEffect(() => {
    if (mode === 'view' || 'edit') {
      form.reset({
        name: streamUsers?.name,
        username: streamUsers?.username,
        email: streamUsers?.email,
        phone: streamUsers?.phone,
        website: streamUsers?.website,
        address_street: streamUsers?.address?.street,
        address_suite: streamUsers?.address?.suite,
        address_city: streamUsers?.address?.city,
        address_zipcode: streamUsers?.address?.zipcode,
        address_geo_lat: streamUsers?.address?.geo?.lat,
        address_geo_lng: streamUsers?.address?.geo?.lng,
        company_name: streamUsers?.company?.name,
        company_catchPhrase: streamUsers?.company?.catchPhrase,
        company_bs: streamUsers?.company?.bs,
      })
    }

    if (mode === 'create') {
      form.reset({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address_street: '',
        address_suite: '',
        address_city: '',
        address_zipcode: '',
        address_geo_lat: '',
        address_geo_lng: '',
        company_name: '',
        company_catchPhrase: '',
        company_bs: '',
      })
    }
  }, [mode])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3 "
      >
        <div className="relative mx-auto flex flex-row items-center justify-center">
          <Image
            src="https://picsum.photos/50/50?random=1"
            alt="avatar"
            width={50}
            height={50}
            className="mt-5 h-28 w-28 rounded-full"
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 px-2 text-center font-mono text-[0.6rem] tracking-widest text-white lg:p-5">
            image <br />
            is <br /> random
          </div>
        </div>

       <FormField
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: John Wick"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          rules={{
            required: {
              value: true,
              message: 'Username is required',
            },
          }}
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  readOnly={readOnlyStatus}
                  placeholder="ex: Johnwick"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       

        <FormField
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email address',
            },
          }}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: johnwick@mail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            required: {
              value: true,
              message: 'phone number is required',
            },
          }}
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: 0812345678"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            pattern: {
              value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/,
              message: 'Enter a valid website URL',
            },
          }}
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: https://google.com/"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            required: {
              value: true,
              message: 'Company name is required',
            },
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: Space X corp"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="company_bs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company BS</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: Suply chain management"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="company_catchPhrase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Catch Phrase</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: Proactive didactic contingency"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="address_street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: Kulas Light"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="address_suite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suite</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: Flamboyan Suite"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 30,
              message: 'maximum characters is 30',
            },
          }}
          control={form.control}
          name="address_city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: BSD"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 20,
              message: 'maximum characters is 20',
            },
          }}
          control={form.control}
          name="address_zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zipcode</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: 1290-990"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="address_geo_lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: -102.02423"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          rules={{
            maxLength: {
              value: 50,
              message: 'maximum characters is 50',
            },
          }}
          control={form.control}
          name="address_geo_lng"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  readOnly={readOnlyStatus}
                  placeholder="ex: 81.3240"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pb-12 lg:pb-12"></div>

        {mode && mode === 'edit' && !isDesktop && (
          <div className="fixed bottom-14 left-0 right-0 bg-white px-4 py-2">
            <Button
              size="sm"
              className="w-full rounded-xl bg-gray-800 hover:bg-blue-800"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}

        {/* MOBILE Button */}
        {mode && mode === 'create' && !isDesktop && (
          <div className="fixed bottom-14 left-0 right-0 bg-white px-4 py-2">
            <Button
              size="sm"
              className="xwtracking-widest w-full rounded-xl bg-gray-800 hover:bg-blue-800"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}

        {mode && mode === 'edit' && isDesktop && (
          <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-2">
            <Button
              size="sm"
              className="w-full rounded-xl bg-gray-800 uppercase hover:bg-blue-800"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}

        {mode && mode === 'create' && isDesktop && (
           <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-2">
           <Button
             size="sm"
             className="w-full rounded-xl bg-gray-800 uppercase hover:bg-blue-800"
             type="submit"
           >
             Submit
           </Button>
         </div>
        )}
      </form>
    </Form>
  )
}

export type UserResponseFromAPI = {
  id: number
  name: string
  username: string
  email: string
  address?: {
    street?: string
    suite?: string
    city?: string
    zipcode?: string
    geo?: {
      lat?: string
      lng?: string
    }
  }
  phone: string
  website: string
  company?: {
    name?: string
    catchPhrase?: string
    bs?: string
  }
}


export interface FormUsers {
    id?: string | number
    name: string
    username: string
    email: string
    phone: string
    website?: string
    address_street?: string
    address_suite?: string
    address_city?: string
    address_zipcode?: string
    address_geo_lat?: string
    address_geo_lng?: string
    company_name: string
    company_catchPhrase?: string
    company_bs?: string
  }
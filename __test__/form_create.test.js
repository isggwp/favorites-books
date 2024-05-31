import { render, screen } from '@testing-library/react'

import { wrapper } from '@/lib/redux/store'
import Home from '@/pages/index'

const HomePage = wrapper.withRedux(Home)

// CREATE UI
test('Should showing dialog after clicking Add New User', async () => {
  // render Form create
  render(<HomePage />)

  await setTimeout(() => {
    expect(screen.queryByRole('dialog')).toBeNull()

    const addNewUserButton = screen.getByRole('button', {
      name: /Add new user/i,
    })
    fireEvent.click(addNewUserButton)

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const heading = within(dialog).getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(/create user/i)
  }, 4000)
})


test('Contains 14 inputfield', async () => {
    render(<HomePage />)
  
    await setTimeout(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
  
      const addNewUserButton = screen.getByRole('button', {
        name: /Add new user/i,
      })
      fireEvent.click(addNewUserButton)
  
      const inputFields = screen.getAllByRole('textbox')
      expect(inputFields).toHaveLength(14)

    }, 4000)
  })

  test('validation name, username, email, field test', async () => {
    render(<HomePage />)
  
    await setTimeout(() => {
      expect(screen.queryByRole('dialog')).toBeNull()
  
      const addNewUserButton = screen.getByRole('button', {
        name: /Add new user/i,
      })
      fireEvent.click(addNewUserButton)

      const form = screen.getByRole('form')
      fireEvent.submit(form)

      const validationName = screen.getByText(/name is required/i)
      const validationUsername = screen.getByText(/username is required/i)
      const validationEmail = screen.getByText(/email is required/i)

      expect(validationName).toBeInTheDocument()
      expect(validationUsername).toBeInTheDocument()
      expect(validationEmail).toBeInTheDocument()
    }, 4200)
  })

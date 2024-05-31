import { render, screen } from '@testing-library/react'

import { wrapper } from '@/lib/redux/store'
import Home from '@/pages/index'

const HomePage = wrapper.withRedux(Home)

// DETAILs UI
test('Should showing dialog after clicking click details icon', async () => {
  // render Form create
  render(<HomePage />)

  await setTimeout(() => {
    expect(screen.queryByRole('dialog')).toBeNull()

    const detailsIconButton = screen.getByRole('details-1')
    fireEvent.click(detailsIconButton)


  }, 3000)


  await(setTimeout(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const heading = within(dialog).getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(/user details/i)

  }, 4000))

})

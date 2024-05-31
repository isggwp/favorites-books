### Description
Simple Crud Application including responsive design, global state management, form validation and Testing:

- Nextjs 14
- State Management: [Redux](https://redux-toolkit.js.org/)
- UI Component: [Shadcn](https://ui.shadcn.com/)
- Form Validation: [React Hook Form](https://react-hook-form.com/)
- testing: [JEST](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

### Installation

This is monumental guide you must be follow on every single step at setup project.

1. we are using pnpm. run  `pnpm install ` . see the details about [pnpm](https://pnpm.io/id/)
2. install Commitizen on your local mechine . `npm install commitizen -g` . thats make our commit more readable.  [Commitizen](https://commitizen-tools.github.io/commitizen/)
3. run this command for initial `commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact`. see [commitizen for detail](https://github.com/commitizen/cz-cli)

4. install prettier `pnpm add --save-dev --save-exact prettier`
5. run for dev version in your local mechine with `pnpm run dev`



## testing

open terminal and run `pnpm run test`
or for stream watch, you can use `pnpm run test:watch`


## Live demo

[obs-test-one.vercel.app](https://obs-test-one.vercel.app/)
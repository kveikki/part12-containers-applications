import React from 'react'
import Todo from '../Todo'
import { render, screen } from '@testing-library/react'
const expect = require('expect')


test('Todo renders "not ready"-text', () => {
  render(<Todo todo={{ text: "This is a test", done: false }} deleteTodo={() => { }} completeTodo={() => { }} />)

  const element = screen.getByText('This todo is not done')

  expect(element).toBeDefined()
})
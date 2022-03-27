/*
 * @Author       : your name
 * @Date         : 2022-03-07 16:41:30
 * @LastEditTime : 2022-03-07 16:42:37
 * @FilePath     : /jest-react/src/hidden-message.test.js
 * @developer    : yangfan36
 */
// __tests__/hidden-message.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import HiddenMessage from './hidden-message'

test('shows the children when the checkbox is checked', () => {
  const testMessage = 'Test Message'
  render(<HiddenMessage>{testMessage}</HiddenMessage>)
  expect(screen.queryByText(testMessage)).toBeNull()
  fireEvent.click(screen.getByLabelText(/show/i))
  expect(screen.getByText(testMessage)).toBeInTheDocument()
})
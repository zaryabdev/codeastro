import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { ContactUsForm } from './ContactUsForm'

describe('ContactUsForm', () => {
  test('renders correctly', () => {
    const result = render(<ContactUsForm submissionFn={vi.fn()} />)

    expect(result.getByLabelText('First Name')).toBeInTheDocument()
    expect(result.getByLabelText('Last Name')).toBeInTheDocument()
    expect(result.getByLabelText('Company Name')).toBeInTheDocument()
    expect(result.getByLabelText('Email')).toBeInTheDocument()
    expect(
      result.getByLabelText('Tell us about your project')
    ).toBeInTheDocument()
    expect(result.getByText('Submit')).toBeInTheDocument()
  })

  test('successful submission', async () => {
    const onSubmit = vi.fn(async () => new Response('success'))
    const result = render(<ContactUsForm submissionFn={onSubmit} />)

    fireEvent.change(result.getByLabelText('First Name'), {
      target: { value: 'Test' },
    })
    fireEvent.change(result.getByLabelText('Last Name'), {
      target: { value: 'Test' },
    })
    fireEvent.change(result.getByLabelText('Email'), {
      target: { value: 'test@test.com' },
    })
    fireEvent.change(result.getByLabelText('Tell us about your project'), {
      target: { value: 'Test' },
    })

    fireEvent.click(result.getByText('Submit'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce()
      expect(result.getByText('Success!')).toBeInTheDocument()
      expect(result.getByText(/Submission successful/)).toBeInTheDocument()
    })
  })

  test('displays errors', async () => {
    const onSubmit = vi.fn(async () => new Response('success'))
    const result = render(<ContactUsForm submissionFn={onSubmit} />)

    fireEvent.click(result.getByText('Submit'))

    expect(result.getAllByText('Field cannot be empty').length).toEqual(4)
  })

  test('disables submission while pending', () => {
    vi.useFakeTimers()

    const onSubmit = vi.fn(() => {
      return new Promise<Response>((resolve) => {
        setTimeout(() => {
          resolve(new Response('success'))
        }, 1000)
      })
    })

    const result = render(<ContactUsForm submissionFn={onSubmit} />)

    fireEvent.change(result.getByLabelText('First Name'), {
      target: { value: 'Test' },
    })
    fireEvent.change(result.getByLabelText('Last Name'), {
      target: { value: 'Test' },
    })
    fireEvent.change(result.getByLabelText('Email'), {
      target: { value: 'test@test.com' },
    })
    fireEvent.change(result.getByLabelText('Tell us about your project'), {
      target: { value: 'Test' },
    })

    fireEvent.click(result.getByText('Submit'))
    expect(onSubmit).toHaveBeenCalledOnce()

    fireEvent.click(result.getByText('Submitting...'))
    expect(onSubmit).not.toHaveBeenCalledTimes(2)

    vi.useRealTimers()
  })

  test('server failure', async () => {
    const onSubmit = vi.fn(async () => new Response('failure', { status: 500 }))
    const result = render(<ContactUsForm submissionFn={onSubmit} />)

    fireEvent.change(result.getByLabelText('First Name'), {
      target: { value: 'Test' },
    })
    fireEvent.change(result.getByLabelText('Last Name'), {
      target: { value: 'Test' },
    })
    fireEvent.change(result.getByLabelText('Email'), {
      target: { value: 'test@test.com' },
    })
    fireEvent.change(result.getByLabelText('Tell us about your project'), {
      target: { value: 'Test' },
    })

    fireEvent.click(result.getByText('Submit'))

    await waitFor(() => {
      expect(result.getByText('Failed!')).toBeInTheDocument()
      expect(result.getByText(/Something went wrong/)).toBeInTheDocument()
    })
  })
})

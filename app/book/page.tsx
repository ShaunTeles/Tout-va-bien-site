'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  date: z.string().min(1, 'Please choose a date'),
  time: z.string().min(1, 'Please choose a time'),
  partySize: z.coerce.number().min(1, 'At least 1 guest').max(20, 'Maximum 20 guests'),
  notes: z.string().optional(),
})

type BookingForm = z.output<typeof schema>

const TIME_SLOTS = [
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
  '18:00', '18:30',
  '19:00', '19:30',
  '20:00',
]

export default function BookPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm, unknown, BookingForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async () => {
    setPending(true)
    await new Promise((res) => setTimeout(res, 500))
    router.push('/book/unavailable')
  }

  // Minimum date = today
  const today = new Date().toISOString().split('T')[0]

  return (
    <main className="book-page">
      <Link href="/#panel-hero" className="book-back-link">
        ← Back to site
      </Link>

      <h1 className="book-heading">Book a table</h1>

      <form className="book-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Name */}
        <div className="book-field">
          <label htmlFor="name" className="book-label">Your name</label>
          <input
            id="name"
            type="text"
            className="book-input"
            placeholder="e.g. Marie Dupont"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name && (
            <span className="book-error" role="alert">{errors.name.message}</span>
          )}
        </div>

        {/* Date */}
        <div className="book-field">
          <label htmlFor="date" className="book-label">Date</label>
          <input
            id="date"
            type="date"
            className="book-input"
            min={today}
            {...register('date')}
          />
          {errors.date && (
            <span className="book-error" role="alert">{errors.date.message}</span>
          )}
        </div>

        {/* Time */}
        <div className="book-field">
          <label htmlFor="time" className="book-label">Time</label>
          <select id="time" className="book-select" {...register('time')}>
            <option value="">Select a time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.time && (
            <span className="book-error" role="alert">{errors.time.message}</span>
          )}
        </div>

        {/* Party size */}
        <div className="book-field">
          <label htmlFor="partySize" className="book-label">Number of guests</label>
          <input
            id="partySize"
            type="number"
            className="book-input"
            min={1}
            max={20}
            placeholder="2"
            {...register('partySize')}
          />
          {errors.partySize && (
            <span className="book-error" role="alert">{errors.partySize.message}</span>
          )}
        </div>

        {/* Notes */}
        <div className="book-field">
          <label htmlFor="notes" className="book-label">
            Notes <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            id="notes"
            className="book-textarea"
            placeholder="Dietary requirements, celebrations, anything else…"
            {...register('notes')}
          />
        </div>

        <button
          type="submit"
          className="book-submit"
          disabled={pending}
        >
          {pending ? 'Checking…' : 'Check availability'}
        </button>
      </form>
    </main>
  )
}

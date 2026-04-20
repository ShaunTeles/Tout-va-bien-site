'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { TimeRangePicker } from '@mui/x-date-pickers-pro/TimeRangePicker'
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField'
import type { Dayjs } from 'dayjs'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  date: z.string().min(1, 'Please choose a date'),
  timeRange: z.tuple([z.any(), z.any()]).refine(
    ([start, end]) => start && end,
    'Please choose a start and end time'
  ),
  partySize: z.coerce.number().min(1, 'At least 1 guest').max(20, 'Maximum 20 guests'),
  notes: z.string().optional(),
})

type BookingForm = z.output<typeof schema>

export default function BookPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingForm, unknown, BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: { timeRange: [null, null] },
  })

  const onSubmit = async () => {
    setPending(true)
    await new Promise((res) => setTimeout(res, 500))
    router.push('/book/unavailable')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

          {/* Time range */}
          <div className="book-field">
            <span className="book-label">Time</span>
            <Controller
              name="timeRange"
              control={control}
              render={({ field }) => (
                <TimeRangePicker
                  value={field.value as [Dayjs | null, Dayjs | null]}
                  onChange={field.onChange}
                  slots={{ field: MultiInputTimeRangeField }}
                  slotProps={{
                    textField: ({ position }) => ({
                      size: 'small',
                      label: position === 'start' ? 'Arrival' : 'Departure',
                      variant: 'outlined',
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          color: 'var(--text)',
                          borderRadius: 0,
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          '& fieldset': { borderColor: 'rgba(254,255,254,0.3)' },
                          '&:hover fieldset': { borderColor: 'rgba(254,255,254,0.6)' },
                          '&.Mui-focused fieldset': { borderColor: 'var(--text)', borderWidth: '1px' },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(254,255,254,0.5)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--text)' },
                        '& .MuiSvgIcon-root': { color: 'rgba(254,255,254,0.4)' },
                      },
                    }),
                    desktopPaper: {
                      sx: {
                        background: '#1e1e1e',
                        color: 'var(--text)',
                        borderRadius: 0,
                        '& .MuiClockNumber-root': { color: 'var(--text)' },
                        '& .MuiPickersArrowSwitcher-button': { color: 'rgba(254,255,254,0.6)' },
                      },
                    },
                  }}
                />
              )}
            />
            {errors.timeRange && (
              <span className="book-error" role="alert">Please choose a start and end time</span>
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
    </LocalizationProvider>
  )
}

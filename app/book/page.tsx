'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  date: z.string().min(1, 'Please choose a date'),
  arrival: z.any().refine((v) => v !== null && v !== undefined, 'Please choose an arrival time'),
  departure: z.any().refine((v) => v !== null && v !== undefined, 'Please choose a departure time'),
  partySize: z.coerce.number().min(1, 'At least 1 guest').max(20, 'Maximum 20 guests'),
  notes: z.string().optional(),
})

type BookingForm = z.output<typeof schema>

const timePickerSx = {
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: '#fefffe',
    borderRadius: 0,
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    backgroundColor: 'transparent',
    '& fieldset': { borderColor: 'rgba(254,255,254,0.3)', borderWidth: '1px' },
    '&:hover fieldset': { borderColor: 'rgba(254,255,254,1) !important', borderWidth: '1px !important' },
    '&.Mui-focused fieldset': { borderColor: '#fefffe', borderWidth: '1px !important' },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(254,255,254,0.5)',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fefffe' },
  '& .MuiSvgIcon-root': { color: 'rgba(254,255,254,0.5)' },
  '& .MuiInputBase-input': { color: '#fefffe' },
  '& .MuiPickersSectionList-root': { color: '#fefffe' },
  '& .MuiPickersSectionList-section': { color: '#fefffe' },
  '& .MuiPickersSectionList-sectionContent': { color: '#fefffe' },
  '& .MuiPickersSectionList-sectionSeparator': { color: 'rgba(254,255,254,0.5)' },
}

const popperSx = {
  '& .MuiPaper-root': {
    background: '#1e1e1e',
    color: '#fefffe',
    borderRadius: 0,
  },
  '& .MuiClockNumber-root': { color: '#fefffe' },
  '& .MuiPickersArrowSwitcher-button': { color: 'rgba(254,255,254,0.6)' },
  '& .MuiButtonBase-root': { color: '#fefffe' },
  '& .MuiTypography-root': { color: '#fefffe' },
  '& .MuiPickersToolbar-root': { background: '#1e1e1e' },
  '& .MuiDialogActions-root .MuiButton-root': { color: '#fefffe' },
}

export default function BookPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(schema),
    defaultValues: { arrival: null, departure: null },
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
              <span className="book-error" role="alert">{errors.name.message as string}</span>
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
              <span className="book-error" role="alert">{errors.date.message as string}</span>
            )}
          </div>

          {/* Time range — two free TimePickers */}
          <div className="book-field">
            <span className="book-label">Time</span>
            <div className="book-time-range">
              <Controller
                name="arrival"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="Arrival"
                    value={field.value as Dayjs | null}
                    onChange={field.onChange}
                    sx={timePickerSx}
                    slotProps={{ popper: { sx: popperSx } }}
                  />
                )}
              />
              <span className="book-time-dash">–</span>
              <Controller
                name="departure"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="Departure"
                    value={field.value as Dayjs | null}
                    onChange={field.onChange}
                    sx={timePickerSx}
                    slotProps={{ popper: { sx: popperSx } }}
                  />
                )}
              />
            </div>
            {(errors.arrival || errors.departure) && (
              <span className="book-error" role="alert">Please choose arrival and departure times</span>
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
              <span className="book-error" role="alert">{errors.partySize.message as string}</span>
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

          <button type="submit" className="book-submit" disabled={pending}>
            {pending ? 'Checking…' : 'Check availability'}
          </button>
        </form>
      </main>
    </LocalizationProvider>
  )
}

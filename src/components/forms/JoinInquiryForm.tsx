"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { contributionAreas, type JoinInquiryField } from "@/lib/join-form"

type FormState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors: Partial<Record<JoinInquiryField, string>>
}

const initialState: FormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }

  return <p className="text-sm text-destructive">{message}</p>
}

export function JoinInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<FormState>(initialState)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)
    setFormState(initialState)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as {
        message?: string
        fieldErrors?: Partial<Record<JoinInquiryField, string>>
      }

      if (!response.ok) {
        setFormState({
          status: "error",
          message:
            data.message || "The form could not be submitted. Please try again.",
          fieldErrors: data.fieldErrors || {},
        })
        return
      }

      form.reset()
      setFormState({
        status: "success",
        message:
          data.message || "Inquiry submitted successfully.",
        fieldErrors: {},
      })
    } catch {
      setFormState({
        status: "error",
        message:
          "The form could not be submitted right now. Check your connection and try again.",
        fieldErrors: {},
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const { fieldErrors } = formState

  return (
    <form className="space-y-5 flex-1 flex flex-col" onSubmit={handleSubmit}>
      {formState.message ? (
        <div
          className={
            formState.status === "success"
              ? "rounded-xl border border-emerald-600/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
              : "rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          }
        >
          {formState.message}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Ada"
            required
            aria-invalid={Boolean(fieldErrors.firstName)}
          />
          <FieldError message={fieldErrors.firstName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Lovelace"
            required
            aria-invalid={Boolean(fieldErrors.lastName)}
          />
          <FieldError message={fieldErrors.lastName} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Student Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="ada@student.deanza.edu"
          required
          aria-invalid={Boolean(fieldErrors.email)}
        />
        <FieldError message={fieldErrors.email} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="major">Major / Background</Label>
        <Input
          id="major"
          name="major"
          placeholder="e.g. Computer Science, Electrical Engineering"
          required
          aria-invalid={Boolean(fieldErrors.major)}
        />
        <FieldError message={fieldErrors.major} />
      </div>

      <div className="space-y-2 pt-2">
        <Label htmlFor="area">Where do you think you&apos;d contribute?</Label>
        <select
          id="area"
          name="area"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
          defaultValue=""
          aria-invalid={Boolean(fieldErrors.area)}
        >
          <option value="" disabled>
            Select an area
          </option>
          {contributionAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.label}
            </option>
          ))}
        </select>
        <FieldError message={fieldErrors.area} />
      </div>

      <div className="space-y-2 pt-2">
        <Label htmlFor="why">What do you want to build or learn here?</Label>
        <textarea
          id="why"
          name="why"
          className="flex min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Be specific. What draws you to this kind of work and what do you hope to get out of it?"
          required
          aria-invalid={Boolean(fieldErrors.why)}
        />
        <FieldError message={fieldErrors.why} />
      </div>

      <div className="mt-auto pt-6">
        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </div>
    </form>
  )
}

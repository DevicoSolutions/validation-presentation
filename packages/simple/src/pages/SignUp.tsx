import { FormEvent, memo, useCallback, useState } from 'react'
import { GuestLayout, TextField, Button, Switch } from '@validation/ui'

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateEmail = (email: string) => {
  return emailRegex.test(email)
}

export default memo(function SignUp() {
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!agree) {
        setError('You should agree with our Terms of Service')
        return
      }
      // @ts-ignore
      const formState: {
        email: string
        password: string
        passwordRepeat: string
      } = Array.from(e.currentTarget.elements).reduce(
        (target, element) =>
          // @ts-ignore
          element.name
            ? {
                ...target,
                // @ts-ignore
                [element.name]: element.value,
              }
            : target,
        {},
      )

      if (!validateEmail(formState.email)) {
        setError('Wrong email address format')
      }
      if (
        formState.password.trim() !== formState.password.trim() ||
        formState.password.length < 8
      ) {
        setError(
          'Password should match and should be at least 8 characters long',
        )
      }
    },
    [agree],
  )
  return (
    <GuestLayout label="Sign Up">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        {error ? (
          <div className="glass p-2 text-red-700 rounded mb-3">{error}</div>
        ) : undefined}
        <TextField name="email" placeholder="Email" type="email" required />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <TextField
          name="passwordRepeat"
          placeholder="Repeat Password"
          type="password"
          required
        />
        <Switch
          value={agree}
          onChange={setAgree}
          label="I Agree with Terms of Service"
        />
        <Button label="Sign Up" />
      </form>
    </GuestLayout>
  )
})

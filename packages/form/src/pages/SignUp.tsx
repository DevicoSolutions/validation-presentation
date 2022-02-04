import { FormEvent, memo, useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { GuestLayout, TextField, Button, Switch } from '@validation/ui'

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validateEmail = (email: string) => {
  return emailRegex.test(email) ? undefined : 'Wrong email address format'
}

const validatePassword = (password: string) => {
  return password.trim().length >= 8
    ? undefined
    : 'Password should be at least 8 characters long'
}

const validateRepeatPassword = (password: string, repeatPassword: string) => {
  return password.trim() === repeatPassword.trim()
}

interface SignUpForm {
  email: string
  password: string
  passwordRepeat: string
  agree: boolean
}

export default memo(function SignUp() {
  const { register, handleSubmit, control, formState, setError } =
    useForm<SignUpForm>()
  const onSubmit = useCallback((values: SignUpForm) => {
    if (!validateRepeatPassword(values.password, values.passwordRepeat)) {
      setError('passwordRepeat', {
        message: 'Passwords should match',
      })
    }
  }, [])
  return (
    <GuestLayout label="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextField
          placeholder="Email"
          type="email"
          {...register('email', { required: true, validate: validateEmail })}
        />
        {formState.errors.email ? (
          <div className="px-3 text-red-700 rounded">
            * {formState.errors.email.message}
          </div>
        ) : undefined}
        <TextField
          placeholder="Password"
          type="password"
          {...register('password', {
            required: true,
            validate: validatePassword,
          })}
        />
        {formState.errors.password ? (
          <div className="px-3 text-red-700 rounded">
            * {formState.errors.password.message}
          </div>
        ) : undefined}
        <TextField
          placeholder="Repeat Password"
          type="password"
          {...register('passwordRepeat', { required: true })}
        />
        {formState.errors.passwordRepeat ? (
          <div className="px-3 text-red-700 rounded">
            * {formState.errors.passwordRepeat.message}
          </div>
        ) : undefined}
        <Controller
          control={control}
          name="agree"
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
          }) => (
            <Switch
              onChange={onChange} // send value to hook form
              value={value}
              label="I Agree with Terms of Service"
            />
          )}
        />
        {formState.errors.agree ? (
          <div className="px-3 text-red-700 rounded">
            * {formState.errors.agree.message}
          </div>
        ) : undefined}

        <Button label="Sign Up" />
      </form>
    </GuestLayout>
  )
})

import { FormEvent, memo, useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { GuestLayout, TextField, Button, Switch } from '@validation/ui'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface SignUpForm {
  email: string
  password: string
  passwordRepeat: string
  agree: boolean
}

const SignUpSchema = yup
  // @ts-ignore
  .object<SignUpForm>({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    passwordRepeat: yup
      .string()
      .required()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      }),
    agree: yup.boolean().isTrue().required(),
  })
  .required()

export default memo(function SignUp() {
  const { register, handleSubmit, control, formState, setError } =
    useForm<SignUpForm>({
      resolver: yupResolver(SignUpSchema),
    })
  const onSubmit = useCallback((values: SignUpForm) => {}, [])
  return (
    <GuestLayout label="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextField placeholder="Email" type="email" {...register('email')} />
        {formState.errors.email ? (
          <div className="px-3 text-red-700 rounded">
            * {formState.errors.email.message}
          </div>
        ) : undefined}
        <TextField
          placeholder="Password"
          type="password"
          {...register('password')}
        />
        {formState.errors.password ? (
          <div className="px-3 text-red-700 rounded">
            * {formState.errors.password.message}
          </div>
        ) : undefined}
        <TextField
          placeholder="Repeat Password"
          type="password"
          {...register('passwordRepeat')}
        />
        {formState.errors.passwordRepeat ? (
          <div className="px-3 text-red-700 rounded">
            * {formState.errors.passwordRepeat.message}
          </div>
        ) : undefined}
        <Controller
          control={control}
          name="agree"
          render={({ field: { onChange, value } }) => (
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

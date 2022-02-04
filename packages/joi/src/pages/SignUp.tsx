import { FormEvent, memo, useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { GuestLayout, TextField, Button, Switch } from '@validation/ui'

import { joiResolver } from '@hookform/resolvers/joi'
import joi from 'joi'

interface SignUpForm {
  email: string
  password: string
  passwordRepeat: string
  agree: boolean
}

const SignUpSchema = joi
  // @ts-ignore
  .object<SignUpForm>({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().min(8).required(),
    passwordRepeat: joi.ref('password'),
    agree: joi.boolean().required(),
  })
  .required()

export default memo(function SignUp() {
  const { register, handleSubmit, control, formState, setError } =
    useForm<SignUpForm>({
      resolver: joiResolver(SignUpSchema),
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

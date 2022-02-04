import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  Allow,
} from 'class-validator'

/**
 * Validates that two properties have the same value
 *
 * @example
 * class RegisterUser {
 *   @IsString()
 *   user_name!: string;
 *
 *   @IsTheSameAs('password_confirm')
 *   @IsString()
 *   password!: string;
 *
 *   // if the property is not given a valiadtion decorator, it may cause issues with whitelisting
 *   @Allow()
 *   password_confirm!: string
 * }
 */
export function IsTheSameAs(
  compareWithProperty: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTheSameAs',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [compareWithProperty],
      options: {
        message: `"${propertyName}" and "${compareWithProperty}" must match`,
        ...validationOptions,
      },
      validator: {
        validate(targetValue: any, args: ValidationArguments) {
          const [propertyConstraint] = args.constraints
          const compareWithValue = (args.object as any)[propertyConstraint]
          return targetValue === compareWithValue
        },
      },
    })
  }
}

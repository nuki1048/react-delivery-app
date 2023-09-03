import * as Yup from 'yup';

export const stringRequiredSchema = Yup.string()
  .required('Required field')
  .min(1, 'Min length 1');

const MIN_LENGTH = 7;
const UPPERCASE_REGEX = /[A-Z]/;
const SPECIAL_CHARACTER_REGEX = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

export const passwordSchema = (
  fieldName: string,
  isRequired: boolean
): Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''> => {
  const schema = Yup.string()
    .min(MIN_LENGTH, `Minimum password length is ${MIN_LENGTH} characters`)
    .test(
      fieldName,
      'Your password must contain at least one uppercase letter',
      (value: string | undefined): boolean =>
        value ? UPPERCASE_REGEX.test(value) : true
    )
    .test(
      fieldName,
      'Your password must contain at least one special character',
      (value: string | undefined): boolean =>
        value ? SPECIAL_CHARACTER_REGEX.test(value) : true
    );

  if (isRequired) {
    schema.required('Required field');
  }

  return schema;
};

export const repeatPasswordSchema = (
  fieldName: string,
  isRequired: boolean
): Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ''> => {
  let schema = Yup.string()
    .oneOf([Yup.ref(fieldName), undefined], 'Passwords must match')
    .min(7, 'Minimum password length 7!');
  if (isRequired) {
    schema = schema.required('Required Field');
  }
  return schema;
};

export const emailSchema = Yup.string()
  .email('Incorrectly entered mail!')
  .required('Required field');

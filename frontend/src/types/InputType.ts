export interface InputFieldProps {
  modelValue?: string | boolean
  placeholder?: string
  label?: string
  isError?: boolean
  name: string
  type?: string
  maxLength?: number
  inputmode?: string
  inputId?: string
  autoFocus?: boolean
  errorText?: string
}

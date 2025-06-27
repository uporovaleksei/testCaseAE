export function validateField(fieldValue: string, validateType = 'text'): boolean {
  if (validateType === 'password') {
    if (fieldValue.length < 8) {
      alert('Пароль должен содержать не менее 8 символов')
      return false
    }
    return true
  }

  if (!fieldValue.trim()) {
    alert('Все поля должны быть заполнены')
    return false
  }

  return true
}

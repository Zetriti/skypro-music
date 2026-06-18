export const errorTranslations: Record<string, string> = {
  'The username must be at least 3 characters.':
    'Имя пользователя должно содержать минимум 3 символа.',
  'The email format is invalid.': 'Неверный формат электронной почты.',
  'The password must be at least 6 characters.':
    'Пароль должен содержать минимум 6 символов.',
};

export const translateError = (message: string): string => {
  return errorTranslations[message] || message;
};

export const translateErrorsArray = (messages: string[]): string[] => {
  return messages.map((msg) => errorTranslations[msg] || msg);
};

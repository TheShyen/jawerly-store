export const validationEmail = () => [ val => val && val.length > 0 || 'Пожалуйста, введите вашу почту'];

export const validationPassword =  () => [ val => val && val.length > 0 || 'Пожалуйста, введите ваш пароль', val => val.length > 6 || 'Пароль должен быть длиннее 6 символов'];

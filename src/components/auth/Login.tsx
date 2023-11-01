import React from 'react';
import { Formik } from 'formik';
import { useLoginMutation } from '../../store/services/authService';
import { Input } from '../commons/inputs/Input';
import { Button } from '../commons/buttons/Button';
import './auth.scss';

export const Login: React.FC = () => {
  const [loginMutation] = useLoginMutation();
  const initialValues = { email: '', password: '' };
  return (
    <div className="auth">
      <div className="authWrapper">
        <h3 className="authTitle">Вход</h3>
        <Formik
          initialValues={initialValues}
          validate={values => {
            let errors: { email?: string, password?: string } = {};
            if (!values.email) {
              errors.email = 'Введите адрес электронной почты!';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Некорректный адрес электронной почты!';
            } else {
              delete errors.email;
            }

            if (!values.password) {
              errors.password = 'Пароль не может быть пустым!'
            } else {
              delete errors.password;
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            loginMutation(values);
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setSubmitting
            }) => (
            <form
              className="form"
              onSubmit={handleSubmit}
              onChange={() => setSubmitting(false)}
            >
              <div className="formItem">
                <Input
                  type="email"
                  name="email"
                  placeholder="Эл. почта"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="email"
                  className={(errors.email && touched.email && errors.email) ? 'inputError' : ''}
                />
                <div className="itemError">{errors.email && touched.email && errors.email}</div>
              </div>
              <div className="formItem">
                <Input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                  className={(errors.password && touched.password && errors.password) ? 'inputError' : ''}
                />
                <div className="itemError">{errors.password && touched.password && errors.password}</div>
              </div>
              <Button
                title="войти"
                disabled={isSubmitting || !(values.email && values.password)}
                className="formButton"
                type="submit"
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
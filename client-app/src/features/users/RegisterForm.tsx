import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Container, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup'
import ValidationErrors from '../errors/ValidationErrors';
import LoginForm from './LoginForm';

export default observer(function RegisterForm() {
  const { userStore, modalStore } = useStore();

  return (
    <Formik 
      initialValues={{displayName: '', userName: '', email: '', password: '', error: null}} 
      onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error }))}
      validationSchema={Yup.object({
        displayName: Yup.string().required('Display name is required!'),
        userName: Yup.string().required('Username is required!'),
        email: Yup.string().required('Email is required!').email('Email must be an email!'),
        password: Yup.string().required('Password is required!'),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextInput name='userName' placeholder='Username' />
          <MyTextInput name='email' placeholder='Email' />
          <MyTextInput name='password' placeholder='Password' type='password' />
          <ErrorMessage name='error' render={() => <ValidationErrors errors={errors.error} />} />
          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
          <Container fluid textAlign='center'>
            <Label color='teal' size='small' basic pointing>Already have an account? <Button size='small' color='teal' basic as={Label} onClick={() => modalStore.openModal(<LoginForm />)}>Log in</Button>.</Label>
          </Container>
        </Form>
      )}
    </Formik>
  )
})

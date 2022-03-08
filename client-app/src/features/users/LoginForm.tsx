import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Container, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import RegisterForm from './RegisterForm';

export default observer(function LoginForm() {
  const { userStore, modalStore } = useStore();

  return (
    <Formik 
      initialValues={{email: '', password: '', error: null}} 
      onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Invalid email or password' }))}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty  }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
          <MyTextInput name='email' placeholder='Email' />
          <MyTextInput name='password' placeholder='Password' type='password' />
          <ErrorMessage name='error' render={() => <Label style={{marginBottom: 15}} basic color='red' content={errors.error} />} />
          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Login' type='submit' fluid />
          <Container fluid textAlign='center'>
            <Label color='teal' size='small' basic pointing>Don't have an account? <Button size='small' color='teal' basic as={Label} onClick={() => modalStore.openModal(<RegisterForm />)}>Register</Button>.</Label>
          </Container>
        </Form>
      )}
    </Formik>
  )
})

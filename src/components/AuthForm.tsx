import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../utils/styles';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (values: { email: string; password: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const isRegister = type === 'register';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Required'),
    ...(isRegister && {
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
  });

  return (
    <Formik
      initialValues={
        isRegister
          ? { email: '', password: '', confirmPassword: '' }
          : { email: '', password: '' }
      }
      validationSchema={ validationSchema }
      onSubmit={ (values) => {
        const { email, password } = values;
        onSubmit({ email, password });
      } }
    >
      { ({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={ { width: '100%' } }>
          <TextInput
            style={ styles.input_auth }
            placeholder="Email"
            placeholderTextColor="#888"
            value={ values.email }
            onChangeText={ handleChange('email') }
            onBlur={ handleBlur('email') }
            keyboardType="email-address"
            autoCapitalize="none"
          />
          { touched.email && errors.email && (
            <Text style={ styles.errorText }>{ errors.email }</Text>
          ) }

          <TextInput
            style={ styles.input_auth }
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={ values.password }
            onChangeText={ handleChange('password') }
            onBlur={ handleBlur('password') }
            autoCapitalize="none"
          />
          { touched.password && errors.password && (
            <Text style={ styles.errorText }>{ errors.password }</Text>
          ) }

          { isRegister && (
            <>
              <TextInput
                style={ styles.input_auth }
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={ (values as any).confirmPassword }
                onChangeText={ handleChange('confirmPassword') }
                onBlur={ handleBlur('confirmPassword') }
                autoCapitalize="none"
              />
              { touched.confirmPassword && errors.confirmPassword && (
                <Text style={ styles.errorText }>{ errors.confirmPassword }</Text>
              ) }
            </>
          ) }

          <TouchableOpacity
            style={ styles.button }
            onPress={ handleSubmit as any }
            activeOpacity={ 0.8 }
          >
            <Text style={ styles.buttonText }>
              { isRegister ? 'Register' : 'Login' }
            </Text>
          </TouchableOpacity>
        </View>
      ) }
    </Formik>
  );
};

export default AuthForm;
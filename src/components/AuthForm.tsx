import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../utils/styles';
import Icon from '@react-native-vector-icons/fontawesome6';
import LinearGradient from 'react-native-linear-gradient';

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
        <View style={ { width: '100%', marginBottom: 10 } }>
          <View style={ { width: '100%', marginBottom: 10 } }>
            <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
              backgroundColor: '#fff'
            } }>
              <Icon
                name="envelope"
                iconStyle='solid'
                size={ 20 }
                color="#110d29"
                style={ { marginRight: 10 } }
              />
              <TextInput
                style={ { flex: 1, color: '#000' } }
                placeholder="Email"
                placeholderTextColor="#888"
                value={ values.email }
                onChangeText={ handleChange('email') }
                onBlur={ handleBlur('email') }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            { touched.email && errors.email && (
              <Text style={ { color: 'red', marginTop: 4, marginLeft: 4, fontSize: 12 } }>
                { errors.email }
              </Text>
            ) }
          </View>


          <View style={ { width: '100%', marginBottom: 10 } }>
            <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
              backgroundColor: '#fff'
            } }>
              <Icon
                name="lock"
                iconStyle='solid'
                size={ 20 }
                color="#110d29"
                style={ { marginRight: 10 } }
              />
              <TextInput
                style={ { flex: 1, color: '#000' } }
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={ values.password }
                onChangeText={ handleChange('password') }
                onBlur={ handleBlur('password') }
                autoCapitalize="none"
              />
            </View>
            { touched.password && errors.password && (
              <Text style={ { color: 'red', marginTop: 4, marginLeft: 4, fontSize: 12 } }>
                { errors.password }
              </Text>
            ) }
          </View>


          { isRegister && (
            <>
              <View style={ { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10, paddingHorizontal: 10 } }>
                <Icon
                  name="lock"
                  iconStyle='solid'
                  size={ 20 }
                  color="#110d29"
                  style={ { marginRight: 10 } }
                />
                <TextInput
                  style={ { flex: 1, height: 50, color: '#000' } }
                  placeholder="Confirm Password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  value={ (values as any).confirmPassword }
                  onChangeText={ handleChange('confirmPassword') }
                  onBlur={ handleBlur('confirmPassword') }
                  autoCapitalize="none"
                />
              </View>
              { touched.confirmPassword && errors.confirmPassword && (
                <Text style={ { color: 'red', marginBottom: 10 } }>{ errors.confirmPassword }</Text>
              ) }

            </>
          ) }

          <TouchableOpacity onPress={ handleSubmit as any } activeOpacity={ 0.8 }>
            <LinearGradient
              colors={ ['#010130', '#0f2027', '#8a00ff'] } // your sci-fi gradient
              style={ styles.gradientButton }
              start={ { x: -1, y: -2 } }
              end={ { x: 1, y: 0 } }
            >
              <Text style={ styles.buttonText }>
                { isRegister ? 'Register' : 'Login' }
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      ) }
    </Formik>
  );
};

export default AuthForm;
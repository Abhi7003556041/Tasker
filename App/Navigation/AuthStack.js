//import liraries
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { Component } from 'react';
import FontPage from '../Screens/Auth/FontPage';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import LoginFont from '../Screens/Auth/LoginFont'
import Register from '../Screens/Auth/Register';
import ProviderSignup from '../Screens/Auth/ProviderSignup';
import ResetPass from '../Screens/Auth/ResetPass';
import ProviderRegister from '../Screens/Auth/ProviderRegister';
import OTPverify from '../Screens/Auth/OTPverify';
import MailSend from '../Screens/Auth/MailSend';
import TermCondition from '../Screens/TermAndCondition/TermCondition';
import GoogleSignIn from '../Screens/Auth/GoogleSignIn';
import ProviderGoogleSign from '../Screens/Auth/ProviderGoogleSign';


const Stack = createStackNavigator();
// create a component
const AuthStack = () => {
    // const { login_status } = useSelector(state => state.User)
    return (
        <Stack.Navigator
            initialRouteName='FontPage'
            screenOptions={{
                headerShown: false,
                // gestureEnabled: true,
                // gestureDirection: 'horizontal',
                // ...TransitionPresets.ModalTransition,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="FontPage" component={FontPage} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LoginFont" component={LoginFont} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ProviderSignup" component={ProviderSignup} />
            <Stack.Screen name="ResetPass" component={ResetPass} />
            <Stack.Screen name="MailSend" component={MailSend} />
            <Stack.Screen name="ProviderRegister" component={ProviderRegister} />
            <Stack.Screen name="OTPverify" component={OTPverify} />
            <Stack.Screen name="TermCondition" component={TermCondition} />
            <Stack.Screen name="ProviderGoogleSign" component={ProviderGoogleSign} />
            
            <Stack.Screen name="GoogleSignIn" component={GoogleSignIn} />
        </Stack.Navigator>
    );
};

export default AuthStack;

//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

import { useSelector } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import Header from '../Header/BackHeader';
import { STRIPE_PUBLISHABLE_KEY, Stripe_Secret_key } from '../../Constants';
import { COLORS } from '../../Constants/Colors';
import HomeService from '../../Services/HomeService';
import useSelectLangue from '../Language/useSelectLangue';
import { colors } from 'react-native-elements';
import { useTheme } from 'react-native-basic-elements';

// create a component
var CARD_TOKEN = null;
const StripPayment = (props) => {

    const colors = useTheme()
    const { amount, room, user, func } = props;
    const userData = useSelector(state => state.User)

    const [cardInput, setCardInput] = useState({})
    const [loader, setLoader] = useState(false)
    const { setLanguage } = useSelectLangue();
    const { selectLanguage } = useSelector(state => state.Language);
    const _onChange = (data) => {
        setCardInput(data)
    }
    const getAccepted = async () => {
        HomeService.getAcceptedList().then(res => {
            console.log('acceptedTask', JSON.stringify(res.data));
        });
    };
    const onSubmit = async () => {
        if (cardInput.valid == false || typeof cardInput.valid == "undefined") {
            alert('Invalid Credit Card');
            return false;
        }
        setLoader(true)
        console.log('cardInput', cardInput);
        let creditCardToken;
        try {
            // Create a credit card token
            creditCardToken = await getCreditCardToken(cardInput);
            console.log("creditCardToken", creditCardToken)
            if (creditCardToken.error) {
                // alert("creditCardToken error");
                return;
            }
        } catch (e) {
            console.log("e", e);
            return;
        }
        // Send a request to your server with the received credit card token
        const { error } = await subscribeUser(creditCardToken);
        // Handle any errors from your server
        if (error) {
            alert(error)
        } else {

            let pament_data = await charges();
            console.log('pament_data', pament_data);
            if (pament_data.status == 'succeeded') {
                let data = {
                    amount: amount
                }
                console.log('whydatatis user', user)
                HomeService.taskPayment(user, data)
                    .then((res) => {
                        console.log('paymentTask', res.status)
                        if (res.status) {
                            // getAccepted()
                            func()
                            props.paymentComplete();
                            Toast.show(selectLanguage == 'en' ? 'Payment successfully' : 'Pago con éxito', Toast.SHORT, Toast.BOTTOM);

                            // getAccepted()
                            setLoader(false)
                        }
                        // else{
                        //     SimpleToast.show('Already Paid')
                        //     props.paymentComplete(true);
                        //     setLoader(false)
                        // }


                    })
                    .catch((err) => console.log('121wretwret323>>>>>', err))

            }
            else {
                alert('Payment failed');
                setLoader(false)
            }
        }
    }

    const getCurrency = () => {
        return 'usd'
        if (userData?.currency == "INR") {
            return 'usd'
        } else if (userData?.currency == "CAD") {
            return 'cad'
        } else if (userData?.currency == "USD") {
            return 'usd'
        } else if (userData?.currency == "GBP") {
            return 'gbp'
        } else {
            return 'eur'
        }
    }

    const charges = async () => {

        const card = {
            'amount': (amount * 100).toFixed(0),
            'currency': getCurrency(),
            'source': CARD_TOKEN,
            'description': "Astrophy Payment",
        };

        return fetch('https://api.stripe.com/v1/charges', {
            headers: {
                // Use the correct MIME type for your server
                Accept: 'application/json',
                // Use the correct Content Type to send data to Stripe
                'Content-Type': 'application/x-www-form-urlencoded',
                // Use the Stripe publishable key as Bearer
                Authorization: `Bearer ${Stripe_Secret_key}`
            },
            // Use a proper HTTP method
            method: 'post',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&')
        }).then(response => response.json());
    };

    const getCreditCardToken = async (creditCardData) => {
        // alert()
        const card = {
            'card[number]': creditCardData.values.number.replace(/ /g, ''),
            'card[exp_month]': creditCardData.values.expiry.split('/')[0],
            'card[exp_year]': creditCardData.values.expiry.split('/')[1],
            'card[cvc]': creditCardData.values.cvc
        };
        // console.log("card", card)
        try {
            const response = await fetch('https://api.stripe.com/v1/tokens', {
                headers: {
                    // Use the correct MIME type for your server
                    Accept: 'application/json',
                    // Use the correct Content Type to send data to Stripe
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // Use the Stripe publishable key as Bearer
                    Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
                },
                // Use a proper HTTP method
                method: 'post',
                // Format the credit card data to a string of key-value pairs
                // divided by &
                body: Object.keys(card)
                    .map(key => key + '=' + card[key])
                    .join('&')
            });
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    };

    /**
     * The method imitates a request to our server.
     *
     * @param creditCardToken
     * @return {Promise<Response>}
     */
    const subscribeUser = (creditCardToken) => {
        return new Promise((resolve) => {
            console.log('Credit card token\n', creditCardToken);
            CARD_TOKEN = creditCardToken.id;
            setTimeout(() => {
                resolve({ status: true });
            }, 1000);
        });
    };

    return (
        <View style={styles.container}>
            <Header name={"Payment"} />
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#000'
                }}
            />

            <View
                style={{
                    flex: 1,
                    paddingTop: 30, marginTop: 30,
                    // paddingHorizontal:10
                }}
            >
                <CreditCardInput
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    validColor="#fff"
                    placeholderColor="#ccc"
                    onChange={_onChange}
                />


                <TouchableOpacity
                    style={{
                        ...styles.paymentButton,
                        backgroundColor: colors.primaryThemeColor,
                    }}
                    onPress={onSubmit}
                >
                    <Text
                        style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: 15,
                            color: '#fff'
                        }}
                    >
                        Pay {userData.currency == "INR"
                            ? "₹"
                            : userData.currency == "CAD"
                                ? "$"
                                : userData.currency == "USD"
                                    ? "$"
                                    : userData.currency == "GBP"
                                        ? "£"
                                        : "₹"}{amount}
                    </Text>
                    {
                        loader ?
                            <ActivityIndicator
                                color="#fff"
                                size="small"
                                style={{
                                    marginLeft: 20
                                }}
                            />
                            :
                            null
                    }

                </TouchableOpacity>
            </View>


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopRightRadius: 10,
        // marginHorizontal:10
    },
    paymentButton: {
        height: 45,
        width: 250,
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputContainerStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,

        // marginRight:5
    },
    inputStyle: {
        backgroundColor: '#222242',
        paddingLeft: 15,
        borderRadius: 5,
        color: '#fff',
        // marginHorizontal:5
    },
    labelStyle: {
        marginBottom: 5,
        fontSize: 12
    }
});

//make this component available to the app
export default StripPayment;

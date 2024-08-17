import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native'
import { Tabs, SplashScreen, Redirect, Link } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AsyncStorage from "../utils/AsyncStorage";
import { router } from "expo-router";

import { icons } from "../constants"
import { images } from '../constants';

const index = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) return null;

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const address = await AsyncStorage.getItem("walletAddress");

    //             if(address != null){
    //                 router.navigate('(tabs)');
    //             }else{
    //                 router.navigate('/sign-up');
    //             }
    //         } catch (err) {
    //             console.log('Can\'t fetch wallet address');
    //             return null;
    //         }
    //     })();
    // }, []);

    return (
        <SafeAreaView className="bg-primary w-full justify-center items-center h-full p-4">
            <Image
                source={images.logo}
                className="w-[100%]"
                resizeMode="contain"
            />

            <Link href='/sign-up' className='text-secondary-200 text-3xl'>Sign-up</Link>
            <Link href='(tabs)' className='text-secondary-200 text-3xl'>Home</Link>
        </SafeAreaView>
    )
}

export default index
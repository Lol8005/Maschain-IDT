import { Alert, Text, View } from "react-native";
import AsyncStorage from "../utils/AsyncStorage";
import React, { useEffect, useState } from 'react';

import * as Clipboard from 'expo-clipboard';

const WalletAddressPanel = () => {
    const [walletAddress, setWalletAddress] = useState("not found");

    useEffect(() => {
        (async () => {
            try {
                const address = await AsyncStorage.getItem("walletAddress");
                setWalletAddress(address);
            } catch (err) {
                console.log('Can\'t fetch wallet address');
            }
        })();
    }, []);

    const copyWallletAddress = async () => {
        try {
            Alert.alert('Your wallet address', walletAddress, [
                {
                    text: 'Copy',
                    onPress: async() => await Clipboard.setStringAsync(walletAddress),
                },{
                    text: 'Close',
                }
            ]);
            
            
            //Alert.alert('Copied');
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <View className="m-4 p-2 justify-center items-center rounded-lg bg-gray-600 flex-row">
            <Text className="text-white text-lg">Your Wallet Address: </Text><Text onPress={copyWallletAddress} className="text-amber-300 underline">{`${walletAddress.slice(0, walletAddress.length / 4)}*******`}</Text>
        </View>
    )
}

export default WalletAddressPanel
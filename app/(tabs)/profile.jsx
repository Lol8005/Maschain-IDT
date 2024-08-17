import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import WalletAddressPanel from "../../components/WalletAddressPanel";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "../../utils/AsyncStorage";
import { router } from "expo-router";

const profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
    <View>
      <Header />
      <WalletAddressPanel/>

      <CustomButton
            title="Logout"
            handlePress={async() =>{
              await AsyncStorage.removeItem("walletAddress");
              router.navigate("sign-up");
            }}
            containerStyles="mt-7 m-4"
          />

    </View>

    <StatusBar backgroundColor="#161622" style="light" />
  </SafeAreaView>
  )
}

export default profile
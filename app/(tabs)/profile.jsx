import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import WalletAddressPanel from "../../components/WalletAddressPanel";

const profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
    <View>
      <Header />
      <WalletAddressPanel/>

    </View>

    <StatusBar backgroundColor="#161622" style="light" />
  </SafeAreaView>
  )
}

export default profile
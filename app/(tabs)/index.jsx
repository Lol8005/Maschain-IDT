import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';

const index = () => {
    return (
      <SafeAreaView className="bg-primary h-full">
        <View>
          <Header />
        </View>
        
        <View className="items-center justify-center">
          <View className="border-2 p-2 m-2 w-[90%] h-full">
          <Text className="text-white">Past Record</Text>
          </View>
        </View>

        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    )
  }

  export default index
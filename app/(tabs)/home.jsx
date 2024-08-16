import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import Header from '../../components/Header'
import { Redirect, router } from "expo-router";

const home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Header />
        
        

      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default home
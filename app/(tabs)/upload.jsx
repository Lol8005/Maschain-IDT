import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { images } from "../../constants";
import * as DocumentPicker from 'expo-document-picker';

const upload = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <Header />
      </View>

      <View >
        <View className="w-full justify-center items-center h-full">
          <Text className="text-white text-2xl">Please select medical record to upload: </Text>

          <TouchableOpacity activeOpacity={1}>
            <Image
              source={images.selectFile}
              resizeMode="contain"
               className="w-[40vw] h-[30vh]"
            />
          </TouchableOpacity>

          <Text className="text-red-300 text-lg">Chooes wisely, after submit is not reversable</Text>
        </View>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default upload
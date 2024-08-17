import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { images } from "../../constants";
import * as DocumentPicker from 'expo-document-picker';
import CustomButton from "../../components/CustomButton";
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "../../utils/AsyncStorage";
import { router } from "expo-router";

const upload = () => {
  // const result = await DocumentPicker.getDocumentAsync({
  //   type:'*/*',
  //   copyToCacheDirectory: false,
  // });

  const [selectedRecordType, setSelectedRecordType] = useState("medical");

  const [fileUri, setFileUri] = useState();
  const [fileName, setFileName] = useState("");

  const selector = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      if (file.assets != null) {
        if (file.assets.at(0).size <= 500000) {
          console.log('Pick: ' + file.assets.at(0).name);
          console.log('Uri: ' + file.assets.at(0).uri);

          setFileUri(file.assets.at(0).uri);
          setFileName(file.assets.at(0).name);
        } else {
          const sizeKB = file.assets.at(0).size / 1000;
          Alert.alert("File too large", `File size should be less than 0.5 MB (500KB), current: ${sizeKB} KB`);
          setFileUri(null);
          setFileName(null);
        }
      } else {
        console.log('cancelled');

        setFileUri(null);
        setFileName(null);
      }
    } catch (err) {
      console.log(err);

      return;
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      const fileBase64 = 'data:image/jpeg;base64,' + await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });

      const field = JSON.parse(`{
        "wallet_address_owner": "${walletAddress}",
        "max_supply": 1,
        "name": "${selectedRecordType}",
        "symbol": "${selectedRecordType == 'medical' ? 'M' : 'P'}"
      }`);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/certificate/create-smartcontract`,
        {
          method: "POST",
          headers: {
            client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "wallet_address": `${walletAddress}`,
            "name": `${selectedRecordType}`,
            "field": field,
            "image": `${fileBase64}`,
          }),
        }
      );

      console.log(JSON.stringify({
        "wallet_address": `${walletAddress}`,
        "name": `${selectedRecordType}`,
        "field": `${field}`,
        "image": `${fileBase64}`,
      }));

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create user");
      } else {
        

        Alert.alert("Success", "Record successfully added", [
          {
            text: 'OK',
            onPress: () => {
              setFileUri(null);
              setFileName(null);
              router.push('(tabs)');
            }
          }
        ]);
      }

    } catch (error) {
      console.log(error);
      return;
    }
  };

  const submit = async () => {
    if (!fileName) {
      Alert.alert('Error', "Please select a file");
    } else {
      await handleSubmit();
    }
  }

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

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <Header />
      </View>

      <View className="w-full justify-center items-center h-full pb-[25%]">
        <View className="w-[100%] h-[15vh] p-7 mb-11 ">
          <Text className="text-2xl text-white">Record Type</Text>
          <View className="border-2 border-blue-50 rounded-xl">
            <Picker className="h-full w-full"
              dropdownIconColor="white"
              style={{ backgroundColor: "gray-200", color: 'white' }}
              mode="dropdown"
              selectedValue={selectedRecordType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedRecordType(itemValue)
              }>

              <Picker.Item label="Medical record" value="medical" />
              <Picker.Item label="Property record" value="property" />
            </Picker>
          </View>
        </View>

        <Text className="text-white text-2xl">Please select related record to upload: </Text>

        <TouchableOpacity activeOpacity={1} onPress={selector}>
          <Image
            source={images.selectFile}
            resizeMode="contain"
            className="w-[40vw] h-[30vh]"
          />
        </TouchableOpacity>

        <Text className="text-green-300">{fileName}</Text>

        <Text className="text-red-300 text-lg">Choose wisely, after submit is not reversable</Text>

        <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyles="mt-7 w-[60%]"
          textStyles="text-lg text-white"
          isLoading={isSubmitting}
        />
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default upload
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

const index = () => {
  const [walletAddress, setWalletAddress] = useState("not found");
  const [contractName, setContractName] = useState("");
  const [contractImage, setContractImage] = useState("https://storage-testnet.maschain.com/2a7fb27808e9438a9ec0caf9bb6cf7eb/logo/bd190f076e4d4737ae1e852c08babebf20240818012624.jpeg");

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

  const handleSubmit = async () => {
    try {
      const id = '0xD80E9C4224A258f2BE6483B671B00eA20F3D0B19';

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/certificate/get-smart-contract/${id}`,
        {
          method: "GET",
          headers: {
            client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          }
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to retreive data");
      }else{

        const result = await response.json();
        setContractName(result.result.name);
        setContractImage('https://storage-testnet.maschain.com/2a7fb27808e9438a9ec0caf9bb6cf7eb/logo/bd190f076e4d4737ae1e852c08babebf20240818012624.jpeg');

        console.log(result.result.name);
        console.log(result.result.logo);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  handleSubmit();

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <Header />
      </View>

      <View className="w-full h-[1000px] justify-center items-center">
        <ScrollView contentContainerStyle={{
          flexGrow: 1,
          alignSelf : 'center'
        }}>
          <Text className="text-white text-2xl font-pbold">Past Record</Text>
          <View className="border-gray-500 rounded-3xl border-2 p-2 m-2 w-[96%] h-full">
            <View>
              <Text className="text-white">{contractName}</Text>
              <Image
                source={{uri: contractImage}}
                resizeMode="contain"
                className="w-[80vw] h-[50%]"
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default index
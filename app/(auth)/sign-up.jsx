import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'

import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import AsyncStorage from '../../utils/AsyncStorage'

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    ic: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data) => {
    try {
      console.log(`ID: ${process.env.EXPO_PUBLIC_CLIENT_ID}`);
      console.log(`Secret: ${process.env.EXPO_PUBLIC_CLIENT_SECRET}`);
      console.log(`URL: ${process.env.EXPO_PUBLIC_API_URL}/api/wallet/create-user`);
      console.log(data);
      console.log(`${process.env.EXPO_PUBLIC_API_URL}/api/wallet/create-user`,
        {
          method: "POST",
          headers: {
            client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/wallet/create-user`,
        {
          method: "POST",
          headers: {
            client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
            client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      const walletAddress = result.result.wallet.wallet_address;

      //   console.log("Wallet address:", walletAddress);
      // Store the wallet address in sessionStorage
      await AsyncStorage.setItem("walletAddress", walletAddress);

      if (!walletAddress) {
        throw new Error("Wallet address not found in the response");
      }

      console.log(`Success, ${walletAddress}`);
      return router.push('(tabs)');
    } catch (error) {
      console.error("Error creating user:", error);
      // Don't send the request if there's an error
      return;
    }
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.ic) {
      Alert.alert('Error', "Please fill in all the fields");
    } else {
      await handleSubmit(form);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />

          <Text className="text-2xl text-white mt-10 font-psemibold">Sign Up</Text>

          <FormField
            title="username"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="IC"
            value={form.ic}
            handleChangeText={(e) => setForm({ ...form, ic: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keybaordType="email-address"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
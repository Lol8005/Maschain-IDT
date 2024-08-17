import { Text, View, Image } from "react-native";
import { images } from "../constants";
import React from 'react';

const Header = () => {
	return (
		// <View className="h-[40%]">
		// 	<View className="border-b-2 border-gray-600 bg-primary w-full justify-center items-center h-[20%]">
		// 		<Image
		// 			source={images.logo}
		// 			className="w-[20%]"
		// 			resizeMode="contain"
		// 		/>
		// 	</View>

		// 	<View className=" w-full justify-center items-center">
		// 		<Text className="text-white">Address: <Text className="text-white">{walletAddress.slice(0, walletAddress.length / 4)}*******</Text></Text>
		// 	</View>
		// </View>

			<View className="border-b-2 border-gray-600 w-full justify-center items-center max-h-[8vh]">
				<Image
					source={images.logo}
					className="w-[20%]"
					resizeMode="contain"
				/>
			</View>

	);
}

export default Header
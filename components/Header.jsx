import { Text, View, Image } from "react-native";
import { images } from "../constants";

const Header = () => {
	return (
		<View className="border-b-2 border-gray-600 bg-primary w-full justify-center items-center h-[20%]">
			<Image
				source={images.logo}
				className="w-[20%]"
				resizeMode="contain"
			/>
		</View>
	);
}

export default Header
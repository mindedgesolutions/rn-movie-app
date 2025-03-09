import { icons } from '@/constants/icons';
import { Image, StyleSheet, Text, View } from 'react-native';

const Profile = () => {
  return (
    <View className="bg-dark-300 flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor={`#fff`} />
        <Text className="text-white text-base">John Doe</Text>
      </View>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({});

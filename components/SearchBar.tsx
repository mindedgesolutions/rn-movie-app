import { icons } from '@/constants/icons';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
};

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-300 rounded-full px-5 py-4 mt-10 mx-5">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor={`#ab8bff`}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={`#ab8bff`}
        className="text-white ml-3 w-full"
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({});

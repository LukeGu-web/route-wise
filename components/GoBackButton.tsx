import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable } from "react-native";

export default function GoBackButton() {
    return (
        <Pressable onPress={() => router.back()} className="p-2">
            <ChevronLeft size={24} />
        </Pressable>
    );
}
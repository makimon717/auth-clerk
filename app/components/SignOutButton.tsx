import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text style={styles.button}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 6,
    color: "white",
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "blue",
  },
});

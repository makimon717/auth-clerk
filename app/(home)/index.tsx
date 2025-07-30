import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "../components/SignOutButton";

export default function Page() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    return <Text>Loading....</Text>;
  }
  return (
    <View style={styles.container}>
      <SignedIn>
        <Text style={styles.description}>
          ようこそ！ログアウトの方はSign Outボタンを押してください
        </Text>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>
            Hello {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Text style={styles.description}>
          初めての方はサインアップ、サインアップ済の方はサインインを押してください
        </Text>
        <View style={styles.buttonGroup}>
          <Link href={`/${"(auth)/sign-in"}`}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </Link>
          <Link href={`/${"(auth)/sign-up"}`}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8f9fa",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

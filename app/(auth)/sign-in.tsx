import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string()
    .min(6, { message: "6文字以上のパスワードを入力してください" }),
});

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const onSignInPress = async () => {
    if (!isLoaded) return;
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.map((err) => {
        fieldErrors[err.path[0]] = err.message;
        console.log(fieldErrors);
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      try {
        const signInAttemp = await signIn.create({
          identifier: email,
          password,
        });

        if (signInAttemp.status === "complete") {
          await setActive({ session: signInAttemp.createdSessionId });
          router.replace("/");
        } else {
          console.error(JSON.stringify(signInAttemp, null, 2));
        }
      } catch (error) {
        console.error(JSON.stringify(error, null, 2));
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={email}
        placeholder="Enter email"
        onChangeText={(email) => setEmail(email)}
      />
      {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {errors.password && (
        <Text style={{ color: "red" }}>{errors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.linkText}>Don't have a accoount?</Text>
        <Link href={`/${"sign-up"}`}>
          <Text style={styles.linkButton}>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    marginRight: 14,
    fontSize: 14,
  },
  linkButton: {
    fontSize: 14,
    color: "#007aff",
    fontWeight: "600",
  },
});

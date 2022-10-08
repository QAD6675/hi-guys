import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, Button, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Context from "../context/Context";
import { signIn, signUp } from "../firebase";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(false);
  const {
    theme: { colors },
  } = useContext(Context);

  async function handlePress() {
    if (!email || !password || email === "" || password.length < 8) {
      if (password.length < 8 || !password) {
        setV1(true);
        return
      }else{
        setV2(true);
        return
      }
    }
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <Modal
        visible={v1}
        animationType="fade"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>هل تعتبر هذه كلمة مرور</Text>
          <Button title="تعديل" onPress={() => setV1(false)}/>
        </View>
      </Modal>
      <Modal
        visible={v2}
        animationType="fade"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>هل تعتبر هذا بريدا الاكترونيا</Text>
          <Button title="تعديل" onPress={() => setV2(false)}/>
        </View>
      </Modal>
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        مرحبا بك في hi-guys
      </Text>
      <Image
        source={require("../assets/chat.png")}
        style={{ width: 180, height: 180 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="البريد الاكتروني"
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
          }}
        />
        <TextInput
          placeholder="كلمة المرور"
          textAlign="right"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            marginTop: 20,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "انشاء حساب" : "اعادة التسجيل"}
            disabled={!password || !email}
            color={colors.secondary}
            onPress={handlePress}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <Text style={{ color: colors.secondaryText }}>
            {mode === "signUp"
              ? "لديك حساب بالفعل؟ اعد التسجيل"
              : "ليس لديك حساب ؟ انشاء واحد"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

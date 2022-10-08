import { Image } from "react-native";
import React from "react";

export default function Avatar({ size, user }) {
  return (
    <Image
      style={{ width: size, height: size, borderRadius: size }}
      source={user.PhotoURL ? {uri: user.PhotoURL}: require("../assets/icon-square.png")}
      resizeMode= "cover"
    />
  );
}

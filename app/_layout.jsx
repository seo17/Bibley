import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Slot } from "expo-router";

const RootLayout = () => {
  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
};

export default RootLayout;

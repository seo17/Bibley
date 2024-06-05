import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { findVerses, getVerse } from "../lib/fetchFromApi";

export default function App() {
  const [value, setValue] = useState("");
  const [match, setMatch] = useState([]);
  const [verse, setVerse] = useState("");
  const [error, setError] = useState("");

  const delayedMatch = useCallback(() => {
    const foundMatch = findVerses(value);

    if (foundMatch)
      setMatch((prev) => {
        return [...prev, ...foundMatch];
      });
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      delayedMatch(value);
    }, 1000); // Adjust the delay time as needed (e.g., 1000 milliseconds)

    return () => clearTimeout(timeoutId);
  }, [value, delayedMatch]);

  useEffect(() => {
    async function fetchVerse() {
      if (match.length > 0) {
        const latestVerseIndex = match.length - 1;
        const latestVerse = match[latestVerseIndex];

        try {
          const text = await getVerse(latestVerse);
          setVerse(text);
        } catch (err) {
          setError(err.message);
        }
      }
    }
    fetchVerse();
  }, [match]);

  const addVerse = () => {
    setValue((prev) => {
      const newText = prev + `\n\n"${verse}"`;
      return newText;
    });

    setVerse("");
  };
  // const addVerse = () => {
  //     if (verse) {
  //       setValue((prev) => {
  //         const newText = prev + `\n\n"${verse}"`;
  //         return newText;
  //       });
  //     }
  //   }
  // };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-row flex-wrap w-full h-full items-start justify-center bg-white border border-yellow-400">
        <TextInput
          className="w-full px-0 border border-red-700"
          placeholder="Type"
          multiline={true}
          numberOfLines={4}
          onChange={(event) => setValue(event.nativeEvent.text)}
          value={value}
        />
        <View className="">
          <TouchableOpacity
            className={`p-4 border border-slate-400 rounded-lg ${
              verse === "" ? "bg-none" : "bg-red-200"
            } `}
            onPress={addVerse}
          >
            <Text>Add Verse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

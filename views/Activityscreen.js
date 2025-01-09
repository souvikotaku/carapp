import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import BookingCards from "./BookingCards";

const ActivityScreen = () => {
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  const fetchData = () => {
    fetch("https://carbackend-cnuy.onrender.com/api/user/fetch")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Using useFocusEffect to refresh the data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchData(); // Fetch data when the screen comes into focus
    }, []) // Empty dependency array ensures this runs only when the screen is focused
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: "2%",
          paddingBottom: "1%",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Text
          style={{
            fontFamily: "Nunito",
            color: "#475467",
            fontSize: 16,
          }}
        >
          Showing <Text style={{ color: "#f00036" }}>{data?.length}</Text>{" "}
          bookings
        </Text>
      </View>
      <BookingCards data={data} />
    </SafeAreaView>
  );
};

export default ActivityScreen;

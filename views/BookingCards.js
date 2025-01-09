import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

const BookingCards = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id} // Unique key for each item
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.service}</Text>
          <Text style={styles.subtitle}>Location: {item.location}</Text>
          <Text style={styles.subtitle}>Place: {item.place}</Text>
          <Text style={styles.text}>Date & Time: {item.timeanddate}</Text>
          <Text style={styles.text}>Vehicle: {item.vehicle}</Text>
          <Text style={styles.text}>Vehicle Number: {item.vehiclenumber}</Text>
          <Text style={styles.price}>Total Price: AED {item.totalprice}</Text>
        </View>
      )}
      contentContainerStyle={styles.container} // Padding for list content
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f00036",
    marginTop: 10,
  },
});

export default BookingCards;

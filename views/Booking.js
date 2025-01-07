import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Alert } from "react-native";
import showroom2 from "./assets/showroom2.png";
import profilepic from "./assets/profilepic.png";

import { LinearGradient } from "expo-linear-gradient"; // For gradient button

import {
  productObject,
  productObjectarraycartremove,
  clearArraycart,
} from "../redux/dataSlice";
import { useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rating, AirbnbRating } from "react-native-ratings";
import Toast from "react-native-toast-message";
import profileback from "./assets/profileback.png";

const { width } = Dimensions.get("window");

// import Carousel from "react-native-snap-carousel";

function Bookingscreen({ navigation }) {
  const dispatch = useDispatch();

  const viewAlldata = useSelector((state) => state.data.viewAll);
  const bookingdata = useSelector((state) => state.data.bookingdata);
  console.log("bookingdata", bookingdata);
  //   console.log("productArrayreduxcart", productArrayreduxcart);
  // console.log("productArrayobject", productArrayobject);

  // console.log("productArrayredux", productArrayredux);

  const [clickedHearts, setClickedHearts] = useState({}); // Object to track heart states by index
  const [showabout, setshowabout] = useState(false); // Object to track heart states by index
  const [selectedLocation, setSelectedLocation] = useState(
    "Perfect Spot Auto Spa"
  );
  const [selectedVehicle, setSelectedVehicle] = useState(
    "Lamborghini Aventador"
  );

  const toggleHeart = (index) => {
    setClickedHearts((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the heart for the specific index
    }));
  };

  return (
    <View style={styles.container}>
      {/* <Image source={bookingdata.thumbnail} style={styles.backgroundImage} /> */}
      <Image
        source={bookingdata.thumbnail}
        style={{
          top: 30,
          position: "absolute",
          margin: "auto",
          height: 220,
          width: "100%",
          // borderRadius: 10,
        }}
      />
      <View
        style={{
          height: 300,
          width: "100%",
          flex: 1,
          //   backgroundColor: "lightblue",
          justifyContent: "space-between",
        }}
      >
        <View
        //   style={{
        //     backgroundColor: "lightblue",
        //   }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: -10,
            }}
          >
            <View
              style={{
                paddingLeft: "5%",
                paddingRight: "1%",
                marginTop: "4%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#F8F9FB",
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  elevation: 5,
                  shadowColor: "black",
                }}
                onPress={() => {
                  navigation.navigate("Carwashprofile");
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={"black"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: "4%",
                //   backgroundColor: "pink",
                flex: 1,
                alignItems: "start",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  //   fontWeight: "bold",
                }}
              >
                Booking
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: "44%",
              paddingBottom: "3%",

              paddingLeft: "5%",
              paddingRight: "5%",
              //   backgroundColor: "pink",
            }}
          >
            <Text
              style={{
                // marginTop: "1%",
                fontSize: 16,
              }}
            >
              {bookingdata?.title}
            </Text>
            <Text
              style={{
                marginTop: "2%",
                fontSize: 12,
              }}
            >
              {bookingdata?.desc}
            </Text>
          </View>

          <ScrollView
            style={{
              // paddingLeft: "5%",
              // paddingRight: "5%",
              // marginBottom: 430,
              backgroundColor: "#EAECF0",
              height: "63%",
            }}
          >
            <View
              style={{
                ...styles.container3,
                paddingTop: "4%",
                marginTop: "4%",
                height: 315,
              }}
            >
              {/* Select Date & Time */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select Date & Time</Text>
                <TouchableOpacity style={styles.dateTimeInput}>
                  <Text style={styles.dateTimeText}>
                    3 March 2024 - 4:00 PM
                  </Text>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#fd267d"
                    style={{
                      marginRight: "6%",
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* Choose Preferred Location */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Please choose preferred location
                </Text>

                {/* Perfect Spot Auto Spa */}
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    selectedLocation === "Perfect Spot Auto Spa" &&
                      styles.selectedOption,
                  ]}
                  onPress={() => setSelectedLocation("Perfect Spot Auto Spa")}
                >
                  <View style={styles.radioContent}>
                    <View>
                      <Text style={styles.radioText}>
                        Perfect Spot Auto Spa
                      </Text>
                      <Text style={styles.radioSubText}>
                        Deira, Dubai, United Arab Emirates
                      </Text>
                    </View>
                    <View style={styles.radioCircle}>
                      {selectedLocation === "Perfect Spot Auto Spa" && (
                        <View style={styles.radioInnerCircle} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Home Service */}
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    selectedLocation === "Home Service" &&
                      styles.selectedOption,
                  ]}
                  onPress={() => setSelectedLocation("Home Service")}
                >
                  <View style={styles.radioContent}>
                    <View>
                      <Text style={styles.radioText}>Home Service</Text>
                      <Text style={styles.radioSubText}>
                        Saved Address: Nasa Bldg. Deira, Dubai, UAE
                      </Text>
                    </View>
                    <View style={styles.radioCircle}>
                      {selectedLocation === "Home Service" && (
                        <View style={styles.radioInnerCircle} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                ...styles.container3,
                paddingTop: "4%",
                height: 275,
              }}
            >
              {/* Choose Preferred Location */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Please choose your vehicle
                </Text>

                {/* Perfect Spot Auto Spa */}
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    selectedVehicle === "Lamborghini Aventador" &&
                      styles.selectedOption,
                  ]}
                  onPress={() => setSelectedVehicle("Lamborghini Aventador")}
                >
                  <View style={styles.radioContent}>
                    <View>
                      <Text style={styles.radioText}>
                        Lamborghini Aventador
                      </Text>
                      <Text style={styles.radioSubText}>AE 123456</Text>
                    </View>
                    <View style={styles.radioCircle}>
                      {selectedVehicle === "Lamborghini Aventador" && (
                        <View style={styles.radioInnerCircle} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Home Service */}
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    selectedVehicle === "Nissan Patrol" &&
                      styles.selectedOption,
                  ]}
                  onPress={() => setSelectedVehicle("Nissan Patrol")}
                >
                  <View style={styles.radioContent}>
                    <View>
                      <Text style={styles.radioText}>Nissan Patrol</Text>
                      <Text style={styles.radioSubText}>PLATE 12345</Text>
                    </View>
                    <View style={styles.radioCircle}>
                      {selectedVehicle === "Nissan Patrol" && (
                        <View style={styles.radioInnerCircle} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // dispatch(setbookingdata(item));
                    navigation.navigate("Payment");
                  }}
                >
                  <LinearGradient
                    colors={["#ff7e5f", "#fd267d"]} // Gradient colors
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.callButton2}
                  >
                    <View style={styles.iconTextContainer}>
                      <Text style={styles.callButtonText}>Confirm Booking</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <Toast />
    </View>
  );
}

export default Bookingscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 40,

    // width: "100%",
  },
  iconContainer: {
    position: "absolute",
    top: 10, // Adjust the vertical position
    right: 10, // Adjust the horizontal position
    flexDirection: "row",
    gap: 10,
  },
  profileButton: {
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    padding: 4,
    borderRadius: 20,
  },
  shareButton: {
    // backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    padding: 4,
    borderRadius: 20,
  },
  heartButton: {
    // backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    padding: 4,
    borderRadius: 20,
  },
  detailheader: {
    fontSize: 50,
    fontWeight: "bold",
    lineHeight: 50,
  },
  slide: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  containerchat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  containerchatmain: {
    padding: 15,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)", // Adjusted shadow
    borderRadius: 20,
    backgroundColor: "white",
  },
  containerchat2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute", // Set the image in the background
    width: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "contain", // Ensures the image covers the screen
  },
  chatButton: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#f2f4f7", // Border color
    backgroundColor: "#f2f4f7", // Light background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  chatButton2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#fd267d", // Border color
    backgroundColor: "#fff5f5", // Light background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  chatButtonText: {
    textAlign: "center",
    // color: "#fd267d", // Text color matching border
    fontWeight: "bold",
  },
  chatButtonText2: {
    textAlign: "center",
    color: "#fd267d", // Text color matching border
    fontWeight: "bold",
  },
  callButton: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  callButton2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: "1%",
  },
  callButtonText: {
    textAlign: "center",
    color: "#fff", // White text color
    fontWeight: "bold",
  },
  callButtonTextnew: {
    textAlign: "center",
    // color: "#fff", // White text color
    fontWeight: "bold",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center", // Center icon and text vertically
    justifyContent: "center",
  },
  iconStyle: {
    marginRight: 8, // Spacing between the icon and text
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  premiumLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(240, 0, 54, 0.6)", // Glass effect with #f00036 and 30% opacity
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent", // Slightly more opaque border for a subtle effect
  },
  featuredLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 123, 255, 0.6)", // Glass effect with #f00036 and 30% opacity
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent", // Slightly more opaque border for a subtle effect
  },
  premiumText: {
    color: "white", // Orange color for text
    // fontWeight: "bold",
  },
  prodimage2: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  buttonnew: {
    height: 200,
    width: "50%",
  },
  pricetext: {
    fontSize: 16,
    // fontWeight: "bold",
    color: "#2A4BA0",
  },
  pricetext2div: {
    backgroundColor: "#2A4BA0",
    marginLeft: "5%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 70,
  },
  container3: {
    backgroundColor: "white",
    fontFamily: "Nunito",
    padding: "5%",
    // paddingLeft: "5%",
    // paddingRight: "5%",
    // paddingTop: "5%",
    marginBottom: "5%",
    // flex: 1,
    // marginTop: 20,
    // marginBottom: "8%",
    // paddingBottom: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
    // backgroundColor: "pink",
    width: "100%",
    // height: 380,
  },
  pricetext2: {
    fontSize: 12,
    // paddingLeft: "5%",
    // fontWeight: "bold",
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2A4BA0",
    width: "48%",
    height: 70,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#2A4BA0",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTimeInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#FDA29B",
    borderRadius: 10,
    backgroundColor: "#FFEEED",
  },
  dateTimeText: {
    color: "#333",
    fontSize: 14,
  },
  radioOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: "#FDA29B",
    backgroundColor: "#FFEEED",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fd267d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  radioContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1, // Ensures content and radio are spaced properly
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#fd267d",
  },
  radioText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  radioSubText: {
    fontSize: 10,
    color: "#777",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#2A4BA0",
    borderWidth: 1,
    borderColor: "#2A4BA0",
    width: "100%",
    height: 70,
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text3: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#1E222B",
  },
  text4: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#8891A5",
  },
  prodimage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

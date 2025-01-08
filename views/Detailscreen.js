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

import { LinearGradient } from "expo-linear-gradient"; // For gradient button

import {
  productObject,
  productObjectarraycartremove,
  clearArraycart,
  setfrompage,
} from "../redux/dataSlice";
import { useDispatch } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rating, AirbnbRating } from "react-native-ratings";
import Toast from "react-native-toast-message";
import dubai1 from "./assets/dubai1.png";

const { width } = Dimensions.get("window");

// import Carousel from "react-native-snap-carousel";

function Detailscreen({ navigation }) {
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.data.productid);
  const frompage = useSelector((state) => state.data.frompage);
  const viewAlldata = useSelector((state) => state.data.viewAll);
  const placedata = useSelector((state) => state.data.place);
  const productArrayredux = useSelector(
    (state) => state.data.productobjectarray
  );

  const productArrayreduxcart = useSelector(
    (state) => state.data.productobjectarraycart
  );

  //   console.log("productArrayreduxcart", productArrayreduxcart);
  const productArrayobject = useSelector((state) => state.data.productobject);
  // console.log("productArrayobject", productArrayobject);

  // console.log("productArrayredux", productArrayredux);

  const [productdetails, setProductdetails] = useState();
  const [favorites, setFavorites] = useState();
  const [incart, setIncart] = useState();
  const [priceTotal, setPriceTotal] = useState();
  const [cartData, setCartData] = useState();
  const [clickedHearts, setClickedHearts] = useState({}); // Object to track heart states by index

  const toggleHeart = (index) => {
    setClickedHearts((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the heart for the specific index
    }));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 300,
          width: "100%",
          flex: 1,
          //   backgroundColor: "pink",
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
              marginTop: 0,
              // backgroundColor: "red",
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
                  // backgroundColor: "#F8F9FB",
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  // borderRadius: 70,
                  // elevation: 5,
                  // shadowColor: "black",
                }}
                onPress={() => {
                  navigation.navigate("Carwashdetail");
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
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {placedata}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: "4%",
              // paddingBottom: "4%",

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
              Showing{" "}
              <Text style={{ color: "#f00036" }}>{viewAlldata?.length}</Text>{" "}
              results in {placedata}
            </Text>
          </View>

          <ScrollView
            style={{
              // paddingLeft: "5%",
              // paddingRight: "5%",
              marginBottom: 90,
              backgroundColor: "#EAECF0",
              // height: "100%",
            }}
          >
            {viewAlldata?.map((item, index) => (
              <View style={styles.container3} key={index}>
                <View>
                  <Image
                    source={item.thumbnail}
                    style={{
                      margin: "auto",
                      height: 220,
                      width: "100%",
                      borderRadius: 10,
                    }}
                  />
                  {/* Label */}
                  <View
                    style={
                      index === 0 ? styles.premiumLabel : styles.featuredLabel
                    }
                  >
                    <Text style={styles.premiumText}>{item.label}</Text>
                  </View>
                  {/* Buttons */}
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      style={styles.profileButton}
                      onPress={() => {
                        dispatch(setfrompage("details"));
                        navigation.navigate("Carwashprofile");
                      }}
                    >
                      <AntDesign name="user" color={"white"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                      <AntDesign
                        name="sharealt"
                        color={placedata !== "Sharjah" ? "white" : "black"}
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.heartButton}
                      onPress={() => toggleHeart(index)} // Toggle heart state for this index
                    >
                      <AntDesign
                        name={clickedHearts[index] ? "heart" : "hearto"} // Check heart state for this index
                        color={
                          clickedHearts[index]
                            ? "red"
                            : placedata !== "Sharjah"
                            ? "white"
                            : "black"
                        }
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    paddingTop: "3%",
                  }}
                >
                  <View
                    style={{
                      // backgroundColor: "pink",
                      flexDirection: "row",
                      alignItems: "center", // Align items vertically in the center
                      justifyContent: "space-between", // Distribute space between the texts
                      paddingHorizontal: 0.1, // Add some horizontal padding
                      // paddingVertical: 5, // Add some vertical padding
                    }}
                  >
                    <Text
                      style={{
                        color: "#f00036",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {item?.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        // color: "#f00036",
                      }}
                      // onPress={() => {
                      //   navigation.navigate("Details"); // Replace 'CarWashPage' with your target route
                      // }}
                    >
                      {item?.distance}
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginTop: "1%",
                      fontSize: 16,
                    }}
                  >
                    {item?.title}
                  </Text>
                  <Text
                    style={{
                      marginTop: "1%",
                      fontSize: 12,
                    }}
                  >
                    {item?.desc}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: "4%",
                    }}
                  >
                    <Image
                      source={item?.icon}
                      style={{
                        height: 50,
                        width: 50,
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Location:{" "}
                        <Text style={{ fontWeight: "normal" }}>
                          {item?.location}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Posted on:{" "}
                        <Text style={{ fontWeight: "normal" }}>
                          {item?.postedon}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Posted By:{" "}
                        <Text style={{ fontWeight: "normal" }}>
                          {item?.postedby}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.containerchat}>
                    <TouchableOpacity style={styles.chatButton}>
                      <Text style={styles.chatButtonText}>Chat</Text>
                    </TouchableOpacity>

                    {/* Call Button */}
                    <LinearGradient
                      colors={["#ff7e5f", "#fd267d"]} // Gradient colors
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.callButton}
                    >
                      <Text style={styles.callButtonText}>Call</Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <Toast />
    </View>
  );
}

export default Detailscreen;

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
    paddingTop: 20,
    paddingBottom: 20,
  },
  chatButton: {
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
    color: "#fd267d", // Text color matching border
    fontWeight: "bold",
  },
  callButton: {
    width: "48%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  callButtonText: {
    textAlign: "center",
    color: "#fff", // White text color
    fontWeight: "bold",
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
    height: 490,
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

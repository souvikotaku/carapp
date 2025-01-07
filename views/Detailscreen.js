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
import showroom from "./assets/showroom.png";
import showroom2 from "./assets/showroom2.png";
import showroom3 from "./assets/showroom3.png";
import showroom4 from "./assets/showroom4.png";

import showroomicon from "./assets/showroomicon.png";
import showroomicon2 from "./assets/showroomicon2.png";
import showroomicon3 from "./assets/showroomicon3.png";
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

  const Item = ({ title, item }) => (
    // <View style={styles.item}>
    //   <Text style={styles.title}>{title}</Text>
    // </View>
    <View style={styles.prodcarddiv}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 20,
          paddingBottom: 20,
          paddingRight: 10,
          // backgroundColor: "red",
          borderBottomColor: "#EBEBFB",
          borderBottomWidth: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 50,
          }}
        >
          <Image source={{ uri: item?.thumbnail }} style={styles.prodimage} />
        </View>
        <View
          style={{
            //   backgroundColor: "yellow",
            width: "45%",
          }}
        >
          <Text>{item?.title}</Text>
          <Text
          //   style={{
          //     marginTop: 10,

          //   }}
          >{`$${item?.price}`}</Text>
        </View>
        <View
          style={{
            //   backgroundColor: "yellow",
            flexDirection: "row",
            // marginLeft: "60%",
          }}
        >
          <View
            style={{
              // padding: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F8F9FB",
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 70,
                elevation: 5,
                shadowColor: "black",
              }}
              onPress={() => {
                // navigation.navigate("Details");
                handleClickremove(item);
              }}
            >
              <Feather name="minus" color={"black"} size={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14 }}>{item?.prices?.length}</Text>
          </View>
          <View
            style={{
              // padding: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#F8F9FB",
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 70,
                elevation: 5,
                shadowColor: "black",
              }}
              onPress={() => {
                // navigation.navigate("Details");
                handleClickadd(item);
              }}
            >
              <Feather name="plus" color={"black"} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.title} item={item} />;

  useEffect(() => {
    axios
      // .get("https://dummyjson.com/products")
      .get(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        // console.log("data", res?.data);
        setProductdetails(res?.data);
        dispatch(productObject(res?.data));

        // setProductdata(res?.data?.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClickadd = (item) => {
    // Create a copy of the data to avoid mutating the state directly
    const newData = [...cartData];
    // const index = newData.findIndex((element) => element === item);

    const indexnew = newData.findIndex((el) => el.id === item?.id);
    // console.log("index", indexnew);
    // console.log("item", item);

    newData[indexnew].prices?.push(item?.price);

    // Update the state with the new data
    setCartData(newData);
    // console.log("newData", newData);

    // dispatch(productObjectarraycart(item));
    // dispatch(productObjectarraycartadd(newData));
    // setCartData(newData);

    const priceArray = [];
    newData.map((item) => {
      const objnew = {
        id: item.id,
        price: item.price,
        prices: item?.prices,
      };
      priceArray.push(objnew);
    });

    // console.log("priceArray", priceArray);

    const totalPrice = priceArray.reduce((acc, obj) => {
      const priceSum = obj.prices.reduce((sum, value) => sum + value, 0);
      return acc + priceSum;
    }, 0);

    setPriceTotal(totalPrice);
  };

  const handleClickremove = (item) => {
    // Create a copy of the data to avoid mutating the state directly
    const newData = [...cartData];
    // const index = newData.findIndex((element) => element === item);

    const indexnew = newData.findIndex((el) => el.id === item?.id);
    // console.log("index", indexnew);
    // console.log("item", item);
    newData[indexnew].prices?.pop();

    // Update the state with the new data
    setCartData(newData);
    // console.log("newData", newData);
    dispatch(productObjectarraycartremove(item));

    const priceArray = [];
    newData.map((item) => {
      //   dispatch(priceAddedcart(item?.price));
      const objnew = {
        id: item.id,
        price: item.price,
        prices: item?.prices,
      };
      priceArray.push(objnew);
    });

    // console.log("priceArray", priceArray);
    newData?.map((item, index) => {
      if (item.prices?.length === 0) {
        newData.splice(index, 1);
      }
    });

    const totalPrice = priceArray.reduce((acc, obj) => {
      const priceSum = obj.prices.reduce((sum, value) => sum + value, 0);
      return acc + priceSum;
    }, 0);

    setPriceTotal(totalPrice);
    console.log("cartData", cartData);

    // cartData?.map((item)=>{
    //     if (item?.prices === undefined){
    //         dispatch(clearArraycart());
    //     }
    // })

    // if (cartData?.prices === undefined) {
    //   //   console.log("cartData", cartData);
    //   //   dispatch(clearArraycart());
    //   console.log("removed all");
    // }
  };

  // useEffect(() => {
  //   function itemExistsincart(id) {
  //     return productArrayreduxcart.some(function (el) {
  //       return el.id === id;
  //     });
  //   }
  //   itemExistsincart(productId);
  //   // console.log("itemExistsinfavorite", itemExistsinfavorite(productId));
  //   if (itemExistsincart(productId) === true) {
  //     setIncart(true);
  //   } else {
  //     setIncart(false);
  //   }
  // }, []);

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
              results in Dubai
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
                    <TouchableOpacity style={styles.shareButton}>
                      <AntDesign name="sharealt" color={"white"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.heartButton}
                      onPress={() => toggleHeart(index)} // Toggle heart state for this index
                    >
                      <AntDesign
                        name={clickedHearts[index] ? "heart" : "hearto"} // Check heart state for this index
                        color={clickedHearts[index] ? "red" : "white"}
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
            {/* <View style={styles.container3}>
              <View>
                <Image
                  source={dubai1}
                  // style={{ width: "100%", height: 250 }}
                  style={{
                    margin: "auto",
                    // height: "92%",
                    width: "100%",
                    borderRadius: 10,
                    // objectFit: "contain",
                  }}
                />
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
                    AED 150
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
                    1.2 km away
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: "1%",
                    fontSize: 16,
                  }}
                >
                  Car Detailing
                </Text>
                <Text
                  style={{
                    marginTop: "1%",
                    fontSize: 12,
                  }}
                >
                  Special Discounted Offer For Ceramic Coating At & Interior
                  Detailing With Steam At Home.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: "4%",
                  }}
                >
                  <Image
                    source={showroomicon3}
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
                        Deira, Dubai, United Arab Emirates
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
                      <Text style={{ fontWeight: "normal" }}>14/3/24</Text>
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
                        A Car Wash & Detailing
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.containerchat}>
                  <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.chatButtonText}>Chat</Text>
                  </TouchableOpacity>

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
            </View> */}

            {/* <View style={styles.container3}>
              <View>
                <Image
                  source={dubai1}
                  // style={{ width: "100%", height: 250 }}
                  style={{
                    margin: "auto",
                    // height: "92%",
                    width: "100%",
                    borderRadius: 10,
                    // objectFit: "contain",
                  }}
                />
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
                    AED 150
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
                    1.2 km away
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: "1%",
                    fontSize: 16,
                  }}
                >
                  Car Detailing
                </Text>
                <Text
                  style={{
                    marginTop: "1%",
                    fontSize: 12,
                  }}
                >
                  Special Discounted Offer For Ceramic Coating At & Interior
                  Detailing With Steam At Home.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: "4%",
                  }}
                >
                  <Image
                    source={showroomicon3}
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
                        Deira, Dubai, United Arab Emirates
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
                      <Text style={{ fontWeight: "normal" }}>14/3/24</Text>
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
                        A Car Wash & Detailing
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.containerchat}>
                  <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.chatButtonText}>Chat</Text>
                  </TouchableOpacity>

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
            </View> */}

            {/* <View style={styles.container3}>
              <View>
                <Image
                  source={dubai1}
                  // style={{ width: "100%", height: 250 }}
                  style={{
                    margin: "auto",
                    // height: "92%",
                    width: "100%",
                    borderRadius: 10,
                    // objectFit: "contain",
                  }}
                />
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
                    AED 150
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
                    1.2 km away
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: "1%",
                    fontSize: 16,
                  }}
                >
                  Car Detailing
                </Text>
                <Text
                  style={{
                    marginTop: "1%",
                    fontSize: 12,
                  }}
                >
                  Special Discounted Offer For Ceramic Coating At & Interior
                  Detailing With Steam At Home.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: "4%",
                  }}
                >
                  <Image
                    source={showroomicon3}
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
                        Deira, Dubai, United Arab Emirates
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
                      <Text style={{ fontWeight: "normal" }}>14/3/24</Text>
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
                        A Car Wash & Detailing
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.containerchat}>
                  <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.chatButtonText}>Chat</Text>
                  </TouchableOpacity>

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
            </View> */}
          </ScrollView>
        </View>
        {/* {cartData?.length > 0 ? ( */}
        {/* <View
          style={{
            // backgroundColor: "yellow",
            // height: "50%",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <View
            style={{
              backgroundColor: "#F8F9FB",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              elevation: 5,
              shadowColor: "black",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "red",
                padding: "10%",
                paddingBottom: "5%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#616A7D",
                }}
              >
                Subtotal
              </Text>
              <Text>{`$${priceTotal}`}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "red",
                padding: "10%",
                paddingTop: "0%",
                paddingBottom: "5%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#616A7D",
                }}
              >
                Delivery
              </Text>
              <Text>{`$${10}`}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "red",
                padding: "10%",
                paddingTop: "0%",
                paddingBottom: "5%",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#616A7D",
                }}
              >
                Total
              </Text>
              <Text>{`$${priceTotal + 10}`}</Text>
            </View>
            <View
              style={{
                paddingTop: 20,
                paddingLeft: "6%",
                paddingRight: "6%",
                paddingBottom: "7%",
                // textAlign: "center",
                // backgroundColor: "pink",
                flexDirection: "row",
                width: "100%",
                // justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  Alert.alert("Thanks ", "for the purchase", [
                    // {
                    //   text: "Ask me later",
                    //   onPress: () => console.log("Ask me later pressed"),
                    // },
                    // {
                    //   text: "Cancel",
                    //   onPress: () => console.log("Cancel Pressed"),
                    //   style: "cancel",
                    // },
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.navigate("Home");
                      },
                    },
                  ]);
                }}
              >
                <Text style={styles.text2}>{"Proceed To checkout"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
        {/* ) : (
          <>
            <Image
              source={require("./assets/pika.png")}
              style={styles.prodimage2}
            />
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: 150,
                }}
              >
                Cart Empty
              </Text>
            </View>
          </>
        )} */}
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

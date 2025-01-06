import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import Motors from "./assets/categories/Motors.png";
import motorbikes from "./assets/categories/motorbikes.png";
import boats from "./assets/categories/boats.png";
import carrecovery from "./assets/categories/carrecovery.png";
import carservice from "./assets/categories/carservice.png";
import carwash from "./assets/categories/carwash.png";
import Showrooms from "./assets/categories/Showrooms.png";
import numberplates from "./assets/categories/numberplates.png";
import parts from "./assets/categories/parts.png";
import slide from "./assets/slide.png";
import showroom from "./assets/showroom.png";
import showroomicon from "./assets/showroomicon.png";
import Carousel from "react-native-reanimated-carousel";

import axios from "axios";
import {
  productId,
  fromPage,
  productObjectarraycart,
  productObjectarray,
} from "../redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const { width } = Dimensions.get("window");

const Homescreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const carouselRef = useRef(null);
  const carouselRefshowroom = useRef(null);

  const [productdata, setProductdata] = useState();
  const [showsearch, setShowSearch] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current; // Initial height is 0

  const [favorites, setFavorites] = useState();
  const [favoritearray, setFavoritearray] = useState();
  const [cartarray, setCartarray] = useState();
  const productArrayredux = useSelector(
    (state) => state.data.productobjectarray
  );

  const productArrayreduxcart = useSelector(
    (state) => state.data.productobjectarraycart
  );
  const Item = ({ title, item }) => {
    return (
      // <View style={styles.item}>
      //   <Text style={styles.title}>{title}</Text>
      // </View>
      <View style={styles.prodcarddiv}>
        <TouchableOpacity
          // onPress={() => {
          //   dispatch(productId(item?.id));
          //   navigation.navigate("Details", { item });
          // }}
          onPress={() => {
            if (item.title === "Car Wash") {
              navigation.navigate("Carwashdetail"); // Replace 'CarWashPage' with your target route
            } else {
              alert(`Click on Car Wash option`); // Handle other items or add navigation
            }
          }}
        >
          <View>
            <Image source={item?.thumbnail} style={styles.prodimage} />

            <Text style={{ fontSize: 10, textAlign: "center" }}>
              {item?.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const categories = [
    {
      id: 1,
      title: "Motors",
      thumbnail: Motors,
    },
    {
      id: 2,
      title: "Motorbikes",
      thumbnail: motorbikes,
    },
    {
      id: 3,
      title: "Showrooms",
      thumbnail: Showrooms,
    },
    {
      id: 4,
      title: "Parts and Accesories",
      thumbnail: parts,
    },
    {
      id: 5,
      title: "Number PLates",
      thumbnail: numberplates,
    },
    {
      id: 6,
      title: "Car Service",
      thumbnail: carservice,
    },
    {
      id: 7,
      title: "Car Wash",
      thumbnail: carwash,
    },
    {
      id: 8,
      title: "Car Recovery",
      thumbnail: carrecovery,
    },
    {
      id: 9,
      title: "Boats",
      thumbnail: boats,
    },
  ];

  const showrooms = [
    {
      id: 1,
      title: "Toyota Motors",
      thumbnail: showroom,
      distance: "1.2 kms away",
      icon: showroomicon,
    },
    {
      id: 2,
      title: "Toyota Motors",
      thumbnail: showroom,
      distance: "1.2 kms away",
      icon: showroomicon,
    },
    {
      id: 3,
      title: "Toyota Motors",
      thumbnail: showroom,
      distance: "1.2 kms away",
      icon: showroomicon,
    },
  ];

  useEffect(() => {
    axios
      // .get("https://dummyjson.com/products")
      .get("https://dummyjson.com/products")
      .then((res) => {
        // console.log("data", res?.data?.products);

        // setProductdata(res?.data?.products);
        setProductdata(categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const imagesslide = [
    slide, // Replace with your actual image paths
    slide,
    slide,
  ];

  const imagesslideshowroom = [
    showroom, // Replace with your actual image paths
    showroom,
    showroom,
  ];
  const renderItem = ({ item }) => <Item title={item.title} item={item} />;

  const renderItemslide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} />
    </View>
  );

  const toggleSearch = () => {
    if (showsearch) {
      // Slide up (hide)
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300, // Animation duration in ms
        useNativeDriver: false, // Height cannot use native driver
      }).start(() => setShowSearch(false)); // Hide after animation completes
    } else {
      // Slide down (show)
      Animated.timing(animationValue, {
        toValue: 100, // Target height in px
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowSearch(true)); // Show content after animation completes
    }
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.container2}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.nameheading}>
            <Entypo name="location-pin" color={"#f00036"} size={30} /> Dubai
          </Text>
          <TouchableOpacity
            style={{
              // backgroundColor: "#F8F9FB",
              width: 35,
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 70,
              flexDirection: "row",
              // elevation: 5,
              // shadowColor: "black",
            }}
            onPress={toggleSearch}
          >
            <Ionicons name="search" color={"black"} size={30} />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            height: animationValue, // Animate the height
            overflow: "hidden", // Prevent content from spilling out
          }}
        >
          {/* {showsearch && ( */}
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Search Categories"
              placeholderTextColor="lightgray"
            />
            <Ionicons
              name="search-outline"
              color={"black"}
              size={20}
              style={{ position: "absolute", left: 10, top: 37 }}
            />
          </View>
          {/* )} */}
        </Animated.View>

        <ScrollView>
          <View style={styles.container4}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                paddingTop: 10,
              }}
              numColumns={3} // Set to 3 columns
              data={productdata && productdata}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            {/* </ScrollView> */}
          </View>
          <View
            style={{
              pointerEvents: "none",
            }}
          >
            <Carousel
              width={width}
              height={width / 2}
              loop={true}
              autoPlay={true}
              data={imagesslide}
              scrollAnimationDuration={1000}
              renderItem={renderItemslide}

              // sliderWidth={"auto"}
              // itemWidth={"auto"}
            />
          </View>
          <View style={styles.container3}>
            <View
              style={{
                // backgroundColor: "pink",
                flexDirection: "row",
                alignItems: "center", // Align items vertically in the center
                justifyContent: "space-between", // Distribute space between the texts
                paddingHorizontal: 1, // Add some horizontal padding
                paddingVertical: 5, // Add some vertical padding
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Top Showrooms
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#f00036",
                  }}
                >
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={
                {
                  // backgroundColor: "red",
                  // height: "100%",
                }
              }
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {showrooms?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: 170,
                      // height: 300,
                      // paddingLeft: 7,
                      // paddingRight: 7,
                      // backgroundColor: index === 0 ? "pink" : null,
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={item.thumbnail}
                        // style={{ width: "100%", height: 250 }}
                        style={{
                          margin: "auto",
                          height: "92%",
                          width: "92%",
                          objectFit: "contain",
                          marginTop: -12,
                        }}
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: -25,
                        }}
                      >
                        <Image
                          source={item.icon}
                          style={{
                            height: 40,
                            width: 40,
                            marginRight: 8,
                            marginLeft: 8,
                            borderRadius: 5,
                          }}
                        />
                        <View>
                          <Text
                            style={{
                              color: "black",
                              fontSize: 12,
                              fontWeight: "bold",
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text style={{ color: "black", fontSize: 12 }}>
                            {item.distance}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
              {/* <Carousel
                ref={carouselRefshowroom}
                data={imagesslideshowroom}
                renderItem={renderItemshowroom}
                // sliderWidth={width} // Full width of the screen
                width={170} // Width of each item
                height={170}
                loop={true} // Enables infinite scrolling
                autoplay={true} // Automatically scrolls the carousel
                // autoplayDelay={1000} // Delay before autoplay starts
                // autoplayInterval={3000} // Interval between auto-scrolls
              /> */}
            </View>
          </View>
        </ScrollView>
      </View>

      <Toast />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: "center",
    justifyContent: "start",
  },
  container2: {
    // flex: 1,
    paddingTop: "13%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  prodcarddiv: {
    flex: 1, // Let the items adjust based on available space
    margin: 5, // Add margin between items
    alignItems: "center", // Center the content
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
    borderColor: "lightgray", // Black outline color
    borderWidth: 0.5,
  },

  container3: {
    // backgroundColor: "yellow",

    // flex: 1,
    marginTop: -17,
    marginBottom: "8%",
    // paddingBottom: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
    // backgroundColor: "pink",
    width: "100%",
    height: 210,
  },
  prodimage: {
    width: 60, // Reduce the size of the image
    height: 45,
    borderRadius: 10,
    margin: "auto", //
  },
  container4: {
    // flex: 1,
    // paddingTop: "3%",
    // paddingBottom: "5%",
    // paddingLeft: "5%",
    // paddingRight: "5%",
    backgroundColor: "white",
    width: "100%",
    // height: 360,
    // flex: 1,
    // flexDirection: "row",
  },
  nameheading: {
    textAlign: "left",
    // fontFamily: "Manrope",
    // fontWeight: "bold",
    fontSize: 22,
    lineHeight: 30,
  },
  slide: {
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: width * 0.9, // 90% of the screen width
    height: (width * 0.9) / 2, // Maintain a 2:1 aspect ratio
    resizeMode: "contain",
  },
  input: {
    height: 40,
    backgroundColor: "white",
    marginTop: 20,
    paddingLeft: 40,
    borderRadius: 28,
    height: 56,
    padding: 20,
    borderColor: "black", // Black outline color
    borderWidth: 0.5, // Thickness of the outline
  },
  letterone: {
    fontSize: 11,
    color: "#F8F9FB",
    opacity: 0.5,
  },
  letteroneright: {
    fontSize: 11,
    color: "#F8F9FB",
    opacity: 0.5,
    textAlign: "right",
  },
  lettertwo: {
    fontSize: 14,
    color: "#F8F9FB",
  },
  lettertworight: {
    fontSize: 14,
    color: "#F8F9FB",
    textAlign: "right",
  },
  recommendedheader: {
    fontSize: 30,
  },

  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

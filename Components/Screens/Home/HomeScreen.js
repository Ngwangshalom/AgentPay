import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Separators, Lists } from "../../extra";
import { colors } from "../../utils/colors";
import styles from "./styles";
import { NavigationService } from "../../../NavigationService";
import { getUserData } from "../../utils/storage";
import { APP_URL, CASHIN_IMAGE, CASHOUT_IMAGE } from "@env";
import MainHeader from "../../extra/Header/Default";
import services from "../mock/services.json";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const HomeScreen = () => {
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [userData, setUserData] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch exchange rates
  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(API_URL);
      setExchangeRates(response.data.rates);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  // Fetch dashboard details
  const fetchDashboardDetails = async () => {
    try {
      const response = await axios.get(`${APP_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${userData?.response?.records?.token}` },
      });
      const data = response.data.response.records;
      setDashboardDetails(data.transactions || []);
      setWallets(data.wallets || []);
    } catch (error) {
      console.error("Error fetching dashboard details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchDashboardDetails();
      fetchExchangeRates();
    }
  }, [userData]);

  // Render wallet item
  const renderWalletItem = ({ item }) => {
    const {
      currency_code = "XAF",
      available_balance = 0,
      currency_symbol = "",
      currency_path = "",
    } = item;

    const normalizedCurrencyCode = currency_code === "F.CFA" ? "XAF" : currency_code;
    const conversionRate = exchangeRates[normalizedCurrencyCode];
    const convertedAmount =
      conversionRate !== undefined
        ? `${conversionRate.toFixed(2)} ${normalizedCurrencyCode}`
        : "Unavailable";

    return (
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/free-photo/gradient-background-with-colorful-light-effect_53876-108143.jpg",
        }}
        style={styles.currencyCard}
        imageStyle={{ borderRadius: 15 }}
      >
        <Image source={{ uri: currency_path }} style={styles.flagIcon} />
        <View style={styles.balanceDetails}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.businessName}>
              {userData?.response?.records?.agent?.business_name || "Business Name"}
            </Text>
            <Text style={styles.packageType}>
              {userData?.response?.records?.agent?.package_name || "Package Name"}
            </Text>
          </View>
          <Text style={styles.balanceAmount}>
            {new Intl.NumberFormat().format(parseFloat(available_balance).toFixed(2))} {currency_symbol}
          </Text>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.conversionRate}>
            1 {normalizedCurrencyCode} = {convertedAmount}
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate("CashInScreen")}
              style={styles.quickActionButton}
            >
              <Text style={styles.actionButton}>Cash In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => NavigationService.navigate("CashOutScreen")}
              style={styles.quickActionButton}
            >
              <Text style={styles.actionButton}>Cash Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };

  // Render transaction item
  const renderTransactionItem = ({ item }) => {
    const { transaction_type, created_at, display_total = 0,  status } = item;
    return (
      <View style={styles.transactionCard}>
        <View style={styles.transactionImageContainer}>
          <Image
            source={{ uri: transaction_type === "Cashin" ? CASHIN_IMAGE : CASHOUT_IMAGE }}
            style={styles.transactionImage}
          />
        </View>
        <View style={styles.transactionDetails}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionType}>{transaction_type}</Text>
            <Text style={styles.transactionDate}>{created_at}</Text>
          </View>
          <View style={styles.transactionBody}>
            <Text style={styles.transactionAmount}>
           { display_total}
            </Text>
            <Text
              style={[
                styles.transactionStatus,
                { color: status === "Success" ? "green" : "red" },
              ]}
            >
              {status?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Sort wallets to display "XAF" first
  const sortedWallets = wallets.sort((a, b) =>
    a.currency_code === "F.CFA" || a.currency_code === "XAF" ? -1 : 1
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary, paddingBottom:50 }}>
      <MainHeader />
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <Separators.Default label="Account Overview" />
        <FlatList
          data={sortedWallets}
          renderItem={renderWalletItem}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
        <Separators.Default label="Services" />
        <Lists.ServicesList list={services} />
        <Separators.Default label="Recent Transactions" />
        <FlatList
          data={dashboardDetails.slice(0, 5)}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.transaction_id?.toString() || Math.random().toString()}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

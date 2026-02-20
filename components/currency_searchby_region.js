import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function CurrencySearchByNativeName() {
  const [keyword, setKeyword] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  async function fetchCountries() {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/independent?status=true"
      );
      const data = await response.json();
      setCountries(data);
      setFilteredData(data);
    } catch (error) {
      alert("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(text) {
    setKeyword(text);

    const filtered = countries.filter((item) => {
      const nativeNames = item.name.nativeName
        ? Object.values(item.name.nativeName)
        : [];

      return nativeNames.some((native) =>
        native.common.toLowerCase().includes(text.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }

  function openGoogleMaps(url) {
    Linking.openURL(url);
  }

  function renderItem({ item }) {
     const currencies = item.currencies
      ? Object.keys(item.currencies).map((key) => ({
          code: key,
          name: item.currencies[key].name,
          symbol: item.currencies[key].symbol,
        }))
      : [];

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: item.flags.png }} style={styles.flag} />
          <View style={{ flex: 1 }}>
            <Text style={styles.country}>{item.name.common}</Text>

            <Text style={styles.info}>
              🏛 Capital: {item.capital ? item.capital[0] : "N/A"}
            </Text>

            <Text style={styles.info}>
              👥 Population: {item.population.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          {currencies.map((cur) => (
            <Text key={cur.code} style={styles.currency}>
              💱 {cur.code} - {cur.name} ({cur.symbol})
            </Text>
          ))}
        </View>

        {item.maps?.googleMaps && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => openGoogleMaps(item.maps.googleMaps)}
          >
            <Text style={styles.buttonText}>🌍 Open in Google Maps</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B6F47" />
        <Text style={{ marginTop: 10, color: "#5C4033" }}>
          Loading countries...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Country Explorer</Text>

      <TextInput
        placeholder="Search by native name..."
        placeholderTextColor="#8B6F47"
        style={styles.input}
        value={keyword}
        onChangeText={handleSearch}
      />

      {filteredData.length === 0 ? (
        <Text style={styles.emptyText}>No data found</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.cca3}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5EFE6",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#5C4033",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C8B6A6",
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#FFFDF8",
    color: "#5C4033",
  },
  card: {
    backgroundColor: "#FFFDF8",
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D6C2B0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  flag: {
    width: 70,
    height: 45,
    marginRight: 15,
    borderRadius: 8,
  },
  country: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A2C2A",
  },
  native: {
    fontSize: 13,
    color: "#7B5E57",
  },
  info: {
    fontSize: 14,
    marginTop: 4,
    color: "#3E2723",
  },
  currency: {
    marginTop: 6,
    fontSize: 14,
    color: "#3E2723",
  },
  button: {
    marginTop: 14,
    backgroundColor: "#8B6F47",
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5EFE6",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#7B5E57",
  },
});

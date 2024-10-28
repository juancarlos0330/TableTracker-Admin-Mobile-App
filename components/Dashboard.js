import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import { getDashboarddata } from "./Actions/dashboardActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "./validation/is-empty";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

getToday(); // returns today's date.. e.g: 2019/10/12
//Get formatted date from Date object or date string "2019/..."
getFormatedDate(new Date(), "YYYY/MM/DD");

const data = {
  name: "Divyesh Barad",
  email: "divyesh@gmail.com",
  address: "Rajkot",
};

const Dashboard = (props) => {
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [datepickerflag, setDatepickerflag] = useState(false);
  const [printdata, setPrintdata] = useState();
  //search filter
  const [searchQuery, setSearchQuery] = useState("");
  // print

  // end

  const onChangepickerflag = () => setDatepickerflag(!datepickerflag);

  const onChangepickervalue = (date) => {
    setSelectedDate(date);
    setDatepickerflag(false);

    var searchresult = alldata.filter((item) => {
      return getFormatedDate(item.created_at).indexOf(date) > -1;
    });

    if (date === "") {
      setResult(alldata);
    } else {
      setResult(searchresult);
    }
  };

  // get all dashboard data
  useEffect(() => {
    setInterval(() => {
      props.getDashboarddata();
    }, 5000);
  }, []);

  useEffect(() => {
    setAlldata(props.dashboard);
    setResult(props.dashboard);
    setPrintdata(
      `
    <html>
      <body style="width: 100%;margin: 0">` +
        (isEmpty(result)
          ? null
          : result.map((item, key) => {
              if (item.status === 0) {
                return (
                  `<div>
                    <h2
                      style="text-align: center;font-size: 50px;font-weight: 200;
        font-family: system-ui;"
                    >
                      Dish: ` +
                  item.activity.name +
                  `
                    </h2>
                    <h2
                      style="text-align: center;font-size: 50px;font-weight: 200;
        font-family: system-ui;"
                    >
                      Amount: ` +
                  item.amount +
                  `
                    </h2>
                    <h2
                      style="text-align: center;font-size: 50px;font-weight: 200;
        font-family: system-ui;"
                    >
                      Worker: ` +
                  item.user.username +
                  `
                    </h2>
                  </div>`
                );
              }
            })) +
        `
      </body>
    </html>
  `
    );
  }, [props.dashboard]);

  // search name filter

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    var searchresult = alldata.filter((item) => {
      return (
        item.activity.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.user.username.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    });

    if (query === "") {
      setResult(alldata);
    } else {
      setResult(searchresult);
    }
  };

  const generatePdf = async () => {
    const file = await printToFileAsync({
      html: printdata,
      base64: false,
    });
    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <Button title="generate Pdf" onPress={generatePdf} />
      <View style={[styles.header, styles.boxWithShadow]}>
        <View style={styles.wait}>
          <View style={styles.waitingstatus}></View>
          <View>
            <Text>Waiting</Text>
          </View>
        </View>
        <View style={styles.wait}>
          <View style={styles.runningstatus}></View>
          <View>
            <Text>Running</Text>
          </View>
        </View>
        <View style={styles.wait}>
          <View style={styles.completedstatus}></View>
          <View>
            <Text>Completed</Text>
          </View>
        </View>
      </View>
      <View>
        <View>
          <TouchableOpacity disabled={true}>
            <Searchbar
              placeholder="Search by date"
              onIconPress={onChangepickerflag}
              // onChangeText={onChangedate}
              value={selectedDate}
              style={styles.searchBar__clicked}
              editable={false}
              icon={() => <Icon name="calendar" size={25} color={"#818181"} />}
            />
            {datepickerflag ? (
              <DatePicker
                mode="calendar"
                onSelectedChange={(date) => onChangepickervalue(date)}
              />
            ) : null}
            <Searchbar
              placeholder="Search by name and food"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.namesearchBar__clicked}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.main}>
        <View style={styles.totalview}>
          <Text style={{ fontSize: 16, marginRight: 5 }}>Total:</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
            {result.length}
          </Text>
        </View>
        <View style={styles.statusblock}>
          {isEmpty(result)
            ? null
            : result.map((item, key) => {
                if (item.status === 0) {
                  return (
                    <View
                      style={[styles.content1, styles.boxWithShadow]}
                      key={key}
                    >
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Dish:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {item.activity.name}
                        </Text>
                      </View>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Quantity:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {" " + item.amount + " times"}
                        </Text>
                      </View>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Worker:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {item.user.username}
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.refreshbtn}>
                        <Icon name="refresh" size={20} color={"#441CB3"} />
                      </TouchableOpacity>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 8,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Create Date:
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {getFormatedDate(item.created_at)}
                        </Text>
                      </View>
                    </View>
                  );
                } else if (item.status === 1) {
                  return (
                    <View
                      style={[styles.content2, styles.boxWithShadow]}
                      key={key}
                    >
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Dish:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {item.activity.name}
                        </Text>
                      </View>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Quantity:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {" " + item.amount + " times"}
                        </Text>
                      </View>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Worker:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {item.user.username}
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.completedsec}>
                        <Icon
                          name="check-circle-o"
                          size={20}
                          color={"#441CB3"}
                        />
                      </TouchableOpacity>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 8,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Running Date:
                        </Text>
                        <Text
                          style={{
                            fontSize: 8,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {getFormatedDate(item.updated_at)}
                        </Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View
                      style={[styles.content3, styles.boxWithShadow]}
                      key={key}
                    >
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Dish:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {item.activity.name}
                        </Text>
                      </View>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Quantity:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {" " + item.amount + " times"}
                        </Text>
                      </View>
                      <View style={styles.dishsec}>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          Worker:
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: "#046424",
                          }}
                        >
                          {item.user.username}
                        </Text>
                      </View>
                      <View style={styles.completedsec}>
                        <Icon name="check" size={20} color={"#441CB3"} />
                      </View>
                    </View>
                  );
                }
              })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  wait: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  waitingstatus: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#FFB7B9",
    marginRight: 10,
  },
  runningstatus: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#FFF2CC",
    marginRight: 10,
  },
  completedstatus: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#D5E8D4",
    marginRight: 10,
  },
  header: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "99%",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxWithShadow: {
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 20,
  },
  searchBar__clicked: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  namesearchBar__clicked: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  main: {
    height: "100%",
    width: "100%",
    zIndex: -1,
    backgroundColor: "#ffffff",
  },
  content1: {
    width: "28%",
    height: 180,
    backgroundColor: "#FFB7B9",
    padding: 10,
    margin: 10,
    paddingTop: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  dishsec: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 10,
    width: "70%",
    textAlign: "center",
  },
  content2: {
    width: "28%",
    height: 180,
    backgroundColor: "#FFF2CC",
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  content3: {
    width: "28%",
    height: 180,
    backgroundColor: "#D5E8D4",
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  statusblock: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  refreshbtn: {
    marginTop: 10,
  },
  completedsec: {
    flexDirection: "row",
    marginTop: 10,
  },
  totalview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
    alignItems: "flex-end",
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
});

Dashboard.propTypes = {
  getDashboarddata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.data,
});

export default connect(mapStateToProps, {
  getDashboarddata,
})(Dashboard);

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";
import DatePicker from "react-native-modern-datepicker";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { getHistorydata } from "../Actions/historyActions";
import isEmpty from "../validation/is-empty";

getToday(); // returns today's date.. e.g: 2019/10/12
//Get formatted date from Date object or date string "2019/..."
getFormatedDate(new Date(), "YYYY/MM/DD");

const History = (props) => {
  const [datepickerflag, setDatepickerflag] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  // search name filter
  const [searchQuery, setSearchQuery] = useState("");

  const onChangepickerflag = () => {
    setDatepickerflag(!datepickerflag);
  };
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

  // Search name, path, action filter

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    var searchresult = alldata.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.action.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item.path.toLowerCase().indexOf(query.toLowerCase()) > -1
      );
    });

    if (query === "") {
      setResult(alldata);
    } else {
      setResult(searchresult);
    }
  };

  // get all history
  useEffect(() => {
    props.getHistorydata();
  }, []);

  useEffect(() => {
    setAlldata(props.history);
    setResult(props.history);
  }, [props.history]);

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <View>
          <TouchableOpacity disabled={true}>
            <Searchbar
              placeholder="Search by date"
              onIconPress={onChangepickerflag}
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
              placeholder="Search by name, path and action"
              style={styles.namesearchBar__clicked}
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.main}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {isEmpty(result)
            ? null
            : result.map((item, key) => {
                return (
                  <View
                    style={[styles.historyblock, styles.boxWithShadow]}
                    key={key}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#5554C9", fontSize: 15 }}>
                        {getFormatedDate(item.created_at, "YYYY/MM/DD")}
                      </Text>

                      <Text style={{ color: "black", fontSize: 20 }}>
                        {item.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#1E1E1E", fontSize: 12 }}>
                        {item.path}
                      </Text>
                      <Text style={{ color: "#1E1E1E", fontSize: 12 }}>
                        {item.action}
                      </Text>
                    </View>
                  </View>
                );
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
  main: {
    height: "100%",
    width: "100%",
    zIndex: -1,
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
  historyblock: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C8C8C8",
    width: "97%",
    marginTop: 10,
  },
  boxWithShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
  },
});

History.propTypes = {
  getHistorydata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  history: state.history.data,
});

export default connect(mapStateToProps, {
  getHistorydata,
})(History);

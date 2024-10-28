import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Searchbar } from "react-native-paper";
import {
  getTooldata,
  addTooldata,
  delTooldata,
  addToolAmount,
} from "../Actions/toolActions";
import isEmpty from "../validation/is-empty";

const Tools = (props) => {
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  useEffect(() => {
    props.getTooldata();
  }, []);

  useEffect(() => {
    setAlldata(props.tools);
    setResult(props.tools);
  }, [props.tools]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    var searchresult = alldata.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    if (query === "") {
      setResult(alldata);
    } else {
      setResult(searchresult);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [toolname, setToolname] = useState("");
  const [delid, setDelid] = useState("");

  const toolDelfunc = () => {
    const params = {
      id: delid,
    };
    props.delTooldata(params);
    toolsdelete3(false);
  };

  const toolsAdd = () => {
    const paramData = {
      name: toolname,
    };
    props.addTooldata(paramData);
    setModalVisible(!addmodal);
  };

  const [addmodal, setModalVisible] = useState(false);

  const addd = () => {
    setModalVisible(!addmodal);
  };

  const [toolsdelete2, toolsdelete3] = useState(false);

  const tooldelete = (did) => {
    toolsdelete3(!toolsdelete2);
    setDelid(did);
  };

  const toolsdelete = () => {
    toolsdelete3(true);
  };

  // For tool amount
  const [upid, setUpid] = useState("");
  const [edittoolamountmodal, setEdittoolamountmodal] = useState(false);
  const [toolamount, setToolAmount] = useState(0);
  const editamount = (uid) => {
    setUpid(uid);
    setEdittoolamountmodal(true);
  };
  const editamountfunc = () => {
    setEdittoolamountmodal(false);
  };
  // add material function
  const toolAddAmountfunc = () => {
    const paramData = {
      id: upid,
      amount: toolamount,
    };
    props.addToolAmount(paramData);
    setEdittoolamountmodal(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.boxWithShadow]}>
        <TouchableOpacity onPress={addd} style={styles.add}>
          <View style={styles.iconstyle}>
            <Icon name="plus" size={24} color={"#4287F6"} />
          </View>
        </TouchableOpacity>
        <View style={styles.filter}>
          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchBar__clicked}
            />
          </View>
        </View>
      </View>
      <ScrollView style={styles.main}>
        <View style={styles.totalview}>
          <Text style={{ fontSize: 16, marginRight: 5 }}>Total:</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "red" }}>
            {result.length}
          </Text>
        </View>
        {isEmpty(result)
          ? null
          : result.map((item, key) => {
              return (
                <View style={[styles.content, styles.boxWithShadow]} key={key}>
                  <View style={styles.contentname} key={key}>
                    <View>
                      <Text style={styles.contenttitle}>{item.name}</Text>
                      <View style={styles.unitsec}>
                        <Text>{item.amount}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.contentfooter}>
                    <TouchableOpacity onPress={() => editamount(item._id)}>
                      <Text style={styles.edit}>Add Amount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => tooldelete(item._id)}>
                      <Text style={styles.delete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
      </ScrollView>
      <Modal isVisible={addmodal}>
        <View style={styles.modal}>
          <View style={styles.modal_toolsname}>
            <Text style={styles.modal_toolsnametext}>Tool Name :</Text>
            <TextInput
              style={styles.modal_toolsnametextinput}
              onChangeText={(e) => setToolname(e)}
            ></TextInput>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={toolsAdd}>
              <Text style={styles.modal_add}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addd}>
              <Text style={styles.modal_delete}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={edittoolamountmodal}>
        <View style={styles.modal}>
          <View style={styles.modal_materialamountplus}>
            <Text style={styles.modal_toolnametext}>Amount :</Text>
            <TextInput
              style={styles.modal_toolamounttextinput}
              onChangeText={(e) => setToolAmount(e)}
            ></TextInput>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={toolAddAmountfunc}>
              <Text style={styles.modal_add}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={editamountfunc}>
              <Text style={styles.modal_delete}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={toolsdelete2}>
        <View style={styles.modal}>
          <View style={styles.modal_toolsamountplus}>
            <Text style={styles.modal_toolsdelete}>
              Do you really delete this tool?
            </Text>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={toolDelfunc}>
              <Text style={styles.modal_add}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toolsdelete}>
              <Text style={styles.modal_delete}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  header: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: "99%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxWithShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 20,
  },
  iconstyle: {
    marginLeft: 5,
    borderRadius: 50,
    borderColor: "#4287F6",
    borderWidth: 2,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  addtools: {
    marginLeft: 10,
    color: "#4287F6",
    fontSize: 15,
    paddingBottom: 2,
  },
  filter: {
    marginLeft: 10,
    width: 350,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    width: "95%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    paddingRight: 5,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "95%",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  contentname: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  contenttitle: {
    fontSize: 30,
    color: "#535353",
  },
  contentfooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#E2E2E2",
    backgroundColor: "#F7F7F7",
    paddingBottom: 10,
  },
  edit: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#54A2C0",
    marginTop: 10,
    marginLeft: 25,
    color: "#54A2C0",
  },
  delete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#DE5D5D",
    marginTop: 10,
    marginRight: 25,
    color: "white",
    backgroundColor: "#DE5D5D",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4287F6",
  },
  modal_toolsname: {
    padding: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  modal_toolsnametext: {
    color: "#bbb",
  },
  modal_toolsnametextinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 200,
    borderBottomWidth: 1,
    fontSize: 15,
    borderBottomColor: "#bbb",
  },
  modal_toolsamount: {
    marginLeft: 43,
    paddingLeft: 25,
    paddingBottom: 25,
    flexDirection: "row",
  },
  modal_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  modal_add: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#54A2C0",
    marginTop: 10,
    marginLeft: 45,
    color: "white",
    backgroundColor: "#54A2C0",
  },
  modal_delete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#DE5D5D",
    marginTop: 10,
    marginRight: 45,
    color: "white",
    backgroundColor: "#DE5D5D",
  },
  modal_toolsamountplus: {
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  modal_toolsdelete: {
    fontSize: 15,
    color: "#de5d5d",
    marginTop: -10,
  },
  totalview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
    alignItems: "flex-end",
  },
  modal_toolamounttextinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 200,
    borderBottomWidth: 1,
    fontSize: 15,
    borderBottomColor: "#bbb",
  },
  modal_toolnametext: {
    color: "#bbb",
  },
  modal_materialamountplus: {
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  unitsec: {
    flexDirection: "column",
    alignItems: "center",
  },
});

Tools.propTypes = {
  getTooldata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tools: state.tools.data,
});

export default connect(mapStateToProps, {
  getTooldata,
  addTooldata,
  delTooldata,
  addToolAmount,
})(Tools);

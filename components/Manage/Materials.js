import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Searchbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getMaterialdata,
  addMaterialdata,
  delMaterialdata,
  addMaterialAmount,
} from "../Actions/materialActions";
import isEmpty from "../validation/is-empty";

const Materials = (props) => {
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [materialname, setMaterialname] = useState("");
  const [materialunit, setMaterialunit] = useState("");
  const [materialamount, setMaterialAmount] = useState(0);
  const [delid, setDelid] = useState("");
  const [upid, setUpid] = useState("");

  const [addmodal, setModalVisible] = useState(false);

  const addd = () => {
    setModalVisible(!addmodal);
  };

  const [editmodal, edit3] = useState(false);

  const edit = (uid) => {
    setUpid(uid);
    edit3(true);
  };

  const editfunc = () => {
    edit3(false);
  };

  const matAddAmountfunc = () => {
    const paramData = {
      id: upid,
      amount: materialamount,
    };
    props.addMaterialAmount(paramData);
    edit3(false);
  };

  const [materialdelete2, materialdelete3] = useState(false);

  useEffect(() => {
    props.getMaterialdata();
  }, []);

  useEffect(() => {
    setResult(props.materials);
    setAlldata(props.materials);
  }, [props.materials]);

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

  const materialdelete = (did) => {
    materialdelete3(true);
    setDelid(did);
  };

  const materialdeleteother = () => {
    materialdelete3(false);
  };

  const materialsAdd = () => {
    const paramData = {
      name: materialname,
      unit: materialunit,
    };
    props.addMaterialdata(paramData);
    setModalVisible(!addmodal);
  };

  const matDelfunc = () => {
    const params = {
      id: delid,
    };
    props.delMaterialdata(params);
    materialdelete3(false);
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
                  <View style={styles.contentname}>
                    <View>
                      <Text style={styles.contenttitle}>{item.name}</Text>
                    </View>
                    <View style={styles.unitsec}>
                      <Text style={{ marginRight: 8 }}>{item.amount}</Text>
                      <Text>{item.unit}</Text>
                    </View>
                  </View>
                  <View style={styles.contentfooter}>
                    <TouchableOpacity onPress={() => edit(item._id)}>
                      <Text style={styles.edit}>Add Amount</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => materialdelete(item._id)}>
                      <Text style={styles.delete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
      </ScrollView>
      <Modal isVisible={addmodal}>
        <View style={styles.modal}>
          <View style={styles.modal_materialname}>
            <Text style={styles.modal_materialnametext}>Material Name :</Text>
            <TextInput
              style={styles.modal_materialnametextinput}
              onChangeText={(e) => setMaterialname(e)}
            ></TextInput>
          </View>
          <View style={styles.modal_materialamount}>
            <Text style={styles.modal_materialnametext}>Unit :</Text>
            <TextInput
              style={styles.modal_materialnametextinput}
              onChangeText={(e) => setMaterialunit(e)}
            ></TextInput>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={materialsAdd}>
              <Text style={styles.modal_add}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addd}>
              <Text style={styles.modal_delete}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={editmodal}>
        <View style={styles.modal}>
          <View style={styles.modal_materialamountplus}>
            <Text style={styles.modal_materialnametext}>Amount :</Text>
            <TextInput
              style={styles.modal_materialnametextinput}
              onChangeText={(e) => setMaterialAmount(e)}
            ></TextInput>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={matAddAmountfunc}>
              <Text style={styles.modal_add}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={editfunc}>
              <Text style={styles.modal_delete}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={materialdelete2}>
        <View style={styles.modal}>
          <View style={styles.modal_materialamountplus}>
            <Text style={styles.modal_materialdelete}>Are you sure?</Text>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={matDelfunc}>
              <Text style={styles.modal_add}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={materialdeleteother}>
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
    marginVertical: 5,
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
  addmaterial: {
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
  modal_materialname: {
    padding: 45,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modal_materialnametext: {
    color: "#bbb",
  },
  modal_materialnametextinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 200,
    borderBottomWidth: 1,
    fontSize: 15,
    borderBottomColor: "#bbb",
  },
  modal_materialamount: {
    marginLeft: 43,
    paddingRight: 45,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "flex-end",
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
  modal_materialamountplus: {
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  modal_materialdelete: {
    fontSize: 15,
    color: "#de5d5d",
    marginTop: -10,
  },
  unitsec: {
    flexDirection: "row",
  },
  totalview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
    alignItems: "flex-end",
  },
});

Materials.propTypes = {
  getMaterialdata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  materials: state.materials.data,
});

export default connect(mapStateToProps, {
  getMaterialdata,
  addMaterialdata,
  delMaterialdata,
  addMaterialAmount,
})(Materials);

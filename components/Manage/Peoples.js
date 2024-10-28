import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Searchbar } from "react-native-paper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getPeopledata,
  addPeopledata,
  delPeopledata,
} from "../Actions/peopleActions";
import { getRoledata } from "../Actions/serverurlActions";
import isEmpty from "../validation/is-empty";
import UploadImage from "./UploadImage";

const Peoples = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [addid, setAddid] = useState("");
  const [roledata, setRoledata] = useState(null);

  const [addmodal, setModalVisible] = useState(false);

  const addd = () => {
    setModalVisible(!addmodal);
  };

  const [peopledelete2, peopledelete3] = useState(false);

  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);

  const [uploadimagedata, setUploadimagedata] = useState(null);

  useEffect(() => {
    props.getPeopledata();
    props.getRoledata();
  }, []);

  useEffect(() => {
    setAlldata(props.peoples);
    setResult(props.peoples);
  }, [props.peoples]);

  useEffect(() => {
    setRoledata(props.roles);
  }, [props.roles]);

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

  const setimagefunc = (imagedata) => {
    setUploadimagedata(imagedata);
  };

  const [peoplename, setPeoplename] = useState("");
  const [delid, setDelid] = useState("");

  const peopleDelfunc = () => {
    const params = {
      id: delid,
    };
    props.delPeopledata(params);
    peopledelete3(false);
  };

  const peopleAdd = () => {
    let formdata = new FormData();
    formdata.append("photo", uploadimagedata);
    formdata.append("name", peoplename);
    formdata.append("role", addid);

    props.addPeopledata(formdata);
    setModalVisible(!addmodal);
  };

  const peoplesdelete = (did) => {
    peopledelete3(!peopledelete2);
  };

  const peopledelete = (id) => {
    setDelid(id);
    peopledelete3(true);
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {isEmpty(result)
            ? null
            : result.map((item, key) => {
                return (
                  <View
                    style={[styles.content, styles.boxWithShadow]}
                    key={key}
                  >
                    <View style={{ widht: "100%", alignItems: "center" }}>
                      <Image
                        source={{
                          uri: "http://10.10.18.186:5000/" + item.image_uri,
                        }}
                        style={{
                          width: "60%",
                          height:
                            (((Dimensions.get("window").width / 5) * 2) / 5) *
                            3,
                          borderRadius: 100,
                        }}
                      />
                    </View>
                    <View style={styles.contentname} key={key}>
                      <View style={styles.employeeinfo}>
                        <Text style={styles.employeename}>{item.name}</Text>
                        <Text style={styles.employeetype}>
                          {item.role.name}
                        </Text>
                      </View>
                      <View style={styles.employeefooter}>
                        <TouchableOpacity
                          onPress={() => peopledelete(item._id)}
                        >
                          <Text style={styles.delete}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
        </View>
      </ScrollView>
      <Modal isVisible={addmodal}>
        <View style={styles.modal}>
          <View style={styles.imageupload}>
            <UploadImage setimagefunc={setimagefunc} />
          </View>
          <View style={styles.modal_peoplename}>
            <Text style={styles.modal_peoplenametext}>Full Name :</Text>
            <TextInput
              style={styles.modal_peoplenametextinput}
              onChangeText={(e) => setPeoplename(e)}
            ></TextInput>
          </View>
          <View style={styles.employeetypeselectsec}>
            <Text style={styles.modal_peopleRoletext}>Role :</Text>
            <SelectDropdown
              data={roledata}
              onSelect={(selectedItem, index) => {
                setAddid(selectedItem._id);
              }}
              defaultButtonText={"Select Role"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={styles.dropdown4BtnStyle}
              buttonTextStyle={styles.dropdown4BtnTxtStyle}
              dropdownIconPosition={"left"}
              dropdownStyle={styles.dropdown4DropdownStyle}
              rowStyle={styles.dropdown4RowStyle}
              rowTextStyle={styles.dropdown4RowTxtStyle}
            />
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={peopleAdd}>
              <Text style={styles.modal_add}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addd}>
              <Text style={styles.modal_delete}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={peopledelete2}>
        <View style={styles.modal}>
          <View style={styles.modal_peopleamountplus}>
            <Text style={styles.modal_peopledelete}>Are you sure?</Text>
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity onPress={peopleDelfunc}>
              <Text style={styles.modal_add}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={peoplesdelete}>
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
  addpeople: {
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
    width: "45%",
    marginVertical: 15,
    padding: 10,
  },
  peopelesec: {
    width: "100%",
    paddingVertical: 30,
  },
  contentname: {
    alignItems: "center",
    justifyContent: "center",
  },
  employeefooter: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  employeeinfo: {
    width: "80%",
    alignItems: "center",
  },
  employeename: {
    fontSize: 15,
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
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#DE5D5D",
    color: "white",
    backgroundColor: "#DE5D5D",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4287F6",
  },
  modal_peoplename: {
    padding: 25,
    paddingTop: 40,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  modal_peoplenametext: {
    color: "#bbb",
  },
  modal_peoplenametextinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 200,
    borderBottomWidth: 1,
    fontSize: 15,
  },
  modal_peopleamount: {
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
    marginLeft: 55,
    color: "white",
    backgroundColor: "#54A2C0",
  },
  modal_delete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#DE5D5D",
    marginRight: 45,
    color: "white",
    backgroundColor: "#DE5D5D",
  },
  modal_peopleamountplus: {
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  modal_peopledelete: {
    fontSize: 20,
    color: "#de5d5d",
    marginTop: -10,
  },
  modal_peopleRoletext: {
    color: "#bbb",
    marginLeft: 35,
  },
  employeetype: {
    fontSize: 12,
    color: "black",
  },
  employeetypeselectsec: {
    marginLeft: 30,
    padding: 25,
    flexDirection: "row",
    justifyContent: "center",
  },
  dropdown4BtnStyle: {
    width: "70%",
    height: 30,
    backgroundColor: "#FFF",
    paddingBottom: 5,
  },
  dropdown4BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown4DropdownStyle: {
    backgroundColor: "#EFEFEF",
    width: "50%",
  },
  dropdown4RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown4RowTxtStyle: { color: "#444", textAlign: "left" },
  totalview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
    alignItems: "flex-end",
  },
  imageupload: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadimagebutton: {
    width: "100%",
    height: 100,
  },
});

Peoples.propTypes = {
  getPeopledata: PropTypes.func.isRequired,
  getRoledata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  peoples: state.peoples.data,
  roles: state.roles.data,
});

export default connect(mapStateToProps, {
  getPeopledata,
  addPeopledata,
  delPeopledata,
  getRoledata,
})(Peoples);

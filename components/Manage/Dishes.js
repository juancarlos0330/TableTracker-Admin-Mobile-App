import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { Searchbar } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import isEmpty from "../validation/is-empty";
import { getActivitiesdata } from "../Actions/activityActions";
import { getMaterialdata } from "../Actions/materialActions";
import { getTooldata } from "../Actions/toolActions";
import { getPeopledata } from "../Actions/peopleActions";
import { addDishdata, getDishesdata, delDish } from "../Actions/dishActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Dishes = (props) => {
  const [addmodal, setModalVisible] = useState(false);

  const addd = () => {
    setModalVisible(!addmodal);
  };

  // delete dish
  const [materialdelete2, materialdelete3] = useState(false);
  const [delid, setDelid] = useState("");

  const dishdelete = (id) => {
    materialdelete3(true);
    setDelid(id);
  };

  const canceldelactivityfunc = () => {
    materialdelete3(false);
  };

  const delactivityfunc = () => {
    const params = {
      id: delid,
    };
    props.delDish(params);
    materialdelete3(false);
  };

  // add dish
  const [selectedactivityid, setSelectedactivityid] = useState("");

  useEffect(() => {
    props.getActivitiesdata();
    props.getDishesdata();
  }, []);

  const [selectactivitydata, setSelectactivitydata] = useState([]);

  useEffect(() => {
    let demoactivitydata = isEmpty(props.activities)
      ? []
      : props.activities
          .filter((item) => {
            return item.flag === false;
          })
          .map((item) => {
            return {
              key: item._id,
              value: item.name,
            };
          });
    setSelectactivitydata(demoactivitydata);
  }, [props.activities]);

  const addtodish = () => {
    const paramData = {
      id: selectedactivityid,
    };

    props.addDishdata(paramData);
    setModalVisible(false);
  };
  // end

  // show detail button function
  const [detaildata, setDetaildata] = useState(null);

  const [detailmodal, materialdetail] = useState(false);

  const detail = (id) => {
    let subdetaildata = result.filter((item, key) => {
      return item._id === id;
    });

    setDetaildata(subdetaildata[0]);
    materialdetail(!detailmodal);
  };

  // Search Filter
  const [searchQuery, setSearchQuery] = useState("");

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
  //end

  // total state data
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  // end

  // get dishes
  useEffect(() => {
    setAlldata(props.dishes);
    setResult(props.dishes);
  }, [props.dishes]);

  useEffect(() => {
    let demomaterialdata = isEmpty(props.materials)
      ? []
      : props.materials.map((item) => {
          return {
            key: item._id,
            value: item.name,
          };
        });
    setSelectmaterialdata(demomaterialdata);
  }, [props.materials]);
  const [selectmaterialdata, setSelectmaterialdata] = useState([]);
  const [matid, setMid] = useState("");
  const [selectedmaterialid, setSelectedmaterialid] = useState("");
  const [materialamount, setMaterialamount] = useState("");

  const editmaterial = (id) => {
    setEditmaterialmodal(true);
    setMid(id);
  };

  const [editmaterialmodal, setEditmaterialmodal] = useState(false);

  const editmaterialclose = () => {
    setEditmaterialmodal(false);
  };

  const addmaterialnameamount = () => {
    const paramData = {
      id: matid,
      mid: selectedmaterialid,
      amount: materialamount,
    };
    props.addMaterialNameAmount(paramData);
    setEditmaterialmodal(false);
  };
  // end

  // add people modal
  useEffect(() => {
    let demopeopledata = isEmpty(props.peoples)
      ? []
      : props.peoples.map((item) => {
          return {
            key: item._id,
            value: item.name,
          };
        });
    setSelectpeopledata(demopeopledata);
  }, [props.peoples]);
  const [selectpeopledata, setSelectpeopledata] = useState([]);
  const [Pid, setPid] = useState("");
  const [selectedpeopleid, setSelectedpeopleid] = useState("");

  const editpeople = (id) => {
    setEditpeoplemodal(true);
    setPid(id);
  };

  const [editpeoplemodal, setEditpeoplemodal] = useState(false);

  const editpeopleclose = () => {
    setEditpeoplemodal(false);
  };

  const addpeoplenameamount = () => {
    const paramData = {
      id: Pid,
      pid: selectedpeopleid,
    };
    props.addPeopleNameAmount(paramData);
    setEditpeoplemodal(false);
  };
  // end

  // Add subactivity name and amount
  useEffect(() => {
    let demosubactivitydata = isEmpty(props.activities)
      ? []
      : props.activities.map((item) => {
          return {
            key: item._id,
            value: item.name,
          };
        });
    setSelectsubactivitydata(demosubactivitydata);
  }, [props.activities]);

  const [selectsubactivitydata, setSelectsubactivitydata] = useState([]);
  const [actid, setActid] = useState("");
  const [selectedsubactivityid, setSelectedsubactivityid] = useState("");
  const [subactivityamount, setsubactivityamount] = useState("");

  const editsubactivity = (id) => {
    setEditsubactivitymodal(true);
    setActid(id);
  };

  const [editsubactivitymodal, setEditsubactivitymodal] = useState(false);

  const editsubactivityclose = () => {
    setEditsubactivitymodal(false);
  };

  const addsubactivitynameamount = () => {
    const paramData = {
      id: actid,
      aid: selectedsubactivityid,
      amount: subactivityamount,
    };
    props.addSubacvitivyNameAmount(paramData);
    setEditsubactivitymodal(false);
  };

  // end

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
                    <View style={styles.imagecontainer}>
                      <Image
                        source={{
                          uri: "http://10.10.18.186:5000/" + item.image_url,
                        }}
                        style={{ width: 200, height: 200 }}
                      />
                    </View>
                  </View>
                  <View style={styles.contentfooter}>
                    {/* <TouchableOpacity onPress={edit}>
                <Text style={styles.edit}>Add Data</Text>
              </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => detail(item._id)}>
                      <Text style={styles.detail}>Show Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dishdelete(item._id)}>
                      <Text style={styles.delete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
      </ScrollView>
      <Modal isVisible={addmodal}>
        <View style={styles.modal}>
          <SelectDropdown
            data={selectactivitydata}
            onSelect={(selectedItem, index) => {
              setSelectedactivityid(selectedItem.key);
            }}
            defaultButtonText={"Choose Dish"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.value;
            }}
            rowTextForSelection={(item, index) => {
              return item.value;
            }}
            buttonStyle={styles.dropdown4BtnStyle}
            buttonTextStyle={styles.dropdown4BtnTxtStyle}
            dropdownIconPosition={"left"}
            dropdownStyle={styles.dropdown4DropdownStyle}
            rowStyle={styles.dropdown4RowStyle}
            rowTextStyle={styles.dropdown4RowTxtStyle}
          />
          <View style={styles.addactivity_footer}>
            <TouchableOpacity onPress={addtodish}>
              <Text style={styles.addactivity}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addd}>
              <Text style={styles.addactivitycancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={detailmodal}>
        <ScrollView>
          <View style={styles.modal}>
            <View style={styles.materialdetail}>
              <Text style={{ fontSize: 20, padding: 10, color: "#535353" }}>
                Material
              </Text>
              {isEmpty(detaildata) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : isEmpty(detaildata.material) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : (
                detaildata.material.map((item, key) => {
                  return (
                    <View style={styles.modal_detail} key={key}>
                      <View style={styles.modal_detailnametextleft}>
                        <Text style={styles.modal_detailnametextlefttext}>
                          {item.material.name}
                        </Text>
                      </View>
                      <View style={styles.modal_detailnametextright}>
                        <Text style={styles.modal_detailnametextrighttext}>
                          {item.amount + " " + item.material.unit}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
            <View style={styles.materialdetail}>
              <Text style={{ fontSize: 20, padding: 10, color: "#535353" }}>
                Tool
              </Text>
              {isEmpty(detaildata) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : isEmpty(detaildata.tool) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : (
                detaildata.tool.map((item, key) => {
                  return (
                    <View style={styles.modal_detail} key={key}>
                      <View style={styles.modal_detailnametextleft}>
                        <Text style={styles.modal_detailnametextlefttext}>
                          {item.tool.name}
                        </Text>
                      </View>
                      <View style={styles.modal_detailnametextright}>
                        <Text style={styles.modal_detailnametextrighttext}>
                          {item.amount}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
            <View style={styles.materialdetail}>
              <Text style={{ fontSize: 20, padding: 10, color: "#535353" }}>
                People
              </Text>
              {isEmpty(detaildata) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : isEmpty(detaildata.people) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : (
                detaildata.people.map((item, key) => {
                  return (
                    <View style={styles.modal_detail} key={key}>
                      <View style={styles.modal_detailnametextleft}>
                        <Image
                          source={{
                            uri: "http://10.10.18.186:5000/" + item.image_uri,
                          }}
                          style={{ width: 30, height: 30, borderRadius: 100 }}
                        />
                      </View>
                      <View style={styles.modal_detailnametextright}>
                        <Text style={styles.modal_detailnametextrighttext}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
            <View style={styles.materialdetail}>
              <Text style={{ fontSize: 20, padding: 10, color: "#535353" }}>
                Activity
              </Text>
              {isEmpty(detaildata) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : isEmpty(detaildata.activity) ? (
                <View style={styles.emptymodal_detail}>
                  <Text style={{ textAlign: "center" }}>No Data</Text>
                </View>
              ) : (
                detaildata.activity.map((item, key) => {
                  return (
                    <View style={styles.modal_detail} key={key}>
                      <View style={styles.modal_detailnametextleft}>
                        <Image
                          source={{
                            uri:
                              "http://10.10.18.186:5000/" +
                              item.activity.image_url,
                          }}
                          style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                      </View>
                      <View style={styles.modal_detailnametextright}>
                        <Text style={styles.modal_detailnametextrighttext}>
                          {item.activity.name}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
            <View style={styles.modal_footer}>
              <TouchableOpacity onPress={() => materialdetail(!detailmodal)}>
                <Text style={styles.modal_delete}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Modal isVisible={materialdelete2}>
        <View style={styles.modal}>
          <View style={styles.modal_materialamountdelete}>
            <Text style={styles.modal_materialdelete}>
              Do you really delete this dish?
            </Text>
          </View>
          <View style={styles.addactivity_footer}>
            <TouchableOpacity onPress={delactivityfunc}>
              <Text style={styles.addactivity}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={canceldelactivityfunc}>
              <Text style={styles.addactivitycancel}>Cancel</Text>
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
  imagecontainer: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
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
    height: 250,
    marginVertical: 15,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentname: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    padding: 10,
  },
  contenttitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#535353",
    paddingBottom: 10,
  },
  contentfooter: {
    alignItems: "flex-start",
    height: 200,
    justifyContent: "center",
    width: "40%",
  },
  edit: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#54A2C0",
    marginTop: 10,
    color: "#54A2C0",
  },
  detail: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "green",
    marginTop: 10,
    color: "green",
  },
  delete: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#DE5D5D",
    marginTop: 10,
    color: "white",
    backgroundColor: "#DE5D5D",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4287F6",
    alignItems: "center",
  },
  materialdetail: {
    borderRadius: 10,
    borderWidth: 1,
    width: "80%",
    margin: 10,
  },
  emptymodal_detail: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
  },
  modal_detail: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  modal_detailnametextleft: {
    width: "50%",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "flex-end",
  },
  modal_detailnametextlefttext: {
    textAlign: "right",
  },
  modal_detailnametextright: {
    width: "50%",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  adddishnamesec: {
    padding: 25,
    flexDirection: "row",
  },
  adddishname: {
    color: "#bbb",
  },
  modal_toolnametext: {
    color: "#bbb",
    marginTop: -5,
  },
  dishnameinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 40,
    borderBottomWidth: 1,
    fontSize: 15,
    borderBottomColor: "#bbb",
    width: 200,
  },
  modal_materialamount: {
    marginLeft: 43,
    paddingLeft: 25,
    paddingBottom: 25,
    flexDirection: "row",
  },
  modal_footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    borderColor: "#54A2C0",
    marginTop: 10,
    color: "white",
    backgroundColor: "#54A2C0",
  },
  modal_materialamountplus: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: 12,
    width: "90%",
  },
  modal_materialamountdelete: {
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  modal_materialdelete: {
    fontSize: 15,
    color: "#de5d5d",
    marginTop: -10,
  },
  activitynames: {
    textAlign: "left",
    padding: 5,
    fontSize: 16,
  },
  addactivity: {
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
  addactivity_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: -20,
    paddingBottom: 10,
  },
  addactivitycancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#de5d5d",
    marginTop: 10,
    marginRight: 45,
    color: "white",
    backgroundColor: "#de5d5d",
  },
  addactivities_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  },
  makingdish: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageupload: {
    marginTop: 20,
  },
  selectdata: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: -30,
    width: "70%",
    borderColor: "#4287F6",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: "center",
  },
  selecttool: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: -55,
    width: "80%",
    borderColor: "#4287F6",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginTop: 10,
    alignItems: "center",
  },
  selectmaterial: {
    marginTop: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: 10,
    width: "90%",
  },
  materialplus: {
    backgroundColor: "white",
    alignItems: "center",
    width: "95%",
    justifyContent: "center",
    marginTop: 10,
    paddingBottom: 10,
  },
  materialplusbutton: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#4287F6",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  materialplusbuttontitle: {
    color: "white",
  },
  materialdeletebutton: {
    fontSize: 10,
    backgroundColor: "red",
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderRadius: 50,
    color: "white",
    marginTop: -35,
    marginLeft: 125,
  },
  tooldeletebutton: {
    fontSize: 10,
    backgroundColor: "red",
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderRadius: 50,
    color: "white",
    marginLeft: 70,
  },
  selectonematerial: {
    borderColor: "#4287F6",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingBottom: 10,
    marginTop: 10,
  },
  activitynameinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 150,
    borderBottomWidth: 1,
    fontSize: 15,
    borderBottomColor: "#bbb",
  },
  addactivity_addactivity: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
  },
  dropdown4BtnStyle: {
    width: "90%",
    height: 40,
    backgroundColor: "#FFF",
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#535353",
    margin: 20,
  },
  dropdown4BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown4DropdownStyle: {
    backgroundColor: "#EFEFEF",
    width: "60%",
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
});

Dishes.propTypes = {
  getActivitiesdata: PropTypes.func.isRequired,
  getDishesdata: PropTypes.func.isRequired,
  getTooldata: PropTypes.func.isRequired,
  getMaterialdata: PropTypes.func.isRequired,
  getPeopledata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activities: state.activities.data,
  dishes: state.dishes.data,
  materials: state.materials.data,
  tools: state.tools.data,
  peoples: state.peoples.data,
});

export default connect(mapStateToProps, {
  getActivitiesdata,
  addDishdata,
  getDishesdata,
  getMaterialdata,
  getTooldata,
  getPeopledata,
  delDish,
})(Dishes);

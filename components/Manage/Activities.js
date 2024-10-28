import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { Searchbar } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import {
  getActivitiesdata,
  addActivity,
  addToolNameAmount,
  addMaterialNameAmount,
  addPeopleNameAmount,
  addSubacvitivyNameAmount,
  delActivity,
  submatdel,
  subtooldel,
  subpeopledel,
  subactivitydel,
} from "../Actions/activityActions";
import { getMaterialdata } from "../Actions/materialActions";
import { getTooldata } from "../Actions/toolActions";
import { getPeopledata } from "../Actions/peopleActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../validation/is-empty";
import UploadImage from "./UploadImage";

const Activities = (props) => {
  const [addmodal, setModalVisible] = useState(false);
  const [actdelid, setActdelid] = useState("");

  // total state data
  const [result, setResult] = useState([]);
  const [alldata, setAlldata] = useState([]);
  // end

  // show detail state data
  const [detaildata, setDetaildata] = useState(null);
  // end

  const addd = () => {
    setModalVisible(!addmodal);
  };

  // SHOW TOOL EDIT MODAL
  const [selecttooldata, setSelecttooldata] = useState([]);

  const [edittoolmodal, setEdittoolmodal] = useState(false);

  const edittoolclose = () => {
    setEdittoolmodal(false);
  };
  const edittool = (id) => {
    setEdittoolmodal(true);
    setAid(id);
  };

  useEffect(() => {
    let demotooldata = isEmpty(props.tools)
      ? []
      : props.tools.map((item) => {
          return {
            key: item._id,
            value: item.name,
          };
        });
    setSelecttooldata(demotooldata);
  }, [props.tools]);

  // Tool add
  const [aid, setAid] = useState("");
  const [toolamount, setToolamount] = useState("");

  // Delete activity
  const [delid, setDelid] = useState("");
  const [materialdelete2, materialdelete3] = useState(false);

  const canceldelactivityfunc = () => {
    materialdelete3(false);
  };

  const activitydelete = (id) => {
    materialdelete3(true);
    setDelid(id);
  };

  const delactivityfunc = () => {
    const params = {
      id: delid,
    };
    props.delActivity(params);
    materialdelete3(false);
  };

  //end Delete activity

  const [detailmodal, materialdetail] = useState(false);

  const detail = (id) => {
    setActdelid(id);
    let subdetaildata = result.filter((item, key) => {
      return item._id === id;
    });

    setDetaildata(subdetaildata[0]);
    materialdetail(!detailmodal);
  };

  useEffect(() => {
    props.getActivitiesdata();
    props.getMaterialdata();
    props.getTooldata();
    props.getPeopledata();
  }, []);

  useEffect(() => {
    setAlldata(props.activities);
    setResult(props.activities);

    if (actdelid !== "") {
      let subdetaildata1 = props.activities.filter((item, key) => {
        return item._id === actdelid;
      });
      setDetaildata(subdetaildata1[0]);
    }
  }, [props.activities]);

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

  const setimagefunc = (imagedata) => {
    setUploadimagedata(imagedata);
  };

  const [activityname, setActivityname] = useState("");
  const [uploadimagedata, setUploadimagedata] = useState(null);

  const activityadd = () => {
    let formdata = new FormData();
    formdata.append("photo", uploadimagedata);
    formdata.append("name", activityname);

    props.addActivity(formdata);
    setModalVisible(!addmodal);
  };

  // Add tool name and amount
  const [selectedtoolid, setSelectedtoolid] = useState("");
  const addtoolnameamount = () => {
    const paramData = {
      id: aid,
      tid: selectedtoolid,
      amount: toolamount,
    };
    props.addToolNameAmount(paramData);
    setEdittoolmodal(false);
  };

  const subtooldel = (id) => {
    const paramData = {
      id: actdelid,
      did: id,
    };
    props.subtooldel(paramData);
  };

  // end

  // Add and delete material name and amount
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

  const submatdel = (id) => {
    const paramData = {
      id: actdelid,
      did: id,
    };
    props.submatdel(paramData);
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

  const subpeopledel = (id) => {
    const paramData = {
      id: actdelid,
      did: id,
    };
    props.subpeopledel(paramData);
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

  const subactivitydel = (id) => {
    const paramData = {
      id: actdelid,
      did: id,
    };
    props.subactivitydel(paramData);
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
                    <View style={styles.materialtool}>
                      <TouchableOpacity
                        onPress={() => editmaterial(item._id)}
                        style={styles.edit}
                      >
                        <MaterialCommunityIcons
                          name="basket-plus"
                          size={24}
                          color={"#4287F6"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => edittool(item._id)}
                        style={styles.edit}
                      >
                        <FontAwesome5
                          name="tools"
                          size={24}
                          color={"#4287F6"}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.materialtool}>
                      <TouchableOpacity
                        onPress={() => editpeople(item._id)}
                        style={styles.edit}
                      >
                        <MaterialCommunityIcons
                          name="account-plus"
                          size={24}
                          color={"#4287F6"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => editsubactivity(item._id)}
                        style={styles.edit}
                      >
                        <MaterialCommunityIcons
                          name="cookie-plus"
                          size={24}
                          color={"#4287F6"}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => detail(item._id)}>
                      <Text style={styles.detail}>Show Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => activitydelete(item._id)}>
                      <Text style={styles.delete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
      </ScrollView>
      <Modal isVisible={addmodal}>
        <View style={styles.modal}>
          <View style={styles.imageupload}>
            <UploadImage setimagefunc={setimagefunc} />
          </View>
          <View style={styles.modal_materialname}>
            <Text style={styles.modal_materialnametext}>Activity Name :</Text>
            <TextInput
              style={styles.activitynameinput}
              onChangeText={(e) => setActivityname(e)}
            ></TextInput>
          </View>
          <View style={styles.addactivity_footer}>
            <TouchableOpacity onPress={activityadd}>
              <Text style={styles.addactivity}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addd}>
              <Text style={styles.addactivitycancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={edittoolmodal}>
        <View style={styles.modal}>
          <View style={styles.materialplus}>
            <View
              style={{
                width: "90%",
                marginTop: 10,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <View style={{ flex: 5 }}>
                  <Text
                    style={{
                      marginRight: 10,
                      textAlign: "right",
                      color: "#444444",
                    }}
                  >
                    Tool:
                  </Text>
                </View>
                <View style={{ flex: 14 }}>
                  <SelectDropdown
                    data={selecttooldata}
                    onSelect={(selectedItem, index) => {
                      setSelectedtoolid(selectedItem.key);
                    }}
                    defaultButtonText={"Choose Tool"}
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
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flex: 4, alignItems: "flex-end", marginLeft: 2 }}
                >
                  <Text style={{ color: "#444444" }}>Amount:</Text>
                </View>
                <View style={{ flex: 14 }}>
                  <TextInput
                    style={styles.modal_toolsnametextinput}
                    onChangeText={(e) => setToolamount(e)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.addactivities_footer}>
            <TouchableOpacity onPress={addtoolnameamount}>
              <Text style={styles.addactivity}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={edittoolclose}>
              <Text style={styles.addactivitycancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={editmaterialmodal}>
        <View style={styles.modal}>
          <View style={styles.materialplus}>
            <View
              style={{
                width: "90%",
                marginTop: 10,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <View style={{ flex: 5 }}>
                  <Text
                    style={{
                      marginRight: 10,
                      textAlign: "right",
                      color: "#444444",
                    }}
                  >
                    Material:
                  </Text>
                </View>
                <View style={{ flex: 14 }}>
                  <SelectDropdown
                    data={selectmaterialdata}
                    onSelect={(selectedItem, index) => {
                      setSelectedmaterialid(selectedItem.key);
                    }}
                    defaultButtonText={"Choose Material"}
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
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flex: 4, alignItems: "flex-end", marginLeft: 2 }}
                >
                  <Text style={{ color: "#444444" }}>Amount:</Text>
                </View>
                <View style={{ flex: 14 }}>
                  <TextInput
                    style={styles.modal_toolsnametextinput}
                    onChangeText={(e) => setMaterialamount(e)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.addactivities_footer}>
            <TouchableOpacity onPress={addmaterialnameamount}>
              <Text style={styles.addactivity}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={editmaterialclose}>
              <Text style={styles.addactivitycancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={editpeoplemodal}>
        <View style={styles.modal}>
          <View style={styles.materialplus}>
            <View
              style={{
                width: "90%",
                marginTop: 10,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <View style={{ flex: 5 }}>
                  <Text
                    style={{
                      marginRight: 10,
                      textAlign: "right",
                      color: "#444444",
                    }}
                  >
                    People:
                  </Text>
                </View>
                <View style={{ flex: 14 }}>
                  <SelectDropdown
                    data={selectpeopledata}
                    onSelect={(selectedItem, index) => {
                      setSelectedpeopleid(selectedItem.key);
                    }}
                    defaultButtonText={"Choose People"}
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
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                  alignItems: "center",
                }}
              ></View>
            </View>
          </View>
          <View style={styles.addactivities_footer}>
            <TouchableOpacity onPress={addpeoplenameamount}>
              <Text style={styles.addactivity}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={editpeopleclose}>
              <Text style={styles.addactivitycancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={editsubactivitymodal}>
        <View style={styles.modal}>
          <View style={styles.materialplus}>
            <View
              style={{
                width: "90%",
                marginTop: 10,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <View style={{ flex: 5 }}>
                  <Text
                    style={{
                      marginRight: 10,
                      textAlign: "right",
                      color: "#444444",
                    }}
                  >
                    Activity:
                  </Text>
                </View>
                <View style={{ flex: 14 }}>
                  <SelectDropdown
                    data={selectsubactivitydata}
                    onSelect={(selectedItem, index) => {
                      setSelectedsubactivityid(selectedItem.key);
                    }}
                    defaultButtonText={"Choose Subactivity"}
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
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flex: 4, alignItems: "flex-end", marginLeft: 2 }}
                >
                  <Text style={{ color: "#444444" }}>Amount:</Text>
                </View>
                <View style={{ flex: 14 }}>
                  <TextInput
                    style={styles.modal_toolsnametextinput}
                    onChangeText={(e) => setsubactivityamount(e)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.addactivities_footer}>
            <TouchableOpacity onPress={addsubactivitynameamount}>
              <Text style={styles.addactivity}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={editsubactivityclose}>
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
                        <TouchableOpacity onPress={() => submatdel(item._id)}>
                          <Icon name="close" size={24} color={"#DE5D5D"} />
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => subtooldel(item._id)}>
                          <Icon name="close" size={24} color={"#DE5D5D"} />
                        </TouchableOpacity>
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
                        <TouchableOpacity
                          onPress={() => subpeopledel(item._id)}
                        >
                          <Icon name="close" size={24} color={"#DE5D5D"} />
                        </TouchableOpacity>
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
                        <Text style={styles.modal_detailnametextrighttext}>
                          {"x" + item.amount}
                        </Text>
                        <TouchableOpacity
                          onPress={() => subactivitydel(item._id)}
                        >
                          <Icon name="close" size={24} color={"#DE5D5D"} />
                        </TouchableOpacity>
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
            <Text style={styles.modal_materialdelete}>Are you sure?</Text>
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
  imagecontainer: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
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
    height: 250,
    marginVertical: 15,
    marginHorizontal: 10,
    flexDirection: "row",
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
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#4287F6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  materialtool: {
    flexDirection: "row",
    marginTop: 10,
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
  modal_materialname: {
    padding: 25,
    flexDirection: "row",
  },
  modal_materialnametext: {
    color: "#bbb",
  },
  modal_toolnametext: {
    color: "#bbb",
    marginTop: -5,
  },
  modal_materialnametextinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 40,
    borderBottomWidth: 1,
    fontSize: 15,
    borderBottomColor: "#bbb",
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
  modal_detail: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  emptymodal_detail: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
  },
  modal_detailnametextleft: {
    width: "30%",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "flex-end",
  },
  modal_detailnametextright: {
    width: "70%",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal_detailnametextlefttext: {
    textAlign: "right",
  },
  materialdetail: {
    borderRadius: 10,
    borderWidth: 1,
    width: "80%",
    margin: 10,
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
  dropdown4BtnStyle: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFF",
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#535353",
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
    width: "80%",
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
  totalview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 30,
    alignItems: "flex-end",
  },
  modal_toolsnametextinput: {
    marginLeft: 20,
    marginTop: -3,
    width: 150,
    borderBottomWidth: 1,
    fontSize: 15,
    borderBottomColor: "#bbb",
  },
});

Activities.propTypes = {
  getActivitiesdata: PropTypes.func.isRequired,
  getTooldata: PropTypes.func.isRequired,
  getMaterialdata: PropTypes.func.isRequired,
  getPeopledata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activities: state.activities.data,
  materials: state.materials.data,
  tools: state.tools.data,
  peoples: state.peoples.data,
});

export default connect(mapStateToProps, {
  getActivitiesdata,
  addActivity,
  getMaterialdata,
  getTooldata,
  getPeopledata,
  addToolNameAmount,
  addMaterialNameAmount,
  addPeopleNameAmount,
  addSubacvitivyNameAmount,
  delActivity,
  submatdel,
  subtooldel,
  subpeopledel,
  subactivitydel,
})(Activities);

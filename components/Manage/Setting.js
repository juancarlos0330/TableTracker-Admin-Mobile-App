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
import Modal from "react-native-modal";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import {
  getServerurl,
  addServerurl,
  editServerurl,
  delServerurl,
  getRoledata,
  addRoledata,
  editRoledata,
} from "../Actions/serverurlActions";
import isEmpty from "../validation/is-empty";

const Setting = (props) => {
  const [alldata, setAlldata] = useState(null);
  const [result, setResult] = useState(null);
  const [roleresult, setRoleresult] = useState(null);
  const [servernames, setServernames] = useState("");
  const [rolenames, setRolenames] = useState("");

  // Role edit state variable
  const [editrolename, setEditrolename] = useState("");
  const [editroleid, setEditroleid] = useState("");
  const [editmodalflag, setEditmodalflag] = useState(false);

  // page flag
  const [pageflag, setPageflag] = useState(true);

  // for modal variable
  const [addserverurlbtn, setAddserverurlbtn] = useState(false);
  const [addroleurlbtn, setAddroleurlbtn] = useState(false);
  const addserverurl = () => {
    setAddserverurlbtn(!addserverurlbtn);
  };

  const addroleurl = () => {
    setAddroleurlbtn(!addroleurlbtn);
  };

  useEffect(() => {
    props.getServerurl();
    props.getRoledata();
  }, []);

  useEffect(() => {
    setAlldata(props.serverurl);
    setResult(props.serverurl);
  }, [props.serverurl]);

  useEffect(() => {
    setRoleresult(props.roles);
  }, [props.roles]);

  const addfunc = () => {
    const paramData = {
      url: servernames,
    };

    props.addServerurl(paramData);
    setAddserverurlbtn(false);
  };

  const addrolefunc = () => {
    const paramData = {
      name: rolenames,
    };

    props.addRoledata(paramData);
    setAddroleurlbtn(false);
  };

  const editrolefunc = (id, name) => {
    setEditroleid(id);
    setEditrolename(name);
    setEditmodalflag(true);
  };

  const updaterolefunc = () => {
    const paramData = {
      id: editroleid,
      name: editrolename,
    };
    props.editRoledata(paramData);
    setEditmodalflag(false);
  };

  const editfunc = (id) => {
    const paramData = {
      id,
    };
    props.editServerurl(paramData);
  };

  const deletefunc = (id) => {
    const paramData = { id };
    props.delServerurl(paramData);
  };

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      {pageflag ? (
        <View style={styles.container}>
          <View style={[styles.header, styles.boxWithShadow]}>
            <TouchableOpacity style={styles.add} onPress={() => addserverurl()}>
              <View style={styles.iconstyle}>
                <Icon name="plus" size={24} color={"#4287F6"} />
              </View>
            </TouchableOpacity>
            <Text style={styles.headertitle}>Server Editing</Text>
          </View>
          <ScrollView style={styles.main}>
            {isEmpty(result)
              ? null
              : result.map((item, key) => {
                  return (
                    <View
                      style={[styles.block, styles.boxWithShadow]}
                      key={key}
                    >
                      <View>
                        <Text>{item.server_url}</Text>
                      </View>
                      <View style={styles.seturlsec}>
                        <View>
                          {item.flag ? (
                            <TouchableOpacity>
                              <Icon name="check" size={24} color="green" />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => editfunc(item._id)}
                            >
                              <Icon name="play" size={24} color={"#4287F6"} />
                            </TouchableOpacity>
                          )}
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() => deletefunc(item._id)}
                          >
                            <Icon name="close" size={30} color={"#EC240B"} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
          </ScrollView>
          <Modal isVisible={addserverurlbtn}>
            <View style={styles.addmodal}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <TextInput
                  style={styles.addserverurltextinput}
                  onChangeText={(e) => setServernames(e)}
                />
              </View>
              <View style={styles.addmodal_footer}>
                <TouchableOpacity onPress={() => addfunc()}>
                  <Text style={styles.addmodalbutton}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addserverurl}>
                  <Text style={styles.addmodalcancelbutton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal>
            <View></View>
          </Modal>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={[styles.header, styles.boxWithShadow]}>
            <TouchableOpacity style={styles.add} onPress={() => addroleurl()}>
              <View style={styles.iconstyle}>
                <Icon name="plus" size={24} color={"#4287F6"} />
              </View>
            </TouchableOpacity>
            <Text style={styles.headertitle}>Role Editing</Text>
          </View>
          <ScrollView style={styles.main}>
            {isEmpty(roleresult) ? (
              <View style={styles.emptydatasection}>
                <Text style={styles.emptydatatext}>Empty Data</Text>
              </View>
            ) : (
              roleresult.map((item, key) => {
                return (
                  <View style={[styles.block, styles.boxWithShadow]} key={key}>
                    <View>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={styles.setrolesec}>
                      <View>
                        <TouchableOpacity
                          onPress={() => editrolefunc(item._id, item.name)}
                        >
                          <Icon name="edit" size={30} color={"#4287F6"} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
          <Modal isVisible={addroleurlbtn}>
            <View style={styles.addmodal}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <TextInput
                  style={styles.addserverurltextinput}
                  onChangeText={(e) => setRolenames(e)}
                  placeholder="Please type role"
                />
              </View>
              <View style={styles.addmodal_footer}>
                <TouchableOpacity onPress={() => addrolefunc()}>
                  <Text style={styles.addmodalbutton}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAddroleurlbtn(false)}>
                  <Text style={styles.addmodalcancelbutton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal isVisible={editmodalflag}>
            <View style={styles.addmodal}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <TextInput
                  style={styles.addserverurltextinput}
                  value={editrolename}
                  onChangeText={(e) => setEditrolename(e)}
                  placeholder="Please type role"
                />
              </View>
              <View style={styles.addmodal_footer}>
                <TouchableOpacity onPress={() => updaterolefunc()}>
                  <Text style={styles.addmodalbutton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditmodalflag(false)}>
                  <Text style={styles.addmodalcancelbutton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}

      <View style={[styles.bottom, styles.bottomWithShadow]}>
        <TouchableOpacity
          style={pageflag ? styles.actbottombtn : styles.bottombtn}
          onPress={() => setPageflag(true)}
        >
          <Ionicons
            name="server"
            color={pageflag ? "#4287F6" : "#000"}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={pageflag ? styles.bottombtn : styles.actbottombtn}
          onPress={() => setPageflag(false)}
        >
          <Entypo
            name="users"
            color={pageflag ? "#000" : "#4287F6"}
            size={24}
          />
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  headertitle: {
    fontSize: 20,
    textTransform: "uppercase",
    marginRight: 5,
    letterSpacing: 2,
    fontWeight: "bold",
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
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 5,
    width: "95%",
    height: 50,
    marginVertical: 15,
    marginHorizontal: 10,
    alignItems: "center",
  },
  addmodal: {
    backgroundColor: "white",
    alignItems: "center",
  },
  addmodalbutton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#54A2C0",
    marginTop: 10,
    marginLeft: 45,
    color: "white",
    backgroundColor: "#54A2C0",
  },
  addmodal_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  },
  addmodalcancelbutton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#de5d5d",
    marginTop: 10,
    marginRight: 45,
    color: "white",
    backgroundColor: "#de5d5d",
  },
  addserverurltextinput: {
    width: "85%",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    marginTop: 20,
    paddingVertical: 10,
    fontSize: 15,
    paddingLeft: 10,
  },
  emptydatasection: {
    flexDirection: "row",
    padding: 30,
    justifyContent: "center",
  },
  emptydatatext: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  seturlsec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
    width: "20%",
  },
  setrolesec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 10,
    width: "20%",
  },

  // bottomg section
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    width: "100%",
  },
  bottombtn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: "transparent",
    borderWidth: 5,
    borderStyle: "solid",
  },
  actbottombtn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: "transparent",
    borderBottomColor: "#4287f6",
    borderWidth: 5,
    borderStyle: "solid",
  },
  bottomWithShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 20,
  },
});

Setting.propTypes = {
  getServerurl: PropTypes.func.isRequired,
  addServerurl: PropTypes.func.isRequired,
  editServerurl: PropTypes.func.isRequired,
  delServerurl: PropTypes.func.isRequired,
  getRoledata: PropTypes.func.isRequired,
  editRoledata: PropTypes.func.isRequired,
  addRoledata: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  serverurl: state.serverurl.data,
  roles: state.roles.data,
});

export default connect(mapStateToProps, {
  getServerurl,
  addServerurl,
  editServerurl,
  delServerurl,
  getRoledata,
  editRoledata,
  addRoledata,
})(Setting);

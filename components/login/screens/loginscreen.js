import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ImageBackground,
  Alert,
  ToastAndroid,
} from 'react-native';
//import {LoginManager} from 'react-native-fbsdk'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { checkEmpty } from '../validate';
const logo = require('../../../assets/images/white-logo.png');
const background = require('../../../assets/images/background.png');
export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  onChangeUser = (username) => {
    this.setState({...this.state, username});
  };

  onChangePassword = (password) => {
    this.setState({...this.state, password});
  };
  _onToastAlert = (msg) => {
    Platform.OS === 'ios'
      ? Alert.alert('Thông báo', msg)
      : ToastAndroid.showWithGravityAndOffset(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          20,
        );
  };
  _handleValidate = (username, password) => {
    if (!checkEmpty(username)) {
      this._onToastAlert('You have not entered Username');
      return false;
    } else if (!checkEmpty(password)) {
      this._onToastAlert('You have not entered Password');
      return false;
    } else {
      return true;
    }
  };
  onSubmit = () => {
    let username = this.state.username.trim();
    let password = this.state.password.trim();
    if (this._handleValidate(username, password)) {
      let infor = {
        username,
        password,
      };
      console.log('Infor: ', infor);
      this.dismissKeyboard();
    }
    if (this._handleValidate(username, password) == true) {
      return(
        this.props.navigation.navigate('Homepage')
      );
    }
  };
  dismissKeyboard = () => {
    if (this.showKeyboard) {
      Keyboard.dismiss();
    }
  };
  /*async loginfacebook() {
    try {
      let result = await LoginManager.logInWithPermissions(['public_profile'])
      if (result.isCancelled) {
        this._onToastAlert('Login was cancelled')
      } else {
        this._onToastAlert('Login was successful with permissions :' + result.grantedPermissions.toString());
      }
    } catch (error) {
      this._onToastAlert('Login failed with error' + error)
    }
  }*/
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
          <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
            <ImageBackground style={styles.background} source={background}>
              <ScrollView style={styles.viewcontainer}>
                <View style={styles.header}>
                  <Image style={styles.image} source={logo} />
                </View>
                <View style={styles.body}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor="white"
                    onChangeText={this.onChangeUser}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={this.onChangePassword}
                    onSubmitEditing={this.onSubmit}
                  />
                </View>
                <View style={styles.bottom}>
                  <View style={styles.viewLogin}>
                    <TouchableOpacity
                      style={styles.btnLogin}
                      onPress={this.onSubmit}>
                      <Text>LOGIN</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewOption}>
                    <View style={styles.btnOption}>
                      <TouchableOpacity style={styles.googlefacebook}>
                        <EvilIcons
                          name={'sc-google-plus'}
                          size={30}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnOption}>
                      <TouchableOpacity style={styles.twitter}>
                        <EvilIcons
                          name={'sc-twitter'}
                          size={30}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnOption}>
                      <TouchableOpacity 
                        style={styles.googlefacebook}
                        onPress={this.loginfacebook}
                      >
                        <EvilIcons
                          name={'sc-facebook'}
                          size={30}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.viewRegister}>
                    <Text style={{color: 'white', fontSize: 15}}>
                      Don't have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Register')
                      }>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  body: {
    flex: 2.5,
    paddingTop: 40
  },
  bottom: {
    flex: 4,
    paddingTop: 35
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  image: {
    height: 130,
    width: 180,
  },
  textInput: {
    height: 40,
    borderColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  viewLogin: {
    flex: 1,
    alignItems: 'center',
  },
  btnLogin: {
    height: 40,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 180,
  },
  btnOption: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  viewOption: {
    flex: 1.5,
    flexDirection: 'row',
    marginHorizontal: 30,
  },
  viewRegister: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  googlefacebook: {
    height: 45,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 180,
    borderColor: 'white',
  },
  twitter: {
    height: 45,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 180,
    borderColor: 'white',
  },
});

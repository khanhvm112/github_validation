import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Image,
  ImageBackground,
  ScrollView,
  ToastAndroid
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {checkEmail, checkEmpty} from '../validate';
const logo = require('../../../assets/images/white-logo.png');
const background = require('../../../assets/images/background.png');
export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  onChangeUser = (username) => {
    this.setState({...this.state, username});
  };
  onChangeEmail = (email) => {
    this.setState({...this.state, email});
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
  _handleValidate = (username, email, password) => {
    if (!checkEmpty(username)) {
      this._onToastAlert('You have not entered username');
      return false;
    }else if (!checkEmpty(email)) {
      this._onToastAlert('You have not entered email');
      return false;
    }else if (!checkEmpty(password)) {
      this._onToastAlert('You have not entered password');
      return false;
    } else if (!checkEmail(email)) {
      this._onToastAlert('Email invalidate');
      return false;
    } else {
      return true;
    }
  };
  onSubmit = () => {
    let username = this.state.username.trim();
    let email = this.state.email.trim();
    let password = this.state.password.trim();
    if (this._handleValidate(username, email, password)) {
      let infor = {
        username,
        email,
        password,
      };
      console.log('Infor: ', infor);
      this.dismissKeyboard();
    }
    if (this._handleValidate(username, email, password)==true){
      this._onToastAlert('Account registration is successful')
      return(
        this.props.navigation.navigate('Login')
      );
    }
  };
  dismissKeyboard = () => {
    if (this.showKeyboard) {
      Keyboard.dismiss();
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  placeholder="Email"
                  placeholderTextColor="white"
                  onChangeText={this.onChangeEmail}
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
                  <TouchableOpacity style={styles.btnLogin} onPress={this.onSubmit}>
                    <Text>REGISTER</Text>
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
                    <TouchableOpacity style={styles.googlefacebook}>
                      <EvilIcons
                        name={'sc-facebook'}
                        size={30}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.viewRegister}>
                  <Text style={{color: 'white', fontSize: 15}} >Already have an account?</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Login')
                    }>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}> Login</Text>
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
    flex: 3.1,
    paddingTop: 30
  },
  bottom: {
    flex: 3.4,
    paddingTop: 15
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
    marginTop: 15
  },
  viewOption: {
    flex: 1.5,
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 25
  },
  viewRegister: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center'
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

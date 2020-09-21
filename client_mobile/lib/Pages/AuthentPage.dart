import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_login/flutter_login.dart';

import '../ServWrapper/User.dart';
import '../ServWrapper/ServWrapper.dart';
import '../Logins/GoogleLogin.dart';
import 'MainPage.dart';

class AuthentPage extends StatelessWidget {
  User user;

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Stack(
          children: <Widget>[
            FlutterLogin(
                title: 'Area',
                onLogin: _authUser,
                onSignup: _registerUser,
                onSubmitAnimationCompleted: () {
                  Navigator.of(context).pushReplacement(MaterialPageRoute(
                    builder: (context) => MainPage(user: user),
                  ));
                },
                onRecoverPassword: _recoverPassword),
            Column(children: <Widget>[
              SizedBox(height: 720),
              Center(child: GoogleLogin(onTapCallback: () async {
                await _googleLogin().then((User user) {
                  if (user != null) {
                    Navigator.of(context).pushReplacement(MaterialPageRoute(
                      builder: (context) => MainPage(user: user),
                    ));
                  } else {
                    showDialog(
                      context: context,
                      builder: (context) {
                        return AlertDialog(
                          content: Text(ServWrapper.error),
                          contentPadding: EdgeInsets.only(top: 15, left: 20),
                          actions: <Widget>[
                            FlatButton(
                              child: Text("OK"),
                              onPressed: () => Navigator.pop(context),
                            )
                          ],
                        );
                      },
                    );
                  }
                }).catchError((e) => print(e));
              }))
            ])
          ],
        ));
  }

  // CALLBACK FUNCTIONS

  Future<String> _authUser(LoginData data) async {
    user = await ServWrapper.authentication(data.name, data.password);
    if (user == null) return (ServWrapper.error);
    return (null);
  }

  Future<String> _registerUser(LoginData data) async {
    user = await ServWrapper.register(data.name, data.password);
    if (user == null) return (ServWrapper.error);
    return (null);
  }

  Future<String> _recoverPassword(String name) async {
    await ServWrapper.recoverPassword(name);
    return (ServWrapper.error);
  }

  Future<User> _googleLogin() async {
    user = await ServWrapper.googleAuthent();
    return (user);
  }
}

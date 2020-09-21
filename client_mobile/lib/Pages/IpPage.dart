import 'package:area/Pages/AuthentPage.dart';
import 'package:flutter/material.dart';

import '../ServWrapper/ServWrapper.dart';

class IpPage extends StatefulWidget {
  @override
  _IpPageState createState() => _IpPageState();
}

class _IpPageState extends State<IpPage> {
  final myControllerIp = TextEditingController();
  final myControllerPort = TextEditingController();


  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myControllerIp.dispose();
    myControllerPort.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return (Scaffold(
      backgroundColor: Colors.blue,
      body: Center(
        child: Card(
          elevation: 2,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(20)),
          ),
          child: Container(
            width: 300,
            height: 220,
            child: Center(
              child: Column(
                children: <Widget>[
                  Container(
                      margin: EdgeInsets.only(top: 15, bottom: 7),
                      alignment: AlignmentDirectional.topCenter,
                      child: SizedBox(
                          width: 250,
                          child: TextField(
                            controller: myControllerIp,
                            decoration: InputDecoration(
                                hintText: 'Enter the IP adress of the server'
                            ),
                          )
                      )
                  ),
                  Container(
                      margin: EdgeInsets.only(top: 15, bottom: 7),
                      alignment: AlignmentDirectional.topCenter,
                      child: SizedBox(
                          width: 250,
                          child: TextField(
                            controller: myControllerPort,
                            decoration: InputDecoration(
                                hintText: 'Enter the port of the server'
                            ),
                          )
                      )
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 20),
                    child: ButtonTheme(
                      height: 40,
                      minWidth: 130,
                      child: RaisedButton(
                        child: Text("ENTER",
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: new BorderRadius.circular(22.0),
                        ),
                        color: Colors.blue,
                        onPressed: () {
                          checkServerIp(myControllerIp.text, myControllerPort.text).then((data) {
                            if (data == "") {
                              Navigator.of(context).pushReplacement(MaterialPageRoute(
                                builder: (context) => AuthentPage(),
                              ));
                            } else {
                              showDialog(
                                context: context,
                                builder: (context) {
                                  return AlertDialog(
                                    content: Text("Cannot reach server."),
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
                          });
                        },
                      )
                    )
                  )
                ],
              )
            )
          )
        )
      )
    ));
  }

  Future<String> checkServerIp(String ip, String port) async {
    if (await ServWrapper.isHere(ip + ":" + port))
      return ("");
    return (ServWrapper.error);
  }
}
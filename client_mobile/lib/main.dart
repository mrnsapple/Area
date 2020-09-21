import 'package:flutter/material.dart';
import 'Pages/IpPage.dart';
import 'package:simple_auth_flutter/simple_auth_flutter.dart';

void main() {
  runApp(AreaApp());
}

class AreaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SimpleAuthFlutter.init(context);
    return MaterialApp(
      title: 'Area App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: IpPage(),
    );
  }
}

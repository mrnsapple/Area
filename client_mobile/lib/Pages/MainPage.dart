import 'package:area/Pages/ServicePage.dart';
import 'package:flutter/material.dart';

import 'AuthentPage.dart';
import 'HomePage.dart';
import '../ServWrapper/User.dart';
import '../ServWrapper/ServWrapper.dart';

class MainPage extends StatefulWidget {
  final User user;

  MainPage({@required this.user});

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _selectedIndex = 0;
  List<Widget> _widgetOptions;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);

  void _logout() {
    ServWrapper.logout(widget.user.email);
    Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => AuthentPage()));
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      if (index == 2) _logout();
    });
  }

  @override
  void initState() {
    _widgetOptions = <Widget>[
      HomePage(user: widget.user),
      ServicePage(user: widget.user),
      Text(
        "Deconnexion..",
        style: optionStyle,
      )
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text("Home"),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            title: Text('Services'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            title: Text('Quit'),
          )
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.black,
        backgroundColor: Colors.blue,
        onTap: _onItemTapped,
      ),
    );
  }
}

import 'package:flutter/material.dart';

import '../ServWrapper/User.dart';
import '../ServWrapper/ServWrapper.dart';
import '../UI/LinkWidget.dart';
import '../UI/CreateDialog.dart';


class HomePage extends StatefulWidget {
  User user;
  List<LinkWidget> links;

  HomePage({ @required this.user });

  @override
  HomePageState createState() => new HomePageState();
}

class HomePageState extends State<HomePage> {

  @override
  void initState() {
    super.initState();
    ServWrapper.getUserLinks(widget.user.email).then((res) {
      setState(() {
        widget.links =
            res.map((elem) => LinkWidget(link: elem, userEmail: widget.user.email)).toList();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return (Scaffold(
      appBar: AppBar(
        title: const Text('Areas'),
      ),
      body: widget.links == null ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(child: Column(children: widget.links)),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (_) => CreateDialog(widget.user.email),
          );
        },
        child: Icon(Icons.add),
        backgroundColor: Colors.blue,
      ),
    ));
  }
}
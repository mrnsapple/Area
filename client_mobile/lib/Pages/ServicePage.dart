import 'package:flutter/material.dart';

import '../ServWrapper/User.dart';
import '../ServWrapper/ServWrapper.dart';
import '../UI/ServiceWidget.dart';

class ServicePage extends StatefulWidget {
  User user;
  List<ServiceWidget> services;

  ServicePage({@required this.user});

  @override
  ServicePageState createState() => new ServicePageState();
}

class ServicePageState extends State<ServicePage> {
  @override
  void initState() {
    super.initState();
    ServWrapper.getServices(widget.user.email).then((res) {
      setState(() {
        widget.services = res
            .map((elem) =>
                ServiceWidget(service: elem, onChanged: handleService))
            .toList();
      });
    });
  }

  void handleService(bool subscribed, String idServ) async {
    if (subscribed == true) {
      await ServWrapper.subscribeServ(widget.user.email, subscribed, idServ);
      if (ServWrapper.error != null) print(ServWrapper.error);
    } else {
      await ServWrapper.unsubscribeServ(widget.user.email, subscribed, idServ);
      if (ServWrapper.error != null) print(ServWrapper.error);
    }
  }

  Widget build(BuildContext context) {
    return FutureBuilder<List>(
      future: ServWrapper.getServices(widget.user.email),
      builder: (BuildContext context, AsyncSnapshot<List> snapshot) {
        List<Widget> children;

        if (snapshot.hasData) {
          children = snapshot.data
              .map((elem) =>
                  ServiceWidget(service: elem, onChanged: handleService))
              .toList();
        } else if (snapshot.hasError) {
          print(snapshot.error);
        } else {
          children = <Widget>[
            Center(child: CircularProgressIndicator()),
          ];
        }

        return (Scaffold(
          appBar: AppBar(
            title: const Text('Services'),
          ),
          body: SingleChildScrollView(child: Column(children: children)),
        ));
      },
    );
  }
}

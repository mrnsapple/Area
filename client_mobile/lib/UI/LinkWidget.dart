import 'package:area/UI/EndpointWidget.dart';
import 'package:flutter/material.dart';

import '../Services/Link.dart';
import 'EndpointWidget.dart';
import 'ColorManager.dart';

class LinkWidget extends StatefulWidget {
  Link link;
  String userEmail;
  ColorManager colors = ColorManager({
    'cardBg': Color.fromRGBO(195, 204, 205, 0.8),
  });

  LinkWidget({ @required this.link, @required this.userEmail});

  @override
  LinkWidgetState createState() => new LinkWidgetState();
}

class LinkWidgetState extends State<LinkWidget> {
  @override
  Widget build(BuildContext context) {
    return (Card(
        margin: EdgeInsets.only(top: 12.0, bottom: 5.0, left: 10.0, right: 10.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        color: widget.colors.getColor('cardBg'),
        elevation: 3,
        child: Container (
          margin: EdgeInsets.only(top: 10, bottom: 10),
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                      child: EndpointWidget(widget.link.action)
                  ),
                  Container(
                      width: 40,
                  ),
                  Container(
                      child: EndpointWidget(widget.link.reaction)
                  ),
                ],
                mainAxisAlignment: MainAxisAlignment.center,
              )
            ]
          )
        )
      )
    );
  }
}
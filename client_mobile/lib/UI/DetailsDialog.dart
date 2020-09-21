import 'package:flutter/material.dart';

import '../Services/Endpoint.dart';

class DetailsDialog extends StatefulWidget {
  Endpoint endpoint;

  DetailsDialog({@required this.endpoint});

  @override
  State<StatefulWidget> createState() => DetailsDialogState();
}

class DetailsDialogState extends State<DetailsDialog> with SingleTickerProviderStateMixin {
  AnimationController controller;
  Animation<double> scaleAnimation;

  @override
  void initState() {
    super.initState();

    controller = AnimationController(vsync: this, duration: Duration(milliseconds: 450));
    scaleAnimation = CurvedAnimation(parent: controller, curve: Curves.elasticInOut);
    controller.addListener(() {
      setState(() {});
    });
    controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Material(
        color: Colors.transparent,
        child: ScaleTransition(
          scale: scaleAnimation,
          child:
          Container(
            width: 300,
            height: 380,
            decoration: ShapeDecoration(
                color: Colors.white,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0))),
            child: Padding(
              padding: const EdgeInsets.all(15.0),
              child: Column(
                children: <Widget>[
                  Container(
                    margin: EdgeInsets.only(top: 5.0, bottom: 20.0),
                    child: Text(widget.endpoint.type + " : " + widget.endpoint.name),
                  ),
                  SizedBox(
                    width: 130,
                    height: 130,
                    child: Image.asset(widget.endpoint.img),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5.0, bottom: 20.0),
                    child: Text(widget.endpoint.service),
                  ),
                  Container(
                    width: 270,
                    margin: EdgeInsets.only(top: 5.0, bottom: 20.0),
                    child: Text("Decription : " + widget.endpoint.description),
                  ),
                ]
              ),
            ),
          ),
        ),
      ),
    );
  }
}
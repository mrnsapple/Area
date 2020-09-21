import 'package:flutter/material.dart';

import '../Services/Endpoint.dart';
import 'ColorManager.dart';
import 'DetailsDialog.dart';

class EndpointWidget extends StatelessWidget {
  Endpoint endpoint;
  bool enabledParent;
  ColorManager colors = ColorManager({
    'cardBg': Color.fromRGBO(217, 236, 236, 1),
    'titleColor': Color.fromRGBO(255, 255, 255, 1),
    'titleShadowColor': Color.fromRGBO(33, 150, 243, 1),
    'titleBg': Color.fromRGBO(165, 174, 175, 0.7)
  });

  EndpointWidget(this.endpoint) {
    colors.originalColors();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () {
            showDialog(
              context: context,
              builder: (_) => DetailsDialog(endpoint: endpoint),
            );
        },
        child: Container(
        height: 120,
        width: 140,
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          color: colors.getColor("cardBg"),
          elevation: 1,
          child: Column(
              children: <Widget>[
                Container(
                    margin: EdgeInsets.only(top: 0),
                    child: Transform.scale(
                        scale: 0.7,
                        child: Chip(
                          label: Text(endpoint.name,
                            style: TextStyle(
                                fontSize: 15.0,
                                color: colors.getColor("titleColor"),
                                fontWeight: FontWeight.bold
                            ),
                          ),
                          shadowColor: colors.getColor("titleShadowColor"),
                          backgroundColor: colors.getColor("titleBg"),
                          elevation: 10,
                          autofocus: true,
                        )
                    )
                ),
                Row(
                    children: <Widget>[
                      Container(
                        margin: EdgeInsets.only(top: 0, left: 10, right: 15),
                        width: 37.0,
                        height: 37.0,
                        decoration: BoxDecoration(
                            image: DecorationImage(
                              image: AssetImage(endpoint.img),
                              fit: BoxFit.cover
                            ),
                            borderRadius:
                            BorderRadius.all(Radius.circular(75.0)),
                            boxShadow: [
                              BoxShadow(blurRadius: 3.0, color: Colors.black)
                            ]
                        ),
                      ),
                      Container(
                          width: 60,
                          margin: EdgeInsets.only(right: 10, top: 5.0),
                          child: Text(endpoint.shortDesc,
                              style: new TextStyle(
                                fontSize: 9.0,
                                color: Colors.black,

                              )
                          )
                      )
                    ]
                ),
              ]
          ),
        )
    ));
  }
}

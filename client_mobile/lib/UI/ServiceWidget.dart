import 'package:flutter/material.dart';

import '../Services/Services.dart';
import '../UI/ServiceEpWidget.dart';
import 'SwitchWidget.dart';
import 'ColorManager.dart';

class ServiceWidget extends StatefulWidget {
  Service service;
  void Function(bool, String) onChanged;
  ColorManager colors = ColorManager({
    'cardBg': Color.fromRGBO(195, 204, 205, 0.8),
  });

  ServiceWidget({@required this.service, this.onChanged});

  @override
  ServiceWidgetState createState() => new ServiceWidgetState();
}

class ServiceWidgetState extends State<ServiceWidget> {
  @override
  void initState() {
    setState(() {
      if (widget.service.subscribed == true)
        widget.colors.originalColors();
      else
        widget.colors.disableColors();
    });
    super.initState();
  }

  void refresh() {
    setState(() {
      widget.service.subscribed = !widget.service.subscribed;
      if (widget.service.subscribed == true)
        widget.colors.originalColors();
      else
        widget.colors.disableColors();
      widget.onChanged(widget.service.subscribed, widget.service.id);
    });
  }

  @override
  Widget build(BuildContext context) {
    return (Card(
        margin:
            EdgeInsets.only(top: 12.0, bottom: 5.0, left: 10.0, right: 10.0),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.0),
        ),
        color: widget.colors.getColor('cardBg'),
        elevation: 3,
        child: Container(
            margin: EdgeInsets.only(top: 10, bottom: 10),
            child: Column(
              children: <Widget>[
                Stack(
                  children: <Widget>[
                    Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Container(
                            margin: EdgeInsets.only(right: 5),
                            width: 37.0,
                            height: 37.0,
                            decoration: BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage(widget.service.img),
                                    fit: BoxFit.cover),
                                borderRadius:
                                    BorderRadius.all(Radius.circular(75.0)),
                                boxShadow: [
                                  BoxShadow(
                                      blurRadius: 3.0, color: Colors.black)
                                ]),
                          ),
                          Container(
                            margin: EdgeInsets.only(left: 5),
                            child: Text(widget.service.name),
                          ),
                        ]),
                    Container(
                        alignment: Alignment.centerRight,
                        child: SwitchWidget((bool tmp) {
                          refresh();
                        }, widget.service.subscribed)),
                  ],
                ),
                SizedBox(height: 8),
                Row(
                  mainAxisSize: MainAxisSize.max,
                  children: <Widget>[
                    Expanded(
                      child: Text("Actions",
                        textAlign: TextAlign.center
                      ),
                    ),
                    Expanded(
                      child: Text("Réactions",
                          textAlign: TextAlign.center
                      ),
                    )

                  ]
                ),
                SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Expanded(
                        //margin: EdgeInsets.symmetric(horizontal: 10),
                        child: Column(
                          children: <Widget>[
                            widget.service.actions != null
                                ? Column(
                                    children: widget.service.actions
                                        .map((elem) => ServiceEpWidget(
                                            elem, widget.service.subscribed))
                                        .toList())
                                : Column()
                          ],
                        )),
                    Expanded(
                        //margin: EdgeInsets.symmetric(horizontal: 10),
                        child: Column(
                            children: <Widget>[
                              widget.service.reactions != null
                                  ? Column(
                                      children: widget.service.reactions
                                          .map((elem) => ServiceEpWidget(
                                              elem, widget.service.subscribed))
                                          .toList())
                                  : Column()
                            ],
                          )
                    ),
                  ],
                )
              ],
            ))));
  }
}

import 'package:flutter/material.dart';

import '../Services/Endpoint.dart';
import '../UI/ParamWidgets/ParamWdgtFactory.dart';
import '../ServWrapper/ServWrapper.dart';

class ListCreaAreaServ extends StatefulWidget {
  EPType type;
  String userEmail;
  Map<String, String> aServiceValues = {"id": "0", "value": "Services"};
  Map<String, String> reaServiceValues = {"id": "0", "value": "Services"};
  Map<String, String> actionValues = {
    "id": "0",
    "value": "Actions",
    "paramType": "null"
  };
  Map<String, String> reactionValues = {
    "id": "0",
    "value": "Réactions",
    "paramType": "null"
  };
  String paramValue = "null";
  List<dynamic> services;

  ListCreaAreaServ(this.userEmail, this.type);

  @override
  State<StatefulWidget> createState() => ListCreaAreaServState();
}

class ListCreaAreaServState extends State<ListCreaAreaServ> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return (Container(
        width: 125,
        margin: EdgeInsets.only(left: 5, right: 5),
        child: Column(
          children: <Widget>[
            Text(widget.type == EPType.action ? "Actions" : "Réactions"),
            ServiceList(),
            EndpointList(),
            ParamWidget(),
          ],
        )));
  }

  Widget ServiceList() {
    return (FutureBuilder<List>(
        future: ServWrapper.getSubscribedServices(widget.userEmail),
        builder: (BuildContext context, AsyncSnapshot<List> snapshot) {
          List<Widget> children;

          if (snapshot.hasData) {
            widget.services = snapshot.data.map((elem) => elem).toList();

            children = snapshot.data
                .map((elem) => DropdownMenuItem<String>(
                    value: elem.name, child: Text(elem.name)))
                .toList();
          } else if (snapshot.hasError) {
            print(snapshot.error);
          } else {
            return (Center(child: CircularProgressIndicator()));
          }

          if (widget.type == EPType.action) {
            return (DropdownButton<String>(
              isExpanded: true,
              hint: Text(widget.aServiceValues["value"]),
              items: children,
              onChanged: (String newValue) {
                setState(() {
                  widget.aServiceValues["value"] = newValue;
                  widget.aServiceValues["id"] = "0";
                  for (int cpt = 0; cpt < widget.services.length; cpt++) {
                    if (widget.services[cpt].name == newValue)
                      widget.aServiceValues["id"] = widget.services[cpt].id;
                  }
                });
              },
            ));
          } else {
            return (DropdownButton<String>(
              isExpanded: true,
              hint: Text(widget.reaServiceValues["value"]),
              items: children,
              onChanged: (String newValue) {
                setState(() {
                  widget.reaServiceValues["value"] = newValue;
                  widget.reaServiceValues["id"] = "0";
                  for (int cpt = 0; cpt < widget.services.length; cpt++) {
                    if (widget.services[cpt].name == newValue)
                      widget.reaServiceValues["id"] = widget.services[cpt].id;
                  }
                });
              },
            ));
          }
        }));
  }

  Widget EndpointList() {
    if (widget.type == EPType.action) {
      if (widget.aServiceValues["id"] != "0" &&
          getEpByServiceId(
                  widget.services, widget.aServiceValues["id"], widget.type) !=
              null &&
          getEpByServiceId(
                      widget.services, widget.aServiceValues["id"], widget.type)
                  .length >
              0) {
        return (DropdownButton<String>(
          isExpanded: true,
          hint: Text(widget.actionValues["value"]),
          items: getEpByServiceId(
                  widget.services, widget.aServiceValues["id"], widget.type)
              .map((elem) => DropdownMenuItem<String>(
                  value: elem.name, child: Text(elem.name)))
              .toList(),
          onChanged: (String newValue) {
            setState(() {
              widget.actionValues["value"] = newValue;
              widget.actionValues["id"] = "0";
              widget.actionValues["paramType"] = "null";

              List<Endpoint> actions = getEpByServiceId(
                  widget.services, widget.aServiceValues["id"], widget.type);
              for (int cpt = 0; cpt < actions.length; cpt++) {
                if (actions[cpt].name == newValue) {
                  widget.actionValues["id"] = actions[cpt].id;
                  widget.actionValues["paramType"] = actions[cpt].paramType;
                }
              }
            });
          },
        ));
      } else if (widget.aServiceValues["id"] != "0")
        // A FUSIONNER AVEC PLUS HAUT
        return (Text("No actions"));
      else
        return (Text("Please select service"));
    } else {
      if (widget.reaServiceValues["id"] != "0" &&
          getEpByServiceId(widget.services, widget.reaServiceValues["id"],
                  widget.type) !=
              null &&
          getEpByServiceId(widget.services, widget.reaServiceValues["id"],
                      widget.type)
                  .length >
              0) {
        return (DropdownButton<String>(
          isExpanded: true,
          hint: Text(widget.reactionValues["value"]),
          items: getEpByServiceId(
                  widget.services, widget.reaServiceValues["id"], widget.type)
              .map((elem) => DropdownMenuItem<String>(
                  value: elem.name, child: Text(elem.name)))
              .toList(),
          onChanged: (String newValue) {
            setState(() {
              widget.reactionValues["value"] = newValue;
              widget.reactionValues["id"] = "0";
              widget.reactionValues["paramType"] = "null";

              List<Endpoint> reactions = getEpByServiceId(
                  widget.services, widget.reaServiceValues["id"], widget.type);
              for (int cpt = 0; cpt < reactions.length; cpt++) {
                if (reactions[cpt].name == newValue) {
                  widget.reactionValues["id"] = reactions[cpt].id;
                  widget.reactionValues["paramType"] = reactions[cpt].paramType;
                }
              }
            });
          },
        ));
      } else if (widget.reaServiceValues["id"] != "0")
        // A FUSIONNER AVEC PLUS HAUT
        return (Text("No reactions"));
      else
        return (Text("Please select service"));
    }
  }

  String onParamValueChanged(String newValue) {
    widget.paramValue = newValue;
  }

  Widget ParamWidget() {
    if (widget.type == EPType.action) {
      if (widget.actionValues["paramType"] == "string")
        return (ParamWidgetFactory.createParamWdgt(onParamValueChanged, widget.actionValues["paramType"], ""));
      return (ParamWidgetFactory.createParamWdgt(onParamValueChanged, widget.actionValues["paramType"]));
    }
    if (widget.reactionValues["paramType"] == "string")
      return (ParamWidgetFactory.createParamWdgt(onParamValueChanged, widget.reactionValues["paramType"], ""));
    return (ParamWidgetFactory.createParamWdgt(onParamValueChanged, widget.reactionValues["paramType"]));
  }

  List<Endpoint> getEpByServiceId(
      List<dynamic> services, String id, EPType type) {
    List<Endpoint> endpoints = [];

    for (int cpt = 0; cpt < services.length; cpt++) {
      if (services[cpt].actions == null || services[cpt].reactions == null)
        continue;
      else if (services[cpt].id == id) {
        for (int cptEp = 0;
            type == EPType.action && cptEp < services[cpt].actions.length;
            cptEp++) endpoints.add(services[cpt].actions[cptEp]);
        for (int cptEp = 0;
            type == EPType.reaction && cptEp < services[cpt].reactions.length;
            cptEp++) endpoints.add(services[cpt].reactions[cptEp]);
        return (endpoints);
      }
    }
    return (null);
  }
}

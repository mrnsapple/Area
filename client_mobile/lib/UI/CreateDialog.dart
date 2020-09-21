import 'dart:io';

import 'package:area/ServWrapper/ServWrapper.dart';
import '../UI/ParamWidgets/ParamWdgtFactory.dart';
import 'package:flutter/material.dart';

import '../UI/ListCreaAreaServ.dart';
import '../Services/Endpoint.dart';


class CreateDialog extends StatefulWidget {
  String userEmail;

  CreateDialog(this.userEmail);

  @override
  State<StatefulWidget> createState() => CreateDialogState();
}

class CreateDialogState extends State<CreateDialog>
    with SingleTickerProviderStateMixin {
  AnimationController controller;
  Animation<double> scaleAnimation;

  @override
  void initState() {
    super.initState();

    controller =
        AnimationController(vsync: this, duration: Duration(milliseconds: 450));
    scaleAnimation =
        CurvedAnimation(parent: controller, curve: Curves.elasticInOut);
    controller.addListener(() {
      setState(() {});
    });
    controller.forward();
  }
    
  @override
  Widget build(BuildContext context) {
    ListCreaAreaServ actionLists = ListCreaAreaServ(widget.userEmail, EPType.action);
    ListCreaAreaServ reactionLists = ListCreaAreaServ(widget.userEmail, EPType.reaction);

    return Center(
      child: Material(
        color: Colors.transparent,
        child: ScaleTransition(
          scale: scaleAnimation,
          child: Container(
              width: 300,
              height: 380,
              decoration: ShapeDecoration(
                  color: Colors.white,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.0))),
              child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(children: <Widget>[
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[actionLists, reactionLists]
                    ),
                    FlatButton(
                      child: Text("Create"),
                      onPressed: () {
                        List<String> listParam = [
                          actionLists.actionValues["id"],
                          actionLists.paramValue,
                          reactionLists.reactionValues["id"],
                          reactionLists.paramValue,
                        ];

                        // A MODIFIER AVEC LES PARAMS
                        if (checkValidValues(listParam) == true) {
                          ServWrapper.addArea(widget.userEmail, listParam);
                          Navigator.pop(context);
                        } else {
                          showDialog(
                            context: context,
                            builder: (context) {
                              return AlertDialog(
                                content: Text("Error : Bad parameters."),
                                contentPadding: EdgeInsets.only(top: 15, left: 20),
                                actions: <Widget>[
                                  FlatButton(
                                    child: Text("OK"),
                                    onPressed: () {
                                      Navigator.pop(context);
                                    }
                                  )
                                ],
                              );
                            }
                          );
                        }
                        //FUCKING REFRESH
//                        Navigator.of(context).push(MaterialPageRoute(
//                          builder: (context) => MainPage(user: User(widget.userEmail)),
//                        ));
                      },
                    )
                  ]))),
        ),
      ),
    );
  }

  bool checkValidValues(List<String> listParam) {
    for (int cpt = 0; cpt < listParam.length; cpt++) {
      try {
        if (int.parse(listParam[cpt]) <= 0)
          return (false);
      } catch (e) {

      }
    }
    return (true);
  }
}

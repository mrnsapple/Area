import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class StringWdgt extends StatefulWidget {
  String value = "";
  Function onChange;

  StringWdgt(this.onChange);

  @override
  State<StatefulWidget> createState() => StringWdgtState();
}

class StringWdgtState extends State<StringWdgt> {

  @override
  Widget build(BuildContext context) {
    return (Column(
        children: <Widget>[
          Container(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Value:',
              ),
              keyboardType: TextInputType.emailAddress,
              onChanged: (String newValue) {
                setState(() {
                  widget.value = newValue;
                  widget.onChange(widget.value);
                });
              },
            ),
          )
        ],
      )
    );
  }

}
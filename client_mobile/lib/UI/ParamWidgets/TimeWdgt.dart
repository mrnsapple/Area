import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class TimeWdgt extends StatefulWidget {
  String hourValue;
  String minValue;
  Function onChange;

  TimeWdgt(this.onChange);

  @override
  State<StatefulWidget> createState() => TimeWdgtState();
}

class TimeWdgtState extends State<TimeWdgt> {
  @override
  Widget build(BuildContext context) {
    return (Column(
      children: <Widget>[
        Container(
          child: TextField(
            decoration: InputDecoration(
              hintText: 'Hours [0, 23]',
            ),
            keyboardType: TextInputType.number,
            onChanged: (String newValue) {
              setState(() {
                widget.hourValue = newValue;
                widget.onChange(widget.hourValue + "|" + widget.minValue);
              });
            },
          ),
        ),
        Container(
          child: TextField(
            decoration: InputDecoration(
              hintText: 'Min [0, 59]',
            ),
            keyboardType: TextInputType.number,
            onChanged: (String newValue) {
              setState(() {
                widget.minValue = newValue;
                widget.onChange(widget.hourValue + "|" + widget.minValue);
              });
            },
          ),
        )
      ],
    ));
  }
}

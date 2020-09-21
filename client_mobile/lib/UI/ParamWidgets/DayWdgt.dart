import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DayWdgt extends StatefulWidget {
  String dayValue;
  Function onChange;

  DayWdgt(this.onChange);

  @override
  State<StatefulWidget> createState() => DayWdgtState();
}

class DayWdgtState extends State<DayWdgt> {

  @override
  Widget build(BuildContext context) {
    return (Column(
        children: <Widget>[
          Container(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Day [1, 7]',
              ),
              keyboardType: TextInputType.number,
              onChanged: (String newValue) {
                setState(() {
                  widget.dayValue = newValue;
                  widget.onChange(widget.dayValue);
                });
              },
            ),
          ),
        ],
      )
    );
  }

}
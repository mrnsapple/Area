import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DateWdgt extends StatefulWidget {
  String monthValue;
  String dayValue;
  Function onChange;

  DateWdgt(this.onChange);

  @override
  State<StatefulWidget> createState() => DateWdgtState();
}

class DateWdgtState extends State<DateWdgt> {

  @override
  Widget build(BuildContext context) {
    return (Column(
        children: <Widget>[
          Container(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Month [1,12]',
              ),
              keyboardType: TextInputType.number,
              onChanged: (String newValue) {
                setState(() {
                  widget.monthValue = newValue;
                  widget.onChange(widget.monthValue + "|" + widget.dayValue);
                });
              },
            ),
          ),
          Container(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Day [1,7]',
              ),
              keyboardType: TextInputType.number,
              onChanged: (String newValue) {
                setState(() {
                  widget.dayValue = newValue;
                  widget.onChange(widget.monthValue + "|" + widget.dayValue);
                });
              },
            ),
          )
        ],
      )
    );
  }

}
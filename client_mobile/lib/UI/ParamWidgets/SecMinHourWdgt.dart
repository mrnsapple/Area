import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class SecMinHourWdgt extends StatefulWidget {
  String paramType = "step";
  String value = "0";
  Function onChange;

  SecMinHourWdgt(this.onChange);

  @override
  State<StatefulWidget> createState() => SecMinHourWdgtState();
}

class SecMinHourWdgtState extends State<SecMinHourWdgt> {

  @override
  Widget build(BuildContext context) {
    return (Column(
        children: <Widget>[
          Container(
            child: DropdownButton<String>(
              isExpanded: true,
              hint: Text(widget.paramType),
              items: <String>['sec', 'min', 'hour']
                  .map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              })
                  .toList(),
              onChanged: (String newValue) {
                setState(() {
                  widget.paramType = newValue;
                  widget.onChange(newValue + "|" + widget.value);
                });
              },
            )
          ),
          Container(
            child: TextField(
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: 'Value',
              ),
              inputFormatters: <TextInputFormatter>[
                WhitelistingTextInputFormatter.digitsOnly
              ],
              onChanged: (String newValue) {
                setState(() {
                  widget.value = newValue;
                  widget.onChange(widget.paramType + "|" + newValue);
                });
              },
            ),
          )
        ],
      )
    );
  }

}
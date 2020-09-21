import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class MailWdgt extends StatefulWidget {
  String mailValue = "0";
  String objectValue = "0";
  String bodyValue = "0";
  Function onChange;

  MailWdgt(this.onChange);

  @override
  State<StatefulWidget> createState() => MailWdgtState();
}

class MailWdgtState extends State<MailWdgt> {

  @override
  Widget build(BuildContext context) {
    return (Column(
        children: <Widget>[
          Container(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Mail to :',
              ),
              keyboardType: TextInputType.emailAddress,
              onChanged: (String newValue) {
                setState(() {
                  widget.mailValue = newValue;
                  widget.onChange(widget.mailValue + "|" + widget.objectValue + "|" +
                                  widget.bodyValue);
                });
              },
            ),
          ),
          Container(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Subject :',
              ),
              onChanged: (String newValue) {
                setState(() {
                  widget.objectValue = newValue;
                  widget.onChange(widget.mailValue + "|" + widget.objectValue + "|" +
                      widget.bodyValue);
                });
              },
            ),
          ),
          Container(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Body :',
              ),
              onChanged: (String newValue) {
                setState(() {
                  widget.bodyValue = newValue;
                  widget.onChange(widget.mailValue + "|" + widget.objectValue + "|" +
                      widget.bodyValue);
                });
              },
            ),
          )
        ],
      )
    );
  }

}
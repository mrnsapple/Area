import 'package:flutter/material.dart';

class SwitchWidget extends StatelessWidget {
  void Function(bool) onTap;
  bool switchControl;

  SwitchWidget(Function trigger, bool enabled)
      : onTap = trigger,
        switchControl = enabled;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(left: 5),
      child: Transform.scale(
          scale: 1.2,
          child: Switch(
            onChanged: onTap,
            value: switchControl,
            activeColor: Colors.blue,
            activeTrackColor: Colors.lightBlueAccent,
            inactiveThumbColor: Colors.white,
            inactiveTrackColor: Colors.grey,
          )),
    );
  }
}

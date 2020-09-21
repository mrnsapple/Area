import 'package:flutter/material.dart';

import 'SecMinHourWdgt.dart';
import 'MailWdgt.dart';
import 'DayWdgt.dart';
import 'DateWdgt.dart';
import 'TimeWdgt.dart';
import 'StringWdgt.dart';

class ParamWidgetFactory {

  //Give the third param only if you put "string" in parameType
  static Widget createParamWdgt(Function onParamValChange, String paramType, [String stringParam]) {
    Widget param = SizedBox(width: 20, height: 20);

    if (paramType == "sec|min|hour") {
      param = constructParamUIContext(SecMinHourWdgt(onParamValChange));
    } else if (paramType == "day_of_week") {
      param = constructParamUIContext(DayWdgt(onParamValChange));
    } else if (paramType == "date") {
      param = constructParamUIContext(DateWdgt(onParamValChange));
    } else if (paramType == "time") {
      param = constructParamUIContext(TimeWdgt(onParamValChange));
    } else if (paramType == "string") {
      param = constructParamUIContext(StringWdgt(onParamValChange));
    } else if (paramType == "mail") {
      param = constructParamUIContext(MailWdgt(onParamValChange));
    }
    return (param);
  }

  static Widget constructParamUIContext(Widget param) {
    return (Container(
      margin: EdgeInsets.only(top: 20, bottom: 0),
      child: Column(
        children: <Widget>[
          Text("Configuration :"),
          Container(
            child: param,
            margin: EdgeInsets.only(left: 10, right: 10),
          )
        ],
      )
    ));
  }
}
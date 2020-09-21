import 'package:flutter/material.dart';

class ColorManager {
  Map _colors;
  Map _oriColors;
  Map _greyColors;

  ColorManager(Map<String, Color> colors) {
    _oriColors = Map<String, Color>.from(colors);
    _greyColors = Map<String, Color>.from(colors);
    _colors = _oriColors;

    _colors.forEach(
            (k, v) {
          _greyColors[k] = Color.fromRGBO(
              (v.red / 3).round(),
              (v.green / 3).round(),
              (v.blue / 3).round(),
              v.opacity
          );
        }
    );



  }

  void disableColors() {
    _colors = _greyColors;
  }

  void originalColors() {
    _colors = _oriColors;
  }

  Color getColor(String name) {
    Color ret = _colors[name];

    return (ret);
  }
}
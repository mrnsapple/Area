import 'package:flutter/material.dart';

import '../Services/Endpoint.dart';
import 'ColorManager.dart';
import 'DetailsDialog.dart';

class ServiceEpWidget extends StatelessWidget {
  Endpoint endpoint;
  bool enabledParent;
  ColorManager colors = ColorManager({
    'cardBg': Color.fromRGBO(167, 186, 186, 1),
    'titleColor': Color.fromRGBO(255, 255, 255, 1),
    'titleShadowColor': Color.fromRGBO(33, 150, 243, 1),
    'titleBg': Color.fromRGBO(165, 174, 175, 0.7)
  });

  ServiceEpWidget(this.endpoint, bool enabled) {
    enabledParent = enabled;
    if (enabled == true) {
      colors.originalColors();
    } else {
      colors.disableColors();
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (enabledParent == true) {
          showDialog(
            context: context,
            builder: (_) => DetailsDialog(endpoint: endpoint),
          );
        }
      },

        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 160, maxHeight: 35, minWidth: 160, minHeight: 35),
            child: Container(
          child: Transform.scale(
            scale: 0.8,
            child: RawChip(
              padding: EdgeInsets.all(7),
              label: Text(endpoint.name,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 15.0,
                  color: colors.getColor("titleColor"),
                  fontWeight: FontWeight.bold
                ),
              ),
              shadowColor: colors.getColor("titleShadowColor"),
              backgroundColor: colors.getColor("cardBg"),
              elevation: 10,
              autofocus: true,
            )
          )
        )
      )
    );
  }
}

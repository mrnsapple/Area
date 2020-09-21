import 'package:flutter/material.dart';

class GoogleLogin extends StatelessWidget {
  final VoidCallback onTapCallback;

  GoogleLogin({
    this.onTapCallback,
  });

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: true,
      child: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.35),
              spreadRadius: 0.1,
              blurRadius: 17,
              offset: Offset(0, 7), // changes position of shadow
            ),
          ],
        ),
        child: SizedBox(
          height: 38,
          width: 280,
          child: RaisedButton(
            shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(18)),
            color: Color.fromRGBO(208, 66, 42, 1),
            child: Row(
              children: <Widget>[
                SizedBox(
                  height: 27,
                  width: 27,
                  child: Image.asset("lib/assets/googleLogo.png")
                ),
                Expanded(
                  child: Center(
                    child:Text(
                      "Connect with Google",
                      style: TextStyle(color: Colors.white.withOpacity(0.9))
                    )
                  )
                ),
              ],
            ),
            onPressed: onTapCallback,
          )
        )
      )
    );
  }
}
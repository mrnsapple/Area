import 'package:google_sign_in/google_sign_in.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:crypto/crypto.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../Services/Link.dart';
import '../Services/Endpoint.dart';
import '../Services/Services.dart';
import 'User.dart';

// For Google Oauth
final GoogleSignIn _googleSignIn = GoogleSignIn();
final FirebaseAuth _auth = FirebaseAuth.instance;

class ServWrapper {
  static String error;
  static String _domain;

  ServWrapper();

  static Future<User> authentication(String email, String password) async {
    error = null;
    try {
      var response =
          await http.post(_domain + "login/" + email + "/" + password);
      error = response.body.split("\"")[3];

      if (error != "success") return (null);
      return (User(email));
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
    return (null);
  }

  static Future<User> register(String email, String password) async {
    error = null;
    try {
      var response =
          await http.post(_domain + "register/" + email + "/" + password);
      error = response.body.split("\"")[3];

      if (error == "success") return (User(email));
      return (null);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
    return (null);
  }

  static Future logout(String email) async {
    error = null;
    try {
      var response = await http.post(_domain + "logout/" + email);
      error = response.body.split("\"")[3];
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
  }

  static Future recoverPassword(String email) async {
    error = null;
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
    return (null);
  }

  static Future<User> googleAuthent() async {
    final GoogleSignInAccount googleSignInAccount =
        await _googleSignIn.signIn();
    final googleSignInAuthentication = await googleSignInAccount.authentication;

    final AuthCredential credential = GoogleAuthProvider.getCredential(
      accessToken: googleSignInAuthentication.accessToken,
      idToken: googleSignInAuthentication.idToken,
    );

    final AuthResult authResult = await _auth.signInWithCredential(credential);
    final FirebaseUser user = authResult.user;
    final FirebaseUser currentUser = await _auth.currentUser();

    if (user.isAnonymous ||
        await user.getIdToken() == null ||
        user.uid != currentUser.uid) {
      error = "Error: Firebase unhandled error";
      return (null);
    }
    return (_oAuthLogin(user.email));
  }

  static Future<User> _oAuthLogin(String email) async {
    error = null;

    try {
      var response = await http.post(_domain + "login/oauth2/check/" + email);
      error = response.body.split("\"")[3];
      if (error == "success") return (User(email));
      return (null);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
    return (null);
  }

  static Future<List> getSubscribedServices(String email) async {
    List<dynamic> services = await getServices(email);
    List<int> indexToRm = [];

    for (int cpt = 0; cpt < services.length; cpt++) {
      if (services[cpt].subscribed == false) indexToRm.add(cpt);
    }

    for (int cpt = indexToRm.length - 1; cpt >= 0; cpt--)
      services.removeAt(indexToRm[cpt]);

    return (services);
  }

  static Future<List> getServices(String email) async {
    error = null;
    Map<String, dynamic> tmp;

    try {
      var response = await http.get(_domain + "services/" + email);
      tmp = jsonDecode(response.body);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
    return (tmp["services"].map((elem) => Service.fromJson(elem)).toList());
  }

  static Future subscribeServ(
      String email, bool subscribed, String idServ) async {
    error = null;
    try {
      var response = await http
          .post(_domain + "services/subscribe/" + email + "/" + idServ);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
  }

  static Future unsubscribeServ(
      String email, bool subscribed, String idServ) async {
    error = null;
    try {
      var response = await http
          .post(_domain + "services/unsubscribe/" + email + "/" + idServ);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
  }

  static Endpoint getEndpointById(
      EPType type, String id, List<dynamic> services) {
    for (int cpt = 0; cpt < services.length; cpt++) {
      if (type == EPType.action) {
        for (int cpt2 = 0; cpt2 < services[cpt].actions.length; cpt2++) {
          if (services[cpt].actions[cpt2].id == id) {
            return (services[cpt].actions[cpt2]);
          }
        }
      } else {
        for (int cpt2 = 0; cpt2 < services[cpt].reactions.length; cpt2++) {
          if (services[cpt].reactions[cpt2].id == id) {
            return (services[cpt].reactions[cpt2]);
          }
        }
      }
    }
    return (null);
  }

  static List getListFromAreaRqst(
      Map<String, dynamic> areas, List<dynamic> services) {
    List<String> areasTab = areas["areas"].toString().split(";");
    List<Link> areasFinal = [];

    for (int cpt = 0; cpt < areasTab.length - 1; cpt++) {
      String action =
          areasTab[cpt].substring(1, areasTab[cpt].length - 2).split("=")[0][0];
      String reaction =
          areasTab[cpt].substring(1, areasTab[cpt].length - 1).split("=")[1][0];
      String actionParam =
          areasTab[cpt].substring(1, areasTab[cpt].length - 2).split("=")[0][2];
      String reactionParam =
          areasTab[cpt].substring(1, areasTab[cpt].length - 1).split("=")[1][2];

      areasFinal.add(Link(getEndpointById(EPType.action, action, services),
          getEndpointById(EPType.action, reaction, services)));
      areasFinal[cpt].action.paramType = actionParam;
      areasFinal[cpt].reaction.paramType = reactionParam;
    }
    return (areasFinal);
  }

  static Future<List> getUserLinks(String email) async {
    error = null;

    try {
      var response = await http.get(_domain + "area/" + email);
      Map<String, dynamic> tmp = jsonDecode(response.body);
      List<dynamic> tmp2 = await getServices(email);

      List<Link> finalList = getListFromAreaRqst(tmp, tmp2);

      return (finalList);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
    }
    return (null);
  }

  // Order of the list : id_service A, id A, param A, id_service Rea, id Rea, param Rea,
  static Future<bool> removeArea(String email, List<String> values) async {
    error = null;

    try {
      var response = await http.post(_domain +
          "area/remove/" +
          email +
          "/" +
          values[0] +
          "/" +
          values[1] +
          "/" +
          values[2] +
          "/" +
          values[3]);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
      return (false);
    }
    return (true);
  }

  // Order of the list : id_service A, id A, param A, id_service Rea, id Rea, param Rea,
  static Future<bool> addArea(String email, List<String> values) async {
    error = null;

    try {
      var response = await http.post(_domain +
          "area/add/" +
          email +
          "/" +
          values[0] +
          "/" +
          values[1] +
          "/" +
          values[2] +
          "/" +
          values[3]);
    } on Exception catch (e) {
      error = "Error : Unknown error.";
      return (false);
    }
    return (true);
  }

  static Future<bool> isHere(String location) async {
    error = null;
    Map<String, dynamic> tmp;

    try {
      var response = await http.get("http://" + location + "/about.json");
      tmp = jsonDecode(response.body);
      if (tmp.isEmpty) {
        error = "Error : Cannot reach server.";
        return (false);
      }
    } on Exception catch (e) {
      error = "Error : Cannot reach server.";
      return (false);
    }
    _domain = "http://" + location + "/";
    return (true);
  }

  static Digest hashString(toHash) {
    var bytes = utf8.encode(toHash);
    var digest = sha1.convert(bytes);
    return (digest);
  }
}

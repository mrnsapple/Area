import 'Endpoint.dart';

//class Service {
//  String id;
//  bool subscribed;
//  String name;
//  List<Endpoint> actions;
//  List<Endpoint> reactions;
//  String img;
//
//  Service(Map json) {
//    if (json["subscribed"] == "ok")
//      subscribed = true;
//    else
//      subscribed = false;
//    if (json["name"] == "facebook")
//      img = "lib/assets/fbLogo.png";
//    else if (json["name"] == "github")
//      img = "lib/assets/githubLogo.png";
//    else if (json["name"] == "Timer")
//      img = "lib/assets/timerLogo.png";
//    else
//      img = "";
//    name = json["name"];
//    id = json["id"];
//  }
//}

// To parse this JSON data, do
//
//     final service = serviceFromJson(jsonString);
// To parse this JSON data, do
//
//     final service = serviceFromJson(jsonString);

// To parse this JSON data, do
//
//     final service = serviceFromJson(jsonString);

import 'dart:convert';

Service serviceFromJson(String str) => Service.fromJson(json.decode(str));

String serviceToJson(Service data) => json.encode(data.toJson());

class Service {
  final String id;
  final String name;
  bool subscribed;
  final String description;
  final List<Endpoint> actions;
  final List<Endpoint> reactions;
  final String img;

  Service({
    this.id,
    this.name,
    this.subscribed,
    this.description,
    this.actions,
    this.reactions,
    this.img
  });

  factory Service.fromJson(Map<String, dynamic> json) {

    return (Service(
        id: json["id"],
        name: json["name"],
        subscribed: json["subscribed"] == "ko" ? false : true,
        description: json["description"],
        img: "lib/assets/" + json["name"] + "Logo.png",
        actions: json["actions"] == null ? null : List<Endpoint>.from(json["actions"].map((x) => Endpoint.fromJson(x, json["name"], "lib/assets/" + json["name"] + "Logo.png", json["id"]))),
        reactions: json["reactions"] == null ? null : List<Endpoint>.from(json["reactions"].map((x) => Endpoint.fromJson(x, json["name"], "lib/assets/" + json["name"] + "Logo.png", json["id"])))));
  }

//  factory Service.fromJson(Map<String, dynamic> json) => Service(
//    id: json["id"],
//    name: json["name"],
//    subscribed: json["subscribed"] == "ko" ? false : true,
//    description: json["description"],
//    img: "lib/assets/" + json["name"] + "Logo.png",
//    actions: List<Endpoint>.from(json["actions"].map((x) => Endpoint.fromJson(x, json["name"], "lib/assets/" + json["name"] + "Logo.png", json["id"]))),
//    reactions: List<Endpoint>.from(json["reactions"].map((x) => Endpoint.fromJson(x, json["name"], "lib/assets/" + json["name"] + "Logo.png", json["id"]))),
//  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "name": name,
    "img": "lib/assets/" + img + ".png",
    "subscribed": subscribed,
    "description": description,
    "actions": List<dynamic>.from(actions.map((x) => x.toJson())),
    "reactions": List<dynamic>.from(reactions.map((x) => x.toJson())),
  };
}
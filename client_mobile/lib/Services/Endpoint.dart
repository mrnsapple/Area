
enum EPType {
  action,
  reaction
}

class Endpoint {
  String id;
  String description;
  String name;
  String service;
  String serviceId;
  String shortDesc;
  String img;
  String type;
  String paramType;

  Endpoint({
    this.id,
    this.name,
    this.description,
    this.img,
    this.service,
    this.serviceId,
    EPType newType,
    this.paramType
  }) :
    shortDesc = "This is a very short description.",
    type = newType == EPType.action ? "Action" : "Reaction";

//  static Endpoint from(Endpoint ori) {
//    Endpoint tmp = new Endpoint(name: ori.name, newType: EPType.action);
//    tmp.type = ori.type;
//    return (tmp);
//  }

  factory Endpoint.fromJson(Map<String, dynamic> json, String service, String logo, String serviceId) => Endpoint(
    id: json["id"],
    name: json["name"],
    description: json["description"],
    paramType: json["parameter"],
    service: service,
    img: logo,
    serviceId: serviceId,
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "name": name,
    "description": description,
  };
}
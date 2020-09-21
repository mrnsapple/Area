import 'Endpoint.dart';

class Link {
  Endpoint action;
  Endpoint reaction;

  Link(Endpoint newAction, Endpoint newReaction) :
    action = newAction,
    reaction = newReaction;
}
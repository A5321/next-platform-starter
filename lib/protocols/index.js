import { currentRelationshipProtocols } from "./currentRelationship";
import { youAreAnOptionProtocols } from "./youAreAnOption";
import { mixedSignalsProtocols } from "./Mixedsignals";

export const protocolsByScope = {
  "current-relationship": currentRelationshipProtocols,
  "you-are-an-option": youAreAnOptionProtocols,
  "mixed-signals": mixedSignalsProtocols,
};
